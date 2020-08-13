import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'
import keyBy from 'lodash/keyBy'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	loading: false,
	search: {
		loading: false,
		results: [],
		error: null,
	},
	byProfileId: {},
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
		byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
		search: {
			...state.search,
			loading: false,
			results: {
				count: payload.body.count,
				next: payload.body.next,
				previous: payload.body.previous,
				profileIds: {
					...payload.body.results.reduce((acc, profile) => {
						acc[profile.id] = true
						return acc
					}, {}),
				},
			},
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

const getFollowersForProfile = createRPCReducer(
	RPC_IDS.getFollowersForProfile,
	{
		start: (state, { payload }) => {
			return {
				...state,
				byProfileId: {
					...state.byProfileId,
					[payload.profileId]: {
						...state.byProfileId[payload.profileId],
						followers: {
							...(state.byProfileId[payload.profileId] &&
							state.byProfileId[payload.profileId].followers
								? state.byProfileId[payload.profileId].followers
								: {}),
							loading: true,
						},
					},
				},
			}
		},
		success: (state, { payload }) => {
			return {
				...state,
				byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
				byProfileId: {
					...state.byProfileId,
					[payload.args.profileId]: {
						...state.byProfileId[payload.args.profileId],
						followers: {
							count: payload.body.count,
							next: payload.body.next,
							previous: payload.body.previous,
							profileIds: {
								...(state.byProfileId[payload.args.profileId] &&
								state.byProfileId[payload.args.profileId].followers
									? state.byProfileId[payload.args.profileId].followers
											.profileIds
									: {}),
								...payload.body.results.reduce((acc, profile) => {
									acc[profile.id] = true
									return acc
								}, {}),
							},
							loading: false,
							error: null,
						},
					},
				},
				error: null,
			}
		},
		failure: (state, { payload }) => ({
			...state,
			byProfileId: {
				...state.byProfileId,
				[payload.args.profileId]: {
					...state.byProfileId[payload.args.profileId],
					followers: {
						...(state.byProfileId[payload.args.profileId] &&
						state.byProfileId[payload.args.profileId].followers
							? state.byProfileId[payload.args.profileId].followers
							: {}),
						error: payload,
					},
				},
			},
		}),
	},
)

const getFollowingForProfile = createRPCReducer(
	RPC_IDS.getFollowingForProfile,
	{
		start: (state, { payload }) => {
			return {
				...state,
				byProfileId: {
					...state.byProfileId,
					[payload.profileId]: {
						...state.byProfileId[payload.profileId],
						following: {
							...(state.byProfileId[payload.profileId] &&
							state.byProfileId[payload.profileId].following
								? state.byProfileId[payload.profileId].following
								: {}),
							loading: true,
						},
					},
				},
			}
		},
		success: (state, { payload }) => {
			return {
				...state,
				byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
				byProfileId: {
					...state.byProfileId,
					[payload.args.profileId]: {
						...state.byProfileId[payload.args.profileId],
						following: {
							count: payload.body.count,
							next: payload.body.next,
							previous: payload.body.previous,
							profileIds: {
								...(state.byProfileId[payload.args.profileId] &&
								state.byProfileId[payload.args.profileId].following
									? state.byProfileId[payload.args.profileId].following
											.profileIds
									: {}),
								...payload.body.results.reduce((acc, profile) => {
									acc[profile.id] = true
									return acc
								}, {}),
							},
							loading: false,
							error: null,
						},
					},
				},
				error: null,
			}
		},
		failure: (state, { payload }) => ({
			...state,
			byProfileId: {
				...state.byProfileId,
				[payload.args.profileId]: {
					...state.byProfileId[payload.args.profileId],
					following: {
						...(state.byProfileId[payload.args.profileId] &&
						state.byProfileId[payload.args.profileId].following
							? state.byProfileId[payload.args.profileId].following
							: {}),
						error: payload,
					},
				},
			},
		}),
	},
)

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

const unfollowProfileFromProfile = createRPCReducer(
	RPC_IDS.unfollowProfileFromProfile,
	{
		start: (state, { payload }) => {
			console.log(payload)
			return {
				...state,
				following: {
					...state.following,
					byId: {
						...state.following.byId,
						[payload.myProfileId]: {
							...(state.following.byId[payload.myProfileId]
								? state.following.byId[payload.myProfileId]
								: {}),
							[payload.profileId]: false,
						},
					},
				},
			}
		},
		success: (state, { payload }) => state,
		failure: (state, { payload }) => {
			console.log(payload)
			return {
				...state,
				following: {
					...state.following,
					byId: {
						...state.following.byId,
						[payload.myProfileId]: {
							...(state.following.byId[payload.myProfileId]
								? state.following.byId[payload.myProfileId]
								: {}),
							[payload.profileId]: true,
						},
					},
				},
			}
		},
	},
)

const followProfile = createRPCReducer(RPC_IDS.followProfile, {
	start: (state, { payload }) => {
		console.log(payload)
		return {
			...state,
			following: {
				...state.following,
				byId: {
					...state.following.byId,
					[payload.myProfileId]: {
						...(state.following.byId[payload.myProfileId]
							? state.following.byId[payload.myProfileId]
							: {}),
						[payload.profileId]: true,
					},
				},
			},
		}
	},
	success: (state, { payload }) => state,
	failure: (state, { payload }) => state,
})

export default reduceReducers(
	state => state || DEFAULT_STATE,
	resetStore,
	getProfile,
	// getMyProfile,
	followProfile,
	searchProfiles,
	setCurrentProfile,
	// getFollowingForMe,
	// getFollowersForMe,
	getFollowersForProfile,
	getFollowingForProfile,
	unfollowProfileFromProfile,
)

// const getMyProfile = createRPCReducer(RPC_IDS.getMyProfile, {
// 	start: state => ({
// 		...state,
// 		loading: true,
// 	}),
// 	success: (state, { payload }) => ({
// 		...state,
// 		loading: false,
// 		hasLoaded: true,
// 		byId: { ...state.byId, [payload.body.id]: payload.body },
// 		error: null,
// 	}),
// 	failure: (state, { payload }) => ({
// 		...state,
// 		loading: false,
// 		hasLoaded: true,
// 		error: payload,
// 	}),
// })

// const getFollowersForMe = createRPCReducer(RPC_IDS.getFollowersForMe, {
// 	start: state => ({
// 		...state,
// 		followers: {
// 			...state.followers,
// 			loading: true,
// 		},
// 	}),
// 	success: (state, { payload }) => ({
// 		...state,
// 		// byId: {
// 		// 	...state.byId,
// 		// 	...keyBy(payload.body.data, profile => profile.id),
// 		// },
// 		byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
// 		followers: {
// 			...state.followers,
// 			loading: false,
// 			byProfileId: {
// 				...state.followers.byProfileId,
// 				// [payload.body.profile]: {
// 				// 	...payload.body.data.reduce((acc, profile) => {
// 				// 		acc[profile.id] = true
// 				// 		return acc
// 				// 	}, {}),
// 				// },
// 				[payload.args.profileId]: {
// 					count: payload.body.count,
// 					next: payload.body.next,
// 					previous: payload.body.previous,
// 					profileIds: {
// 						...(state.followers.byProfileId[payload.args.profileId]
// 							? state.followers.byProfileId[payload.args.profileId].profileIds
// 							: {}),
// 						...payload.body.results.reduce((acc, profile) => {
// 							acc[profile.id] = true
// 							return acc
// 						}, {}),
// 					},
// 				},
// 			},
// 			error: null,
// 		},
// 	}),
// 	failure: (state, { payload }) => ({
// 		...state,
// 		followers: {
// 			...state.followers,
// 			loading: false,
// 			error: payload,
// 		},
// 	}),
// })

// const getFollowingForMe = createRPCReducer(RPC_IDS.getFollowingForMe, {
// 	start: state => ({
// 		...state,
// 		following: {
// 			...state.following,
// 			loading: true,
// 		},
// 	}),
// 	success: (state, { payload }) => {
// 		// console.log(payload)
// 		return {
// 			...state,
// 			// byId: { ...state.byId, ...keyBy(payload.body.data, profile => profile.id) },
// 			byId: { ...state.byId, ...mapKeys(payload.body.results, 'id') },
// 			following: {
// 				...state.following,
// 				loading: false,
// 				byId: {
// 					...state.following.byId,
// 					// [payload.body.profile]: {
// 					// 	...payload.body.data.reduce((acc, profile) => {
// 					// 		acc[profile.id] = true
// 					// 		return acc
// 					// 	}, {}),
// 					// },
// 					[payload.args.profileId]: {
// 						count: payload.body.count,
// 						next: payload.body.next,
// 						previous: payload.body.previous,
// 						profileIds: {
// 							...(state.following.byProfileId[payload.args.profileId]
// 								? state.following.byProfileId[payload.args.profileId].profileIds
// 								: {}),
// 							...payload.body.results.reduce((acc, profile) => {
// 								acc[profile.id] = true
// 								return acc
// 							}, {}),
// 						},
// 					},
// 				},
// 				error: null,
// 			},
// 		}
// 	},
// 	failure: (state, { payload }) => ({
// 		...state,
// 		following: {
// 			...state.following,
// 			loading: false,
// 			error: payload,
// 		},
// 	}),
// })
