import { ResponseError } from 'fusion-plugin-rpc'

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

		const handler = async (args, ctx) => {
			const result = await fireBackendCall(
				backend,
				endpoint,
				args,
				ctx,
				SIMULATED_DELAY,
			).catch(({ code, err, args }) => {
				console.error(
					`Failure calling ${endpoint} with args ${JSON.stringify(args)} from ${
						backend.name
					}`,
				)
				console.log(err)
				const respError = new ResponseError(err)
				respError.code = code
				if (err.detail) {
					respError.message = err.detail
				}
				respError.meta = err
				throw respError
			})
			return result
		}

		acc[endpoint] = handler
		return acc
	},
	{ getSignedURL },
)
