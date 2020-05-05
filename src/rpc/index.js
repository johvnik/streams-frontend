import { ResponseError } from 'fusion-plugin-rpc'

import { endpointToBackendLookups } from './services/index'
import { fireBackendCall } from './utils'

export default Object.keys(endpointToBackendLookups).reduce((acc, endpoint) => {
	const backend = endpointToBackendLookups[endpoint]

	const handler = async (args, ctx) => {
		const result = await fireBackendCall(
			backend,
			endpoint,
			args,
			ctx,
			500,
		).catch(({ code, message, data }) => {
			console.error(
				`Failure calling ${endpoint} with args ${args} from ${backend.name}`,
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
