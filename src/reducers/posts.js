import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	byStream: {},
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

const getPostsForStream = createRPCReducer(RPC_IDS.getPostsForStream, {
	start: state => ({
		...state,
	}),
	success: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
			byStream: {
				...state.byStream,
				[payload.initialArgs.streamId]: {
					count: payload.body.count,
					next: payload.body.next,
					previous: payload.body.previous,
					postIds: {
						...(state.byStream[payload.initialArgs.streamId] &&
						state.byStream[payload.initialArgs.streamId].postIds
							? state.byStream[payload.initialArgs.streamId].postIds
							: {}),
						...payload.body.results.reduce((acc, post) => {
							acc[post.id] = true
							return acc
						}, {}),
					},
				},
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
	}),
})

const getPostsForProfile = createRPCReducer(RPC_IDS.getPostsForProfile, {
	start: state => ({
		...state,
	}),
	success: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
			byProfile: {
				...state.byProfile,
				[payload.initialArgs.handle]: {
					count: payload.body.count,
					next: payload.body.next,
					previous: payload.body.previous,
					postIds: {
						...(state.byProfile[payload.initialArgs.handle] &&
						state.byProfile[payload.initialArgs.handle].postIds
							? state.byProfile[payload.initialArgs.handle].postIds
							: {}),
						...payload.body.results.reduce((acc, post) => {
							acc[post.id] = true
							return acc
						}, {}),
					},
				},
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
	}),
})

const getStreamsForProfile = createRPCReducer(RPC_IDS.getStreamsForProfile, {
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
				...mapKeys(
					Object.values(payload.body.posts).reduce((acc, posts) => {
						acc = [...acc, ...posts]
						return acc
					}, []),
					'id',
				),
			},
			byStream: {
				...state.byStream,
				...Object.keys(payload.body.posts).reduce((acc, streamId) => {
					acc[streamId] = {
						...(state.byStream[streamId] ? state.byStream[streamId] : {}),
						postIds: {
							...(state.byStream[streamId] && state.byStream[streamId].postIds
								? state.byStream[streamId].postIds
								: {}),
							...payload.body.posts[streamId].reduce((accu, post) => {
								accu[post.id] = true
								return accu
							}, {}),
						},
					}
					return acc
				}, {}),
			},
		}
	},
	failure: (state, { payload }) => {
		return {
			...state,
		}
	},
})

export default reduceReducers(
	state => state || DEFAULT_STATE,
	resetStore,
	getPostsForStream,
	getPostsForProfile,
	getStreamsForProfile,
)
