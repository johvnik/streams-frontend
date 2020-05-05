import { createPlugin } from 'fusion-core'
import { SessionToken } from 'fusion-tokens'
import request from 'request'
import bodyParser from 'koa-bodyparser'
import { ResponseError } from 'fusion-plugin-rpc'

import { basePath, RPC_IDS } from '../constants/rpc'

export default createPlugin({
	deps: {
		JWTSession: SessionToken,
	},
	middleware({ JWTSession }) {
		const parseBody = bodyParser()

		return async (ctx, next) => {
			if (ctx.path === '/login' && ctx.method === 'POST') {
				await parseBody(ctx, () => Promise.resolve())
				const { handle, password } = ctx.request.body

				const loginPromise = new Promise((resolve, reject) => {
					request.post(
						`${basePath}/${RPC_IDS.login}`,
						{
							body: {
								handle,
								password,
							},
							json: true,
						},
						(err, res, body) => {
							if (err) {
								reject(err)
							}
							if (res.statusCode != 200) {
								reject(res)
							}
							resolve(body)
						},
					)
				}).catch(err => {
					// console.log('caught error: ', err)
					const respError = new ResponseError(err)
					respError.meta = {
						status: err.statusCode,
						data: err.body,
					}
					throw respError
				})

				const credentials = await loginPromise
				// console.log('credintials: ', credentials)
				const session = JWTSession.from(ctx)
				if (credentials.refresh && credentials.access) {
					session.set('refresh_token', credentials.refresh)
					session.set('access_token', credentials.access)
				}
				ctx.redirect('/')
				return next()
			}

			return next()
		}
	},
})

// import { createPlugin } from 'fusion-core'
// import { SessionToken } from 'fusion-tokens'
// import axios from 'axios'
// import bodyParser from 'koa-bodyparser'
// import { ResponseError } from 'fusion-plugin-rpc'

// import { basePath, RPC_IDS } from '../constants/rpc'

// export default createPlugin({
// 	deps: {
// 		Session: SessionToken,
// 	},
// 	middleware({ Session }) {
// 		const parseBody = bodyParser()

// 		return async (ctx, next) => {
// 			if (ctx.path === '/login' && ctx.method === 'POST') {
// 				await parseBody(ctx, () => Promise.resolve())
// 				const { handle, password } = ctx.request.body

// 				axios({
// 					url: `${basePath}/${RPC_IDS.login}`,
// 					method: 'POST',
// 					data: {
// 						handle,
// 						password,
// 					},
// 				}).then(res => {
// 					const session = Session.from(ctx)
// 					const tokens = res.data
// 					console.log('res: ', res)
// 					console.log('tokens!: ', tokens)
// 					session.set('refresh_token', tokens.refresh)
// 					session.set('access_token', tokens.access)
// 					ctx.redirect('/')
// 					return next()
// 				})
// 				// .catch(err => {
// 				// 	console.log('catcherror: ', err)
// 				// 	const responseError = new ResponseError(err)
// 				// 	responseError.meta = err.data
// 				// 	throw responseError
// 				// })
// 			}

// 			return next()
// 		}
// 	},
// })

// import { createPlugin } from 'fusion-core'
// import { SessionToken } from 'fusion-tokens'
// import fetch from 'isomorphic-unfetch'
// import bodyParser from 'koa-bodyparser'
// import { ResponseError } from 'fusion-plugin-rpc'
// import { basePath, RPC_IDS } from '../constants/rpc'

// export default createPlugin({
// 	deps: {
// 		Session: SessionToken,
// 	},
// 	middleware({ Session }) {
// 		const parseBody = bodyParser()

// 		return async (ctx, next) => {
// 			if (ctx.path === '/login' && ctx.method === 'POST') {
// 				await parseBody(ctx, () => Promise.resolve())
// 				const { handle, password } = ctx.request.body

// 				const tokens = await fetch(`${basePath}/${RPC_IDS.login}`, {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json',
// 					},
// 					body: JSON.stringify({
// 						handle,
// 						password,
// 					}),
// 				})
// 					.then(res => {
// 						if (res.ok) {
// 							return res.json()
// 						} else {
// 							throw res
// 						}
// 					})
// 					.then(data => {
// 						return data
// 					})
// 					.catch(err => {
// 						// console.log('catcherror: ', err)
// 						const responseError = new ResponseError(err)
// 						responseError.meta = err.data
// 						throw responseError
// 					})

// 				const session = Session.from(ctx)
// 				console.log('tokens! :: ', tokens)
// 				session.set('refresh_token', tokens.refresh)
// 				session.set('access_token', tokens.access)
// 				ctx.redirect('/')
// 				return next()
// 			}
// 			return next()
// 		}
// 	},
// })
