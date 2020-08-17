import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
// import mapKeys from 'lodash/mapKeys'
// import keyBy from 'lodash/keyBy'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	byHandle: {},
	error: null,
}

const resetStore = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.resetStore:
			return { ...DEFAULT_STATE }
		default:
			return state
	}
}

const getUpdateAccountHelper = {
	start: state => ({
		...state,
	}),
	success: (state, { payload }) => ({
		...state,
		byHandle: {
			...state.byHandle,
			[payload.body.handle]: {
				...Object.keys(payload.body).reduce((acc, key) => {
					if (key != 'profile') {
						acc[key] = payload.body[key]
					} else {
						acc['profileId'] = payload.body[key].id
					}
					return acc
				}, {}),
			},
		},
	}),
	failure: (state, { payload }) => ({
		...state,
	}),
}

const getAccount = createRPCReducer(RPC_IDS.getAccount, getUpdateAccountHelper)

const updateAccount = createRPCReducer(
	RPC_IDS.updateAccount,
	getUpdateAccountHelper,
)

export default reduceReducers(
	state => state || DEFAULT_STATE,
	resetStore,
	getAccount,
	updateAccount,
)
