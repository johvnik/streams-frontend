// import { ResponseError } from 'fusion-plugin-rpc'
import { ResponseError } from 'fusion-plugin-rpc-redux-react'

import { endpointToBackendLookups } from './services/index'
import { fireBackendCall } from './utils'

const SIMULATED_DELAY = 1200

import s3 from '../clients/s3'

const getSignedURL = async (args, ctx) => {
	return { signedURL: s3.getSignedObjectURL(args.s3ObjectKey) }
}

export default Object.keys(endpointToBackendLookups).reduce(
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
						responseError.code = err.response.status
						throw responseError
					})
			)
		}

		acc[endpoint] = handler
		return acc
	},
	{ getSignedURL },
)
