import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'

import { RPC_IDS } from '../constants/rpc'

const DEFAULT_STATE = {
	loading: false,
	success: false,
	error: '',
}

const login = createRPCReducer(RPC_IDS.login, {
	start: (state, action) => ({
		...state,
		loading: true,
		success: false,
	}),
	success: (state, action) => ({
		...state,
		loading: false,
		success: true,
		error: '',
	}),
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		success: false,
		error: payload.message,
	}),
})

export default reduceReducers(state => state || DEFAULT_STATE, login)
