import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	byStream: {},
	byProfile: {},
	byExplore: {},
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

const getPost = createRPCReducer(RPC_IDS.getPost, {
	start: state => ({
		...state,
	}),
	success: (state, { payload }) => {
		return {
			...state,
			byId: {
				...state.byId,
				[payload.body.id]: payload.body,
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
	}),
})

const getExplore = createRPCReducer(RPC_IDS.getExplore, {
	start: state => ({
		...state,
		byExplore: {
			...state.byExplore,
			isLoading: true,
		},
	}),
	success: (state, { payload }) => {
		return {
			...state,
			byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
			byExplore: {
				...state.byExplore,
				count: payload.body.count,
				next: payload.body.next,
				previous: payload.body.previous,
				results: {
					...(state.byExplore && state.byExplore.results
						? state.byExplore.results
						: {}),
					...payload.body.results.reduce((acc, post) => {
						acc[post.id] = true
						return acc
					}, {}),
				},
				isLoading: false,
				error: null,
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
		byExplore: {
			...state.byExplore,
			isLoading: false,
			error: payload.body,
		},
	}),
})

const getPostsForStream = createRPCReducer(RPC_IDS.getPostsForStream, {
	start: (state, { payload }) => ({
		...state,
		byStream: {
			...state.byStream,
			[payload.streamId]: {
				...state.byStream[payload.streamId],
				isLoading: true,
			},
		},
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
					results: {
						...(state.byStream[payload.initialArgs.streamId] &&
						state.byStream[payload.initialArgs.streamId].results
							? state.byStream[payload.initialArgs.streamId].results
							: {}),
						...payload.body.results.reduce((acc, post) => {
							acc[post.id] = true
							return acc
						}, {}),
					},
					isLoading: false,
					error: null,
				},
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
		byStream: {
			...state.byStream,
			[payload.initialArgs.streamId]: {
				...state.byStream[payload.initialArgs.streamId],
				isLoading: false,
				error: payload.body,
			},
		},
	}),
})

const getPostsForProfile = createRPCReducer(RPC_IDS.getPostsForProfile, {
	start: (state, { payload }) => ({
		...state,
		byProfile: {
			...state.byProfile,
			[payload.handle]: {
				...state.byProfile[payload.handle],
				isLoading: true,
			},
		},
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
					results: {
						...(state.byProfile[payload.initialArgs.handle] &&
						state.byProfile[payload.initialArgs.handle].results
							? state.byProfile[payload.initialArgs.handle].results
							: {}),
						...payload.body.results.reduce((acc, post) => {
							acc[post.id] = true
							return acc
						}, {}),
					},
					isLoading: true,
					error: payload.body,
				},
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
		byProfile: {
			...state.byProfile,
			[payload.initialArgs.handle]: {
				...state.byProfile[payload.initialArgs.handle],
				isLoading: true,
				error: payload.body,
			},
		},
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
						results: {
							...(state.byStream[streamId] && state.byStream[streamId].results
								? state.byStream[streamId].results
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
	getPost,
	getExplore,
	getPostsForStream,
	getPostsForProfile,
	getStreamsForProfile,
)
