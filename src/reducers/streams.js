import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	loading: false,
	hasLoaded: false,
	error: null,
	currentStream: null,
	byProfileId: {},
	byId: {},
}

const resetStore = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.resetStore:
			return { ...DEFAULT_STATE }
		default:
			return state
	}
}

const getStreamsForProfile = createRPCReducer(RPC_IDS.getStreamsForProfile, {
	start: state => ({
		...state,
		loading: true,
	}),
	success: (state, { payload }) => {
		return {
			...state,
			loading: false,
			hasLoaded: true,
			error: null,
			byProfileId: {
				...state.byProfileId,
				[payload.body.profileId]: {
					following: {
						...payload.body.streams.reduce((acc, stream) => {
							if (stream.owner != payload.body.profileId) {
								acc[stream.id] = true
							}
							return acc
						}, {}),
					},
					all: {
						...payload.body.streams.reduce((acc, stream) => {
							acc[stream.id] = true
							return acc
						}, {}),
					},
				},
			},
			byId: {
				...state.byId,
				...mapKeys(payload.body.streams, 'id'),
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		hasLoaded: true,
		error: payload,
	}),
})

const unfollowStream = createRPCReducer(RPC_IDS.unfollowStream, {
	start: (state, { payload }) => {
		return {
			...state,
			byProfileId: {
				...state.byProfileId,
				[payload.profileId]: {
					...state.byProfileId[payload.profileId],
					following: {
						...(state.byProfileId[payload.profileId]
							? state.byProfileId[payload.profileId].following
							: {}),
						[payload.streamId]: false,
					},
				},
			},
		}
	},
	success: (state, { payload }) => state,
	failure: (state, { payload }) => {
		return {
			...state,
			byProfileId: {
				...state.byProfileId,
				[payload.initialArgs.profileId]: {
					...state.byProfileId[payload.initialArgs.profileId],
					following: {
						...(state.byProfileId[payload.initialArgs.profileId]
							? state.byProfileId[payload.initialArgs.profileId].following
							: {}),
						[payload.initialArgs.streamId]: true,
					},
				},
			},
		}
	},
})

const followStream = createRPCReducer(RPC_IDS.followStream, {
	start: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			byProfileId: {
				...state.byProfileId,
				[payload.profileId]: {
					...state.byProfileId[payload.profileId],
					following: {
						...(state.byProfileId[payload.profileId]
							? state.byProfileId[payload.profileId].following
							: {}),
						[payload.streamId]: true,
					},
				},
			},
		}
	},
	success: (state, { payload }) => state,
	failure: (state, { payload }) => {
		return {
			...state,
			byProfileId: {
				...state.byProfileId,
				[payload.initialArgs.profileId]: {
					...state.byProfileId[payload.initialArgs.profileId],
					following: {
						...(state.byProfileId[payload.initialArgs.profileId]
							? state.byProfileId[payload.initialArgs.profileId].following
							: {}),
						[payload.initialArgs.streamId]: false,
					},
				},
			},
		}
	},
})

const setCurrentStream = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.setCurrentStream:
			return {
				...state,
				currentStream: action.payload,
			}
		default:
			return state
	}
}

export default reduceReducers(
	state => state || DEFAULT_STATE,
	getStreamsForProfile,
	setCurrentStream,
	resetStore,
	unfollowStream,
	followStream,
)
