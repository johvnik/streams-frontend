import request from 'request'

const PASSALONG_HEADERS = ['cookie', 'content-type']

export const fireBackendCall = async (
	backend,
	endpoint,
	data = {},
	ctx,
	delay,
	refreshRetryCount = 1,
) => {
	const url = `${backend.basePath}/${endpoint}`
	const headers = {}

	PASSALONG_HEADERS.forEach(header => {
		headers[header] = ctx.request.header[header]
	})

	headers['authorization'] = `Bearer ${ctx['access_token']}`

	/*
		if calling the backend's refresh endpoint,
		replace the body with the refresh token.
	*/
	if (endpoint === backend['refreshLoginEndpoint']) {
		data = { refresh: ctx['refresh_token'] }
	}

	const apiPromise = new Promise(async (resolve, reject) => {
		console.log(`Firing api call to ${backend.basePath}/${endpoint}`)

		request.post(
			url,
			{
				body: data,
				headers,
				json: true,
			},
			async (err, res, body) => {
				setTimeout(
					async () => {
						if (err) {
							return reject({
								code: err.errno,
								message: err,
								data,
							})
						}
						if (res.statusCode > 300 || res.statusCode < 200) {
							/* 
								if 401 unauthorized and a refresh token is available, 
								attempt to refresh the access token, then refire the 
								original API call.
							*/
							if (res.statusCode === 401 && data.refresh) {
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
											reject(err)
										})
								} else {
									console.log('refresh unsuccessful.')
									ctx.redirectLogin = true
								}
							}

							return reject({
								code: res.statusCode,
								message: body.detail,
								data,
							})
						}

						/* 
							for login or refresh endpoints, save the tokens to ctx
							to be added to the sessin by auth middleware. 
						*/
						if (
							endpoint === backend['refreshLoginEndpoint'] ||
							endpoint === backend['loginEndpoint']
						) {
							ctx['access_token'] = body.access
							ctx['refresh_token'] = body.refresh
						}

						return resolve(body)
					},
					delay ? delay : 0,
				)
			},
		)
	})

	return apiPromise
}
