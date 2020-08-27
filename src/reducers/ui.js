import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	follows: 'followers',
	homeStream: null,
	modals: {
		loginModal: false,
		postModal: false,
		followModal: false,
		editProfileModal: false,
		editStreamModal: false,
		createPostModal: false,
		createStreamModal: false,
	},
	images: {},
}

const setFollows = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.setFollows:
			return { ...state, follows: action.payload }
		default:
			return state
	}
}

const setHomeStream = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.setHomeStream:
			return { ...state, homeStream: action.payload }
		default:
			return state
	}
}

const resetStore = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.resetStore:
			return DEFAULT_STATE
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

const openPostModal = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.openPostModal:
			return {
				...state,
				modals: {
					...state.modals,
					postModal: action.payload,
				},
			}
		default:
			return state
	}
}

const openFollowModal = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.openFollowModal:
			return {
				...state,
				modals: {
					...state.modals,
					followModal: action.payload,
				},
			}
		default:
			return state
	}
}

const openEditProfileModal = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.openEditProfileModal:
			return {
				...state,
				modals: {
					...state.modals,
					editProfileModal: true,
				},
			}
		default:
			return state
	}
}

const openEditStreamModal = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.openEditStreamModal:
			return {
				...state,
				modals: {
					...state.modals,
					editStreamModal: action.payload,
				},
			}
		default:
			return state
	}
}

const openCreatePostModal = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.openCreatePostModal:
			return {
				...state,
				modals: {
					...state.modals,
					createPostModal: true,
				},
			}
		default:
			return state
	}
}

const openCreateStreamModal = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.openCreateStreamModal:
			return {
				...state,
				modals: {
					...state.modals,
					createStreamModal: true,
				},
			}
		default:
			return state
	}
}

const closeModals = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.closeModals:
			return {
				...state,
				modals: {
					/* do not close login modal when closing other modals */
					...DEFAULT_STATE.modals,
					loginModal: state.modals.loginModal,
				},
			}
		default:
			return state
	}
}

const getSignedUrl = createRPCReducer(RPC_IDS.getSignedUrl, {
	start: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			images: {
				...state.images,
				[payload.s3ObjectKey]: {
					...state.images[payload.s3ObjectKey],
					isLoading: true,
				},
			},
		}
	},
	success: (state, { payload }) => {
		return {
			...state,
			images: {
				...state.images,
				[payload.initialArgs.s3ObjectKey]: {
					...state.images[payload.initialArgs.s3ObjectKey],
					isLoading: false,
					signedUrl: payload.body.signedUrl,
					error: null,
				},
			},
		}
	},
	failure: (state, { payload }) => {
		return {
			...state,
			images: {
				...state.images,
				[payload.initialArgs.s3ObjectKey]: {
					...state.images[payload.initialArgs.s3ObjectKey],
					isLoading: false,
					error: payload.body,
				},
			},
		}
	},
})

export default reduceReducers(
	state => state || DEFAULT_STATE,
	resetStore,
	setFollows,
	setHomeStream,
	openLoginModal,
	closeLoginModal,
	openPostModal,
	openFollowModal,
	openEditProfileModal,
	openEditStreamModal,
	openCreatePostModal,
	openCreateStreamModal,
	closeModals,
	getSignedUrl,
)
