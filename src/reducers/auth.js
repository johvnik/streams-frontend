import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'

import { RPC_IDS } from '../constants/rpc'

const DEFAULT_STATE = {
	isLoading: false,
	isAuthenticated: false,
	didAttempt: false,
	error: '',
}

const { login, refreshLogin, verifyLogin, ...endpoints } = RPC_IDS
const specialEndpoints = [login, refreshLogin, verifyLogin]

const specialReducers = specialEndpoints.reduce((acc, endpoint) => {
	acc.push(
		createRPCReducer(endpoint, {
			start: state => ({
				...state,
				isLoading: true,
			}),
			success: state => ({
				...state,
				isLoading: false,
				isAuthenticated: true,
				didAttempt: true,
				error: '',
			}),
			failure: (state, { payload }) => ({
				...state,
				isLoading: false,
				isAuthenticated: false,
				didAttempt: true,
				error: payload.message,
			}),
		}),
	)
	return acc
}, [])

const reducers = Object.keys(endpoints).reduce(
	(acc, endpoint) => {
		acc.push(
			createRPCReducer(endpoint, {
				failure: (state, { payload }) => {
					if (payload.code === 401) {
						return {
							...state,
							isLoading: false,
							isAuthenticated: false,
							didAttempt: true,
							error: payload.message,
						}
					} else {
						return state
					}
				},
			}),
		)
		return acc
	},
	[...specialReducers],
)

export default reduceReducers(state => state || DEFAULT_STATE, ...reducers)
