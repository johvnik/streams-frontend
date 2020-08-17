import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	modals: {
		loginModal: false,
	},
}

const resetStore = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.resetStore:
			return { ...DEFAULT_STATE }
		default:
			return state
	}
}

const openLoginModal = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.openLoginModal:
			return {
				...state,
				modals: {
					...state.modals,
					loginModal: true,
				},
			}
		default:
			return state
	}
}

const closeLoginModal = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.closeLoginModal:
			return {
				...state,
				modals: {
					...state.modals,
					loginModal: false,
				},
			}
		default:
			return state
	}
}

export default reduceReducers(
	state => state || DEFAULT_STATE,
	resetStore,
	openLoginModal,
	closeLoginModal,
)
