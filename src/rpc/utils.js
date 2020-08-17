import request from 'request'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const PASSALONG_HEADERS = ['cookie', 'content-type']

export const fireBackendCall = (
	backend,
	endpoint,
	args,
	ctx,
	delay = 0,
	withRefresh = true,
) => {
	const url = `${backend.basePath}/${endpoint}`
	let { params, ...data } = args

	const headers = {}
	PASSALONG_HEADERS.forEach(header => {
		headers[header] = ctx.request.header[header]
	})

	if (ctx.access_token) {
		headers.authorization = `Bearer ${ctx.access_token}`
	}

	if (endpoint === backend.refreshEndpoint) {
		data = { refresh: ctx.refresh_token }
	}

	return new Promise((resolve, reject) => {
		axios({
			method: 'POST',
			headers,
			url,
			data,
			params,
		})
			.then(res => {
				setTimeout(() => {
					/*
						if an access or refresh token was returned,
						add it to the ctx object for the auth middleware
						to add to the session cookie.
					*/
					if (res.data.access) {
						ctx.access_token = res.data.access
					}

					if (res.data.refresh) {
						ctx.refresh_token = res.data.refresh

						console.log(res.data)

						if (jwt_decode(res.data.refresh).handle) {
							res.data.handle = jwt_decode(res.data.refresh).handle
						}
					}

					return resolve({ body: res.data, initialArgs: args })
				}, delay)
			})
			.catch(err => {
				setTimeout(() => {
					if (withRefresh && err.response.status === 401) {
						attemptRefresh(backend, ctx, delay)
							.then(() => {
								fireBackendCall(backend, endpoint, args, ctx, delay, false)
									.then(res => {
										return resolve(res)
									})
									.catch(err => {
										return reject(err)
									})
							})
							.catch(err => {
								return reject(err)
							})
					} else {
						return reject(err)
					}
				}, delay)
			})
	})
}

const attemptRefresh = (backend, ctx, delay) => {
	console.log('attempting refresh...')
	const data = { refresh: ctx.refresh_token }
	return new Promise((resolve, reject) => {
		axios({
			method: 'POST',
			url: `${backend.basePath}/${backend.refreshEndpoint}`,
			data,
		})
			.then(res => {
				setTimeout(() => {
					console.log('refresh succeded')
					/*
						if an access or refresh token was returned,
						add it to the ctx object for the auth middleware
						to add to the session cookie.
					*/
					if (res.data.access) {
						ctx.access_token = res.data.access
					}

					if (res.data.refresh) {
						ctx.refresh_token = res.data.refresh

						if (jwt_decode(res.data.refresh).handle) {
							res.data.handle = jwt_decode(res.data.refresh).handle
						}
					}

					return resolve({ body: res.data, initialArgs: data })
				}, delay)
			})
			.catch(err => {
				setTimeout(() => {
					console.log('refresh failed')
					return reject(err)
				}, delay)
			})
	})
}

// const attemptRefresh = () => {
// 	return new Promise((resolve, reject) => {
// 		console.log('attempting refresh')
// 		setTimeout(() => {
// 			resolve()
// 			console.log('finished refresh')
// 		}, delay)
// 	})
// }

// console.log(err)
// if (err.response.status === 400) {
// 	attemptRefresh()
// 		.then(res => {
// 			console.log('refresh successful')
// 		})
// 		.catch(err => {
// 			console.log('refresh attempt failed')
// 			return reject(err)
// 		})
// }
// console.log(err.response)

// export const fireBackendCallLegacy = async (
// 	backend,
// 	endpoint,
// 	args = {},
// 	ctx,
// 	delay,
// 	refreshRetryCount = 1,
// ) => {
// 	const url = `${backend.basePath}/${endpoint}`

// 	const headers = {}
// 	PASSALONG_HEADERS.forEach(header => {
// 		headers[header] = ctx.request.header[header]
// 	})

// 	/*
// 		grab query params (qs) and post body data from rpc call args.
// 	*/
// 	let { qs, ...data } = args

// 	// if (!backend.safeEndpoints.includes(endpoint)) {
// 	// headers['authorization'] = `Bearer ${ctx['access_token']}`
// 	// }

// 	if (ctx.access_token) {
// 		headers.authorization = `Bearer ${ctx['access_token']}`
// 	}

// 	// headers['SESSION_COOKIE_SECURE'] = false

// 	/*
// 		if calling the backend's refresh endpoint,
// 		replace the body with the refresh token.
// 	*/
// 	if (endpoint === backend.refreshEndpoint) {
// 		console.log('setting data properly')
// 		data = { refresh: ctx['refresh_token'] }
// 		console.log(data)
// 		// reject({ code: 401 })
// 	}

// 	return new Promise(async (resolve, reject) => {
// 		console.log(`Firing api call to ${backend.basePath}/${endpoint}`)

// 		request.post(
// 			url,
// 			{
// 				body: data,
// 				headers,
// 				qs,
// 				json: true,
// 			},
// 			async (err, res, body) => {
// 				setTimeout(async () => {
// 					if (err) {
// 						// console.log('here is an error')
// 						// console.log(err)
// 						reject({ code: err.errno, err, args })
// 					}
// 					if (res.statusCode > 300 || res.statusCode < 200) {
// 						/*
// 								if 401 unauthorized and a refresh token is available,
// 								attempt to refresh the access token, then refire the
// 								original API call.
// 							*/
// 						if (res.statusCode === 401) {
// 							if (
// 								refreshRetryCount > 0 &&
// 								endpoint !== backend['loginEndpoint']
// 							) {
// 								console.log('attempting refresh...')
// 								// if (!data.refresh) {
// 								// 	reject('no token')
// 								// }
// 								console.log(data)
// 								await fireBackendCall(
// 									backend,
// 									backend.refreshEndpoint,
// 									data,
// 									ctx,
// 									delay,
// 									refreshRetryCount - 1,
// 								)
// 									.then(async () => {
// 										const res = await fireBackendCall(
// 											backend,
// 											endpoint,
// 											data,
// 											ctx,
// 											delay,
// 											refreshRetryCount - 1,
// 										)
// 										resolve(res)
// 									})
// 									.catch(err => {
// 										console.log('refresh unsuccessful.')
// 										// console.log(err)
// 										reject(err)
// 									})
// 							}
// 							// else {
// 							// 	console.log('refresh unsuccessful.')
// 							// 	// ctx.redirectLogin = true
// 							// }
// 						}
// 						// console.log('rejecting an error down here')
// 						// console.log(body)
// 						// console.log(res.statusCode)
// 						return reject({ code: res.statusCode, err: body, args })
// 					}

// 					/*
// 							for login or refresh endpoints, save the tokens to ctx
// 							to be added to the sessin by auth middleware.
// 						*/
// 					if (
// 						endpoint === backend['refreshEndpoint'] ||
// 						endpoint === backend['loginEndpoint'] ||
// 						endpoint === backend['createAccountEndpoint']
// 					) {
// 						// console.log(body)
// 						ctx['access_token'] = body.access
// 						ctx['refresh_token'] = body.refresh
// 						body['authProfileId'] = jwt_decode(body.refresh).authProfileId
// 					}

// 					return resolve({ body, args })
// 				}, delay)
// 			},
// 		)
// 	})

// 	// return apiPromise
// }
