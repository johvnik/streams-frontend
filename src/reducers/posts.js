import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'

import { RPC_IDS } from '../constants/rpc'

const DEFAULT_STATE = {
	loading: false,
	data: [],
	error: {},
}

const getPosts = createRPCReducer(RPC_IDS.getPosts, {
	start: (state, action) => ({
		...state,
		loading: true,
	}),
	success: (state, { payload }) => ({
		...state,
		loading: false,
		data: [...payload],
		error: {},
	}),
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		data: [],
		error: payload,
	}),
})

export default reduceReducers(state => state || DEFAULT_STATE, getPosts)
