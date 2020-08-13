import request from 'request'
import jwt_decode from 'jwt-decode'

const PASSALONG_HEADERS = ['cookie', 'content-type']

export const fireBackendCall = async (
	backend,
	endpoint,
	args = {},
	ctx,
	delay,
	refreshRetryCount = 1,
) => {
	const url = `${backend.basePath}/${endpoint}`
	const headers = {}

	PASSALONG_HEADERS.forEach(header => {
		headers[header] = ctx.request.header[header]
	})

	/*
		grab query params (qs) and post body data from rpc call args.
	*/
	let { qs, ...data } = args

	if (!backend.safeEndpoints.includes(endpoint)) {
		headers['authorization'] = `Bearer ${ctx['access_token']}`
	}

	// headers['SESSION_COOKIE_SECURE'] = false

	/*
		if calling the backend's refresh endpoint,
		replace the body with the refresh token.
	*/
	if (endpoint === backend['refreshLoginEndpoint']) {
		data = { refresh: ctx['refresh_token'] }
	}

	if (endpoint === backend['verifyLoginEndpoint']) {
		data = { token: ctx['access_token'] }
	}

	const apiPromise = new Promise(async (resolve, reject) => {
		console.log(`Firing api call to ${backend.basePath}/${endpoint}`)

		request.post(
			url,
			{
				body: data,
				headers,
				qs,
				json: true,
			},
			async (err, res, body) => {
				setTimeout(async () => {
					if (err) {
						// console.log('here is an error')
						// console.log(err)
						reject({ code: err.errno, err, args })
					}
					if (res.statusCode > 300 || res.statusCode < 200) {
						/* 
								if 401 unauthorized and a refresh token is available, 
								attempt to refresh the access token, then refire the 
								original API call.
							*/
						if (res.statusCode === 401) {
							if (
								refreshRetryCount > 0 &&
								endpoint !== backend['loginEndpoint']
							) {
								console.log('attempting refresh...')
								await fireBackendCall(
									backend,
									backend['refreshLoginEndpoint'],
									data,
									ctx,
									delay,
									refreshRetryCount - 1,
								)
									.then(async () => {
										const res = await fireBackendCall(
											backend,
											endpoint,
											data,
											ctx,
											delay,
											refreshRetryCount - 1,
										)
										resolve(res)
									})
									.catch(err => {
										console.log('refresh unsuccessful.')
										// console.log(err)
										reject(err)
									})
							}
							// else {
							// 	console.log('refresh unsuccessful.')
							// 	// ctx.redirectLogin = true
							// }
						}
						// console.log('rejecting an error down here')
						// console.log(body)
						// console.log(res.statusCode)
						return reject({ code: res.statusCode, err: body, args })
					}

					/* 
							for login or refresh endpoints, save the tokens to ctx
							to be added to the sessin by auth middleware. 
						*/
					if (
						endpoint === backend['refreshLoginEndpoint'] ||
						endpoint === backend['loginEndpoint'] ||
						endpoint === backend['createAccountEndpoint']
					) {
						ctx['access_token'] = body.access
						ctx['refresh_token'] = body.refresh
						body['authProfileId'] = jwt_decode(body.refresh).authProfileId
					}

					return resolve({ body, args })
				}, delay || 0)
			},
		)
	})

	return apiPromise
}
