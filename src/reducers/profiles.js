import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'
import keyBy from 'lodash/keyBy'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	loading: false,
	myId: null,
	currentProfile: null,
	search: {
		loading: false,
		results: [],
		error: null,
	},
	byId: {},
	error: null,
}

const getMyProfile = createRPCReducer(RPC_IDS.getMyProfile, {
	start: state => ({
		...state,
		loading: true,
	}),
	success: (state, { payload }) => ({
		...state,
		loading: false,
		myId: payload.body.id,
		byId: { ...state.byId, [payload.body.id]: payload.body },
		error: null,
	}),
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		error: payload,
	}),
})

const getProfile = createRPCReducer(RPC_IDS.getProfile, {
	start: state => ({
		...state,
		loading: true,
	}),
	success: (state, { payload }) => ({
		...state,
		loading: false,
		byId: { ...state.byId, [payload.body.id]: payload.body },
		error: null,
	}),
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		error: payload,
	}),
})

const searchProfiles = createRPCReducer(RPC_IDS.searchProfiles, {
	start: state => ({
		...state,
		search: {
			...state.search,
			loading: true,
		},
	}),
	success: (state, { payload }) => ({
		...state,
		byId: { ...state.byId, ...keyBy(payload.body, profile => profile.id) },
		search: {
			...state.search,
			loading: false,
			results: payload.body.map(profile => profile.id),
			error: null,
		},
	}),
	failure: (state, { payload }) => ({
		...state,
		search: {
			...state.search,
			loading: false,
			error: payload,
		},
	}),
})

const setCurrentProfile = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.setCurrentProfile:
			return {
				...state,
				currentProfile: action.payload,
			}
		default:
			return state
	}
}

export default reduceReducers(
	state => state || DEFAULT_STATE,
	getProfile,
	getMyProfile,
	searchProfiles,
	setCurrentProfile,
)
