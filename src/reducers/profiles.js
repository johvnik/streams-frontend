import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'
import keyBy from 'lodash/keyBy'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'
import following from '../pages/following'

const DEFAULT_STATE = {
	search: {
		isLoading: false,
		results: {},
	},
	byProfile: {},
	byStream: {},
	byHandle: {},
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
	}),
	success: (state, { payload }) => ({
		...state,
		byHandle: { ...state.byHandle, [payload.body.handle]: payload.body },
	}),
	failure: (state, { payload }) => ({
		...state,
	}),
})

const getAccount = createRPCReducer(RPC_IDS.getAccount, {
	start: state => ({
		...state,
	}),
	success: (state, { payload }) => {
		return {
			...state,
			byHandle: {
				...state.byHandle,
				[payload.body.handle]: payload.body.profile,
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
	}),
})

const updateAccount = createRPCReducer(RPC_IDS.updateAccount, {
	start: state => ({
		...state,
	}),
	success: (state, { payload }) => {
		return {
			...state,
			byHandle: {
				...state.byHandle,
				[payload.body.handle]: payload.body.profile,
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
	}),
})

const searchProfiles = createRPCReducer(RPC_IDS.searchProfiles, {
	start: state => ({
		...state,
		search: {
			...state.search,
			isSearching: true,
		},
	}),
	success: (state, { payload }) => ({
		...state,
		byHandle: { ...state.byHandle, ...mapKeys(payload.body.results, 'handle') },
		search: {
			...state.search,
			isSearching: false,
			results: {
				count: payload.body.count,
				next: payload.body.next,
				previous: payload.body.previous,
				byProfile: {
					...payload.body.results.reduce((acc, profile) => {
						acc[profile.handle] = true
						return acc
					}, {}),
				},
			},
		},
	}),
	failure: (state, { payload }) => ({
		...state,
		search: {
			...state.search,
			isSearching: false,
		},
	}),
})

const getFollowxForXHelper = ({ stream, following }) => {
	const byXId = stream ? 'byStream' : 'byProfile'
	const xId = stream ? 'streamId' : 'handle'
	const followx = following ? 'following' : 'followers'

	return {
		start: (state, { payload }) => {
			return {
				...state,
			}
		},
		success: (state, { payload }) => ({
			...state,
			byHandle: {
				...state.byHandle,
				...mapKeys(payload.body.results, 'handle'),
			},
			[byXId]: {
				...state[byXId],
				[payload.initialArgs[xId]]: {
					...state[byXId][payload.initialArgs[xId]],
					[followx]: {
						count: payload.body.count,
						next: payload.body.next,
						previous: payload.body.previous,
						byProfile: {
							...(state[byXId][payload.initialArgs[xId]] &&
							state[byXId][payload.initialArgs[xId]][followx]
								? state[byXId][payload.initialArgs[xId]][followx].handles
								: {}),
							...payload.body.results.reduce((acc, profile) => {
								acc[profile.handle] = true
								return acc
							}, {}),
						},
					},
				},
			},
		}),
		failure: (state, { payload }) => {
			return {
				...state,
			}
		},
	}
}

const getFollowersForProfile = createRPCReducer(
	RPC_IDS.getFollowersForProfile,
	getFollowxForXHelper({}),
)

const getFollowingForProfile = createRPCReducer(
	RPC_IDS.getFollowingForProfile,
	getFollowxForXHelper({ following: true }),
)

const getFollowersForStream = createRPCReducer(
	RPC_IDS.getFollowersForStream,
	getFollowxForXHelper({ stream: true }),
)

const getFollowingForStream = createRPCReducer(
	RPC_IDS.getFollowingForStream,
	getFollowxForXHelper({
		stream: true,
		following: true,
	}),
)

const unfollowProfileFromProfile = createRPCReducer(
	RPC_IDS.unfollowProfileFromProfile,
	{
		start: (state, { payload }) => {
			console.log(payload)
			return {
				...state,
				following: {
					...state.following,
					byProfile: {
						...state.following.byProfile,
						[payload.myHandle]: {
							...(state.following.byProfile[payload.myHandle]
								? state.following.byProfile[payload.myHandle]
								: {}),
							[payload.handle]: false,
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
					byProfile: {
						...state.following.byProfile,
						[payload.initialArgs.myHandle]: {
							...(state.following.byProfile[payload.initialArgs.myHandle]
								? state.following.byProfile[payload.initialArgs.myHandle]
								: {}),
							[payload.initialArgs.handle]: true,
						},
					},
				},
			}
		},
	},
)

export default reduceReducers(
	state => state || DEFAULT_STATE,
	resetStore,
	getProfile,
	getAccount,
	updateAccount,
	searchProfiles,
	getFollowersForProfile,
	getFollowingForProfile,
	getFollowersForStream,
	getFollowingForStream,
	unfollowProfileFromProfile,
)

// const unfollowStream = createRPCReducer(RPC_IDS.unfollowStream, {
// 	start: (state, { payload }) => {
// 		console.log(payload)
// 		return {
// 			...state,
// 			byProfileId: {
// 				...state.byProfileId,
// 				[payload.profileId]: {
// 					...state.byProfieId[payload.profileId],
// 					following: {
// 						...(state.byProfieId[payload.profileId] &&
// 						state.byProfieId[payload.profileId].following
// 							? state.byProfieId[payload.profileId].following
// 							: {}),
// 						profileIds: {
// 							...(state.byProfieId[payload.profileId] &&
// 							state.byProfieId[payload.profileId].following &&
// 							state.byProfieId[payload.profileId].following.profileIds
// 								? state.byProfieId[payload.profileId].following.profileIds
// 								: {}),
// 							[payload.streamOwnerId]: true,
// 						},
// 					},
// 				},
// 				[payload.streamOwnerId]: {
// 					...state.byProfieId[payload.streamOwnerId],
// 					followers: {
// 						...(state.byProfieId[payload.streamOwnerId] &&
// 						state.byProfieId[payload.streamOwnerId].followers
// 							? state.byProfieId[payload.streamOwnerId].followers
// 							: {}),
// 						profileIds: {
// 							...(state.byProfieId[payload.streamOwnerId] &&
// 							state.byProfieId[payload.streamOwnerId].followers &&
// 							state.byProfieId[payload.streamOwnerId].followers.profileIds
// 								? state.byProfieId[payload.streamOwnerId].followers.profileIds
// 								: {}),
// 							[payload.profileId]: false,
// 						},
// 					},
// 				},
// 			},
// 		}
// 	},
// 	success: (state, { payload }) => state,
// 	failure: (state, { payload }) => state,
// })

// const followProfile = createRPCReducer(RPC_IDS.followProfile, {
// 	start: (state, { payload }) => {
// 		console.log(payload)
// 		return {
// 			...state,
// 			byProfileId: {
// 				...state.byProfileId,
// 				[payload.authProfileId]: {
// 					...state.byProfieId[payload.authProfileId],
// 					following: {
// 						...(state.byProfieId[payload.authProfileId] &&
// 						state.byProfieId[payload.authProfileId].following
// 							? state.byProfieId[payload.authProfileId].following
// 							: {}),
// 						[payload.profileId]: true,
// 					},
// 				},
// 			},
// 		}
// 	},
// 	success: (state, { payload }) => state,
// 	failure: (state, { payload }) => ({
// 		...state,
// 		byProfileId: {
// 			...state.byProfileId,
// 			[payload.authProfileId]: {
// 				...state.byProfieId[payload.authProfileId],
// 				following: {
// 					...(state.byProfieId[payload.authProfileId]
// 						? state.byProfieId[payload.authProfileId].following
// 						: {}),
// 					[payload.profileId]: false,
// 				},
// 			},
// 		},
// 	}),
// })

// const getMyProfile = createRPCReducer(RPC_IDS.getMyProfile, {
// 	start: state => ({
// 		...state,
// 		isLoading: true,
// 	}),
// 	success: (state, { payload }) => ({
// 		...state,
// 		isLoading: false,
// 		hasLoaded: true,
// 		byId: { ...state.byId, [payload.body.id]: payload.body },
// 		error: null,
// 	}),
// 	failure: (state, { payload }) => ({
// 		...state,
// 		isLoading: false,
// 		hasLoaded: true,
// 		error: payload,
// 	}),
// })

// const getFollowersForMe = createRPCReducer(RPC_IDS.getFollowersForMe, {
// 	start: state => ({
// 		...state,
// 		followers: {
// 			...state.followers,
// 			isLoading: true,
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
// 			isLoading: false,
// 			byProfileId: {
// 				...state.followers.byProfileId,
// 				// [payload.body.profile]: {
// 				// 	...payload.body.data.reduce((acc, profile) => {
// 				// 		acc[profile.id] = true
// 				// 		return acc
// 				// 	}, {}),
// 				// },
// 				[payload.initialArgs.profileId]: {
// 					count: payload.body.count,
// 					next: payload.body.next,
// 					previous: payload.body.previous,
// 					profileIds: {
// 						...(state.followers.byProfileId[payload.initialArgs.profileId]
// 							? state.followers.byProfileId[payload.initialArgs.profileId].profileIds
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
// 			isLoading: false,
// 			error: payload,
// 		},
// 	}),
// })

// const getFollowingForMe = createRPCReducer(RPC_IDS.getFollowingForMe, {
// 	start: state => ({
// 		...state,
// 		following: {
// 			...state.following,
// 			isLoading: true,
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
// 				isLoading: false,
// 				byId: {
// 					...state.following.byId,
// 					// [payload.body.profile]: {
// 					// 	...payload.body.data.reduce((acc, profile) => {
// 					// 		acc[profile.id] = true
// 					// 		return acc
// 					// 	}, {}),
// 					// },
// 					[payload.initialArgs.profileId]: {
// 						count: payload.body.count,
// 						next: payload.body.next,
// 						previous: payload.body.previous,
// 						profileIds: {
// 							...(state.following.byProfileId[payload.initialArgs.profileId]
// 								? state.following.byProfileId[payload.initialArgs.profileId].profileIds
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
// 			isLoading: false,
// 			error: payload,
// 		},
// 	}),
// })
