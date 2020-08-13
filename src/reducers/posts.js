import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	loading: false,
	byStreamId: {},
	byAccountId: {},
	byId: {},
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

const getPostsForStream = createRPCReducer(RPC_IDS.getPostsForStream, {
	start: state => ({
		...state,
		loading: true,
	}),
	success: (state, { payload }) => ({
		...state,
		loading: false,
		byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
		byStreamId: {
			...state.byStreamId,
			[payload.args.stream_id]: {
				count: payload.body.count,
				next: payload.body.next,
				previous: payload.body.previous,
				postIds: [
					...(state.byStreamId[payload.args.stream_id] &&
					state.byStreamId[payload.args.stream_id].postIds
						? state.byStreamId[payload.args.stream_id].postIds
						: []),
					...payload.body.results.map(post => post.id),
				],
			},
		},
		error: null,
	}),
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		error: payload,
	}),
})

const getPostsForProfile = createRPCReducer(RPC_IDS.getPostsForProfile, {
	start: state => ({
		...state,
		loading: true,
	}),
	success: (state, { payload }) => ({
		...state,
		loading: false,
		byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
		byAccountId: {
			...state.byAccountId,
			[payload.args.profileId]: {
				count: payload.body.count,
				next: payload.body.next,
				previous: payload.body.previous,
				postIds: {
					...(state.byAccountId[payload.args.profileId] &&
					state.byAccountId[payload.args.profileId].postIds
						? state.byAccountId[payload.args.profileId].postIds
						: {}),
					...payload.body.results.reduce((acc, post) => {
						acc[post.id] = true
						return acc
					}, {}),
				},
			},
		},
		error: null,
	}),
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		error: payload,
	}),
})

const getStreamsForProfile = createRPCReducer(RPC_IDS.getStreamsForProfile, {
	start: (state, { payload }) => {
		return {
			...state,
			loading: true,
		}
	},
	success: (state, { payload }) => {
		return {
			...state,
			loading: false,
			error: null,
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
			byStreamId: {
				...state.byStreamId,
				...Object.keys(payload.body.posts).reduce((acc, streamId) => {
					acc[streamId] = {
						postIds: {
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
			loading: false,
			error: payload,
		}
	},
})

export default reduceReducers(
	state => state || DEFAULT_STATE,
	getPostsForStream,
	getPostsForProfile,
	resetStore,
	getStreamsForProfile,
)
