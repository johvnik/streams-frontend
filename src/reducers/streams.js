import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	isSaving: false,
	isDeleting: false,
	byProfile: {},
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

const createStream = createRPCReducer(RPC_IDS.createStream, {
	start: state => ({
		...state,
		isSaving: true,
	}),
	success: (state, { payload }) => {
		console.log(payload)
		return {
			...state,
			isSaving: false,
			byProfile: {
				...state.byProfile,
				[payload.body.handle]: {
					...(state.byProfile[payload.body.handle]
						? state.byProfile[payload.body.handle]
						: {}),
					all: {
						...(state.byProfile[payload.body.handle] &&
						state.byProfile[payload.body.handle].all
							? state.byProfile[payload.body.handle].all
							: {}),
						[payload.body.id]: true,
					},
				},
			},
			byId: {
				...state.byId,
				[payload.body.id]: payload.body,
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
		isSaving: false,
	}),
})

const getStream = createRPCReducer(RPC_IDS.getStream, {
	start: (state, { payload }) => {
		return {
			...state,
		}
	},
	success: (state, { payload }) => {
		return {
			...state,
			byId: {
				...state.byId,
				[payload.body.id]: payload.body,
			},
		}
	},
	failure: (state, { payload }) => {
		return {
			...state,
		}
	},
})

const updateStream = createRPCReducer(RPC_IDS.updateStream, {
	start: state => ({
		...state,
		isSaving: true,
	}),
	success: (state, { payload }) => {
		console.log(payload)
		return {
			...state,
			isSaving: false,
			byId: {
				...state.byId,
				[payload.body.id]: payload.body,
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
		isSaving: false,
	}),
})

const deleteStream = createRPCReducer(RPC_IDS.deleteStream, {
	start: (state, { payload }) => {
		console.log(payload)
		return {
			...state,
			isDeleting: true,
			byProfile: {
				...state.byProfile,
				[payload.handle]: {
					...(state.byProfile[payload.handle]
						? state.byProfile[payload.handle]
						: {}),
					all: {
						...(state.byProfile[payload.handle] &&
						state.byProfile[payload.handle].all
							? state.byProfile[payload.handle].all
							: {}),
						[payload.streamId]: false,
					},
				},
			},
		}
	},
	success: (state, { payload }) => {
		return {
			...state,
			isDeleting: false,
		}
	},
	failure: (state, { payload }) => ({
		...state,
		isDeleting: false,
		byProfile: {
			...state.byProfile,
			[payload.initialArgs.handle]: {
				...(state.byProfile[payload.initialArgs.handle]
					? state.byProfile[payload.initialArgs.handle]
					: {}),
				all: {
					...(state.byProfile[payload.initialArgs.handle] &&
					state.byProfile[payload.initialArgs.handle].all
						? state.byProfile[payload.initialArgs.handle].all
						: {}),
					[payload.initialArgs.streamId]: false,
				},
			},
		},
	}),
})

const followUnfollowStreamHelper = ({ unfollow }) => {
	return {
		start: (state, { payload }) => {
			return {
				...state,
				byProfile: {
					...state.byProfile,
					[payload.handle]: {
						...state.byProfile[payload.handle],
						following: {
							...(state.byProfile[payload.handle]
								? state.byProfile[payload.handle].following
								: {}),
							[payload.streamId]: !unfollow,
						},
					},
				},
			}
		},
		success: (state, { payload }) => state,
		failure: (state, { payload }) => {
			return {
				...state,
				byProfile: {
					...state.byProfile,
					[payload.initialArgs.handle]: {
						...state.byProfile[payload.initialArgs.handle],
						following: {
							...(state.byProfile[payload.initialArgs.handle]
								? state.byProfile[payload.initialArgs.handle].following
								: {}),
							[payload.initialArgs.streamId]: !!unfollow,
						},
					},
				},
			}
		},
	}
}

const followStream = createRPCReducer(
	RPC_IDS.followStream,
	followUnfollowStreamHelper({}),
)

const unfollowStream = createRPCReducer(
	RPC_IDS.unfollowStream,
	followUnfollowStreamHelper({ unfollow: true }),
)

const getStreamsForProfile = createRPCReducer(RPC_IDS.getStreamsForProfile, {
	start: state => ({
		...state,
	}),
	success: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			byProfile: {
				...state.byProfile,
				[payload.initialArgs.handle]: {
					following: {
						...payload.body.streams.reduce((acc, stream) => {
							if (stream.handle != payload.initialArgs.handle) {
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
	}),
})

export default reduceReducers(
	state => state || DEFAULT_STATE,
	resetStore,
	getStreamsForProfile,
	createStream,
	getStream,
	updateStream,
	deleteStream,
	followStream,
	unfollowStream,
	getStreamsForProfile,
)

// const setHomeStream = (state, action) => {
// 	switch (action.type) {
// 		case ACTION_IDS.setHomeStream:
// 			return {
// 				...state,
// 				homeStream: action.payload,
// 			}
// 		default:
// 			return state
// 	}
// }
