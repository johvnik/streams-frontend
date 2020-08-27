// import { ResponseError } from 'fusion-plugin-rpc'
import { ResponseError } from 'fusion-plugin-rpc-redux-react'

import { endpointToBackendLookups } from './services/index'
import { fireBackendCall } from './utils'

const SIMULATED_DELAY = 200

import s3 from '../clients/s3'

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

const getSignedUrl = async (args, ctx) => {
	// s3.getSignedObjectUrl(s3ObjectKey)
	// 	.then(res => {
	// 		return res
	// 	})
	// 	.catch(err => {
	// 		const responseError = new ResponseError(err)
	// 		responseError.code = err.response && err.response.status
	// 		throw responseError
	// 	})
	await sleep(300)

	return {
		body: { signedUrl: s3.getSignedObjectUrl(args.s3ObjectKey) },
		initialArgs: args,
	}
}

const defaultHandlers = Object.keys(endpointToBackendLookups).reduce(
	(acc, endpoint) => {
		const backend = endpointToBackendLookups[endpoint]

		const handler = (args, ctx) => {
			return (
				fireBackendCall(backend, endpoint, args, ctx, SIMULATED_DELAY)
					.then(res => {
						// console.log(res)
						return res
					})
					// .catch(({ code, err, args }) => {
					.catch(err => {
						console.error(
							`Failure calling ${endpoint} with args ${JSON.stringify(
								args,
							)} from ${backend.name}`,
						)
						// console.log(err)
						const responseError = new ResponseError(err)
						responseError.code = err.response && err.response.status
						throw responseError
					})
			)
		}

		acc[endpoint] = handler
		return acc
	},
	{},
)

export default {
	...defaultHandlers,
	getSignedUrl,
}
