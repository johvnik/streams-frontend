import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	loading: false,
	error: null,
	currentStream: {},
	ownStreams: {
		byId: {},
		allIds: [],
	},
	followedStreams: {
		byId: {},
		allIds: [],
	},
}

const getStreams = createRPCReducer(RPC_IDS.getStreams, {
	start: state => ({
		...state,
		loading: true,
	}),
	success: (state, { payload }) => {
		console.log(payload)
		return {
			...state,
			loading: false,
			error: null,
			ownStreams: {
				...state.ownStreams,
				byId: {
					...state.ownStreams.byId,
					...mapKeys(payload.body.ownStreams, 'id'),
				},
				allIds: [
					...state.ownStreams.allIds,
					...payload.body.ownStreams.map(stream => stream.id),
				],
			},
			followedStreams: {
				...state.followedStreams,
				byId: {
					...state.followedStreams.byId,
					...mapKeys(payload.body.followedStreams, 'id'),
				},
				allIds: [
					...state.followedStreams.allIds,
					...payload.body.followedStreams.map(stream => stream.id),
				],
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
		loading: false,
		error: payload,
	}),
})

const getMyOwnStreams = createRPCReducer(RPC_IDS.getMyOwnStreams, {
	start: state => ({
		...state,
		ownStreams: {
			...state.ownStreams,
			loading: true,
		},
	}),
	success: (state, { payload }) => {
		return {
			...state,
			ownStreams: {
				...state.ownStreams,
				loading: false,
				byId: { ...state.ownStreams.byId, ...mapKeys(payload.body, 'id') },
				allIds: [
					...state.ownStreams.allIds,
					...payload.body.map(stream => stream.id),
				],
				error: {},
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
		ownStreams: {
			...state.ownStreams,
			loading: false,
			error: payload.body,
		},
	}),
})

const getStreamsIFollow = createRPCReducer(RPC_IDS.getStreamsIFollow, {
	start: state => ({
		...state,
		followedStreams: {
			...state.followedStreams,
			loading: true,
		},
	}),
	success: (state, { payload }) => ({
		...state,
		followedStreams: {
			...state.followedStreams,
			loading: false,
			byId: { ...state.followedStreams.byId, ...mapKeys(payload.body, 'id') },
			allIds: [
				...state.followedStreams.allIds,
				...payload.body.map(stream => stream.id),
			],
			error: {},
		},
	}),
	failure: (state, { payload }) => ({
		...state,
		followedStreams: {
			...state.followedStreams,
			loading: false,
			error: payload.body,
		},
	}),
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
	getStreams,
	getMyOwnStreams,
	getStreamsIFollow,
	setCurrentStream,
)
