import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'

import { RPC_IDS } from '../constants/rpc'

const DEFAULT_STATE = {
	loading: false,
	isAuthenticated: true,
	error: '',
}

const { login, ...endpoints } = RPC_IDS

const loginReducer = createRPCReducer(login, {
	start: (state, action) => ({
		...state,
		loading: true,
		isAuthenticated: false,
	}),
	success: (state, action) => ({
		...state,
		loading: false,
		isAuthenticated: true,
		error: '',
	}),
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		isAuthenticated: false,
		error: payload.message,
	}),
})

const reducers = Object.keys(endpoints).reduce(
	(acc, RPC_ID) => {
		acc.push(
			createRPCReducer(RPC_ID, {
				failure: (state, { payload }) => {
					if (payload.code === 401) {
						return {
							...state,
							loading: false,
							isAuthenticated: false,
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
	[loginReducer],
)

export default reduceReducers(state => state || DEFAULT_STATE, ...reducers)
