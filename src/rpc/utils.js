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
							if (endpoint === backend['loginEndpoint']) {
								ctx['redirectLogin'] = true
							}
							return reject({
								code: err.errno,
								message: err,
								data,
							})
						}
						if (res.statusCode !== 200) {
							if (res.statusCode === 401) {
								if (
									refreshRetryCount > 0 &&
									endpoint !== backend['loginEndpoint']
								) {
									console.log('access token may have expired.')
									await fireBackendCall(
										backend,
										backend['refreshLoginEndpoint'],
										data,
										ctx,
										delay,
										refreshRetryCount - 1,
									)
										.then(async () => {
											const result = await fireBackendCall(
												backend,
												endpoint,
												data,
												ctx,
												delay,
												refreshRetryCount - 1,
											)
											resolve(result)
										})
										.catch(({ code, message, data }) => {
											reject({
												code,
												message,
												data,
											})
										})
								} else {
									console.log('access and refresh tokens may be expired.')
									ctx.redirectLogin = true
								}
							}

							if (endpoint === backend['loginEndpoint']) {
								console.log('failed to login.')
								ctx['redirectLogin'] = true
							}

							return reject({
								code: res.statusCode,
								message: body.detail,
								data,
							})
						}

						if (
							endpoint === backend['refreshLoginEndpoint'] ||
							endpoint === backend['loginEndpoint']
						) {
							ctx['access_token'] = body.access
							ctx['refresh_token'] = body.refresh
						}

						if (endpoint === backend['loginEndpoint']) {
							console.log('logged in!')
							ctx['redirectHome'] = true
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
