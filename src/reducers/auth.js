import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	isLoading: false,
	isAuthenticated: false,
	didAttempt: false,
	didPerformInitialLoad: false,
	authProfileId: null,
	error: null,
}

const { createAccount, login, refreshLogin, ...endpoints } = RPC_IDS
const specialEndpoints = [createAccount, login, refreshLogin]

const resetStore = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.resetStore:
			return { ...DEFAULT_STATE }
		default:
			return state
	}
}

const specialReducers = specialEndpoints.reduce((acc, endpoint) => {
	acc.push(
		createRPCReducer(endpoint, {
			start: state => ({
				...state,
				isLoading: true,
			}),
			success: (state, { payload }) => {
				// console.log(payload)
				return {
					...state,
					isLoading: false,
					isAuthenticated: true,
					didAttempt: true,
					authProfileId: payload.body.authProfileId,
					error: null,
				}
			},
			failure: (state, { payload }) => ({
				...state,
				isLoading: false,
				isAuthenticated: false,
				didAttempt: true,
				didPerformInitialLoad: false,
				authProfileId: null,
				error: payload,
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
							didPerformInitialLoad: false,
							didAttempt: true,
							error: payload,
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

const didPerformInitialLoad = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.didPerformInitialLoad:
			return {
				...state,
				didPerformInitialLoad: true,
			}
		default:
			return state
	}
}

export default reduceReducers(
	state => state || DEFAULT_STATE,
	...reducers,
	didPerformInitialLoad,
	resetStore,
)
