import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	isLoading: false,
	authHandle: null,
	didAttempt: false,
	didPerformInitialLoad: false,
	error401: null,
	error: null,
}

const { login, createAccount, refreshLogin, ...endpoints } = RPC_IDS
const specialEndpoints = [login, createAccount, refreshLogin]

const resetStore = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.resetStore:
			return { ...DEFAULT_STATE }
		default:
			return state
	}
}

const clear401Error = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.clear401Error:
			return { ...state, error401: null }
		default:
			return state
	}
}

const didPerformInitialLoad = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.didPerformInitialLoad:
			return {
				...state,
				isLoading: false,
				didPerformInitialLoad: true,
			}
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
					didAttempt: true,
					authHandle: payload.body.handle,
					error401: null,
					error: null,
				}
			},
			failure: (state, { payload }) => ({
				...DEFAULT_STATE,
				didAttempt: true,
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
							authHandle: null,
							error401: payload,
						}
					} else {
						return state
					}
				},
			}),
		)
		return acc
	},
	[...specialReducers, didPerformInitialLoad, resetStore, clear401Error],
)

export default reduceReducers(state => state || DEFAULT_STATE, ...reducers)
