import request from 'request'

const PASSALONG_HEADERS = ['cookie', 'authorization']

export const fireBackendCall = (backend, endpoint, data, ctx, delay) => {
	const url = `${backend.basePath}/${endpoint}`
	const headers = {}

	PASSALONG_HEADERS.forEach(header => {
		headers[header] = ctx.request.header[header]
	})

	const apiPromise = new Promise((resolve, reject) => {
		console.log(`Firing api call to ${backend.basePath}/${endpoint}`)
		// console.log(`with headers: `)
		// const headerKeys = Object.keys(headers).reduce((acc, header) => {
		// 	acc.push(header)
		// 	return acc
		// }, [])
		// headerKeys.forEach(header => {
		// 	console.log(''.padEnd(14, ' '), `${header}: ${headers[header]}`)
		// })
		// console.log(`token: ${headers.cookie}`)

		let body = data || {}

		request.post(
			url,
			{
				body,
				headers,
				json: true,
			},
			(err, res, body) => {
				setTimeout(
					() => {
						if (err) {
							return reject({
								code: err.errno,
								message: err,
								data,
							})
						}
						if (res.statusCode != 200) {
							return reject({
								code: res.statusCode,
								message: body.detail,
								data,
							})
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
