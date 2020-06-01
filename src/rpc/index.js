import { ResponseError } from 'fusion-plugin-rpc'

import { endpointToBackendLookups } from './services/index'
import { fireBackendCall } from './utils'

const SIMULATED_DELAY = 2000

export default Object.keys(endpointToBackendLookups).reduce((acc, endpoint) => {
	const backend = endpointToBackendLookups[endpoint]

	const handler = async (args, ctx) => {
		const result = await fireBackendCall(
			backend,
			endpoint,
			args,
			ctx,
			SIMULATED_DELAY,
		).catch(({ code, message, data }) => {
			console.error(
				`Failure calling ${endpoint} with args ${JSON.stringify(args)} from ${
					backend.name
				}`,
			)
			const respError = new ResponseError(message)
			respError.code = code
			respError.meta = data
			throw respError
		})
		return result
	}

	acc[endpoint] = handler
	return acc
}, {})
