import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'

const DEFAULT_STATE = {
	loading: false,
	byStreamId: {},
	byAccountId: {},
	byId: {},
	error: null,
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
					...(state.byStreamId[payload.args.stream_id]
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

const getPostsForAccount = createRPCReducer(RPC_IDS.getPostsForAccount, {
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
			[payload.args.account_id]: {
				count: payload.body.count,
				next: payload.body.next,
				previous: payload.body.previous,
				postIds: [
					...(state.byAccountId[payload.args.account_id]
						? state.byAccountId[payload.args.account_id].postIds
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

export default reduceReducers(
	state => state || DEFAULT_STATE,
	getPostsForStream,
	getPostsForAccount,
)
