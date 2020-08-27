import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'

const DEFAULT_STATE = {
	postLikes: {
		byPost: {},
		byProfile: {},
	},
	commentLikes: {
		byProfile: {},
	},
}

const likePost = createRPCReducer(RPC_IDS.likePost, {
	start: (state, { payload }) => ({
		...state,
		postLikes: {
			...state.postLikes,
			byProfile: {
				...state.postLikes.byProfile,
				[payload.handle]: {
					...state.postLikes.byProfile[payload.handle],
					postIds: {
						...(state.postLikes.byProfile[payload.handle] &&
						state.postLikes.byProfile[payload.handle].postIds
							? state.postLikes.byProfile[payload.handle].postIds
							: {}),
						[payload.postId]: true,
					},
				},
			},
		},
	}),
	success: (state, { payload }) => {
		return {
			...state,
		}
	},
	failure: (state, { payload }) => ({
		...state,
		postLikes: {
			...state.postLikes,
			byProfile: {
				...state.postLikes.byProfile,
				[payload.initialArgs.handle]: {
					...state.postLikes.byProfile[payload.initialArgs.handle],
					postIds: {
						...(state.postLikes.byProfile[payload.initialArgs.handle] &&
						state.postLikes.byProfile[payload.initialArgs.handle].postIds
							? state.postLikes.byProfile[payload.initialArgs.handle].postIds
							: {}),
						[payload.initialArgs.postId]: false,
					},
				},
			},
		},
	}),
})

const unlikePost = createRPCReducer(RPC_IDS.unlikePost, {
	start: (state, { payload }) => ({
		...state,
		postLikes: {
			...state.postLikes,
			byProfile: {
				...state.postLikes.byProfile,
				[payload.handle]: {
					...state.postLikes.byProfile[payload.handle],
					postIds: {
						...(state.postLikes.byProfile[payload.handle] &&
						state.postLikes.byProfile[payload.handle].postIds
							? state.postLikes.byProfile[payload.handle].postIds
							: {}),
						[payload.postId]: false,
					},
				},
			},
		},
	}),
	success: (state, { payload }) => {
		return {
			...state,
		}
	},
	failure: (state, { payload }) => ({
		...state,
		postLikes: {
			...state.postLikes,
			byProfile: {
				...state.postLikes.byProfile,
				[payload.initialArgs.handle]: {
					...state.postLikes.byProfile[payload.initialArgs.handle],
					postIds: {
						...(state.postLikes.byProfile[payload.initialArgs.handle] &&
						state.postLikes.byProfile[payload.initialArgs.handle].postIds
							? state.postLikes.byProfile[payload.initialArgs.handle].postIds
							: {}),
						[payload.initialArgs.postId]: true,
					},
				},
			},
		},
	}),
})

const getAllPostLikes = createRPCReducer(RPC_IDS.getAllPostLikes, {
	start: (state, { payload }) => ({
		...state,
	}),
	success: (state, { payload }) => {
		return {
			...state,
			postLikes: {
				...state.postLikes,
				byProfile: {
					...state.postLikes.byProfile,
					[payload.initialArgs.handle]: {
						...state.postLikes.byProfile[payload.initialArgs.handle],
						postIds: {
							...payload.body.likes.reduce((acc, like) => {
								acc[like.post] = true
								return acc
							}, {}),
						},
					},
				},
			},
		}
	},
	failure: (state, { payload }) => ({
		...state,
	}),
})

// const getPostLikesForProfile = createRPCReducer(
// 	RPC_IDS.getPostLikesForProfile,
// 	{
// 		start: state => ({
// 			...state,
// 			postLikes: {
// 				...state.postLikes,
// 				loading: true,
// 			},
// 		}),
// 		success: (state, { payload }) => {
// 			return {
// 				...state,
// 				postLikes: {
// 					...state.postLikes,
// 					loading: false,
// 					accountIds: {
// 						...state.postLikes.accountIds,
// 						[payload.args.account_id]: {
// 							postIds: {
// 								...(state.postLikes.accountIds[payload.args.account_id]
// 									? state.postLikes.accountIds[payload.args.account_id].postIds
// 									: {}),
// 								...payload.body.reduce((acc, like) => {
// 									acc[like.post] = like.id
// 									return acc
// 								}, {}),
// 							},
// 						},
// 					},
// 					byId: {
// 						...state.postLikes.byId,
// 						...mapKeys(payload.body, 'id'),
// 					},
// 					error: {},
// 				},
// 			}
// 		},
// 		failure: (state, { payload }) => ({
// 			...state,
// 			postLikes: {
// 				...state.postLikes,
// 				loading: false,
// 				error: payload.body,
// 			},
// 		}),
// 	},
// )

// const getCommentLikesForProfile = createRPCReducer(
// 	RPC_IDS.getCommentLikesForProfile,
// 	{
// 		start: state => ({
// 			...state,
// 			commentLikes: {
// 				...state.commentLikes,
// 				loading: true,
// 			},
// 		}),
// 		success: (state, { payload }) => {
// 			return {
// 				...state,
// 				commentLikes: {
// 					...state.commentLikes,
// 					loading: false,
// 					accountIds: {
// 						...state.commentLikes.accountIds,
// 						[payload.args.account_id]: {
// 							commentIds: {
// 								...(state.commentLikes.accountIds[payload.args.account_id]
// 									? state.commentLikes.accountIds[payload.args.account_id]
// 											.commentIds
// 									: {}),
// 								...mapKeys(true, 'post'),
// 							},
// 						},
// 					},
// 					byCommentId: {
// 						...state.commentLikes.byCommentId,
// 						...mapKeys(payload.body, 'post'),
// 					},
// 					error: {},
// 				},
// 			}
// 		},
// 		failure: (state, { payload }) => ({
// 			...state,
// 			commentLikes: {
// 				...state.commentLikes,
// 				loading: false,
// 				error: payload.body,
// 			},
// 		}),
// 	},
// )

// const likePost = createRPCReducer(RPC_IDS.likePost, {
// 	start: (state, { payload }) => {
// 		return {
// 			...state,
// 			postLikes: {
// 				...state.postLikes,
// 				loading: true,
// 				accountIds: {
// 					...state.postLikes.accountIds,
// 					[payload.account]: {
// 						postIds: {
// 							...(state.postLikes.accountIds[payload.account]
// 								? state.postLikes.accountIds[payload.account].postIds
// 								: {}),
// 							[payload.post]: true,
// 						},
// 					},
// 				},
// 			},
// 		}
// 	},
// 	success: (state, { payload }) => {
// 		return {
// 			...state,
// 			postLikes: {
// 				...state.postLikes,
// 				loading: false,
// 				accountIds: {
// 					...state.postLikes.accountIds,
// 					[payload.args.account]: {
// 						postIds: {
// 							...(state.postLikes.accountIds[payload.args.account]
// 								? state.postLikes.accountIds[payload.args.account].postIds
// 								: {}),
// 							[payload.body.post]: payload.body.id,
// 						},
// 					},
// 				},
// 				byId: {
// 					...state.postLikes.byId,
// 					[payload.body.id]: payload.body,
// 				},
// 				error: {},
// 			},
// 		}
// 	},
// 	failure: (state, { payload }) => {
// 		return {
// 			...state,
// 			postLikes: {
// 				...state.postLikes,
// 				loading: false,
// 				accountIds: {
// 					...state.postLikes.accountIds,
// 					[payload.initialArgs.account]: {
// 						postIds: {
// 							...(state.postLikes.accountIds[payload.initialArgs.account]
// 								? state.postLikes.accountIds[payload.initialArgs.account]
// 										.postIds
// 								: {}),
// 							[payload.initialArgs.post]: false,
// 						},
// 					},
// 				},
// 				error: payload,
// 			},
// 		}
// 	},
// })

// const unlikePost = createRPCReducer(RPC_IDS.unlikePost, {
// 	start: (state, { payload }) => {
// 		return {
// 			...state,
// 			postLikes: {
// 				...state.postLikes,
// 				loading: true,
// 				accountIds: {
// 					...state.postLikes.accountIds,
// 					[payload.account]: {
// 						postIds: {
// 							...(state.postLikes.accountIds[payload.account]
// 								? state.postLikes.accountIds[payload.account].postIds
// 								: {}),
// 							[payload.post]: false,
// 						},
// 					},
// 				},
// 			},
// 		}
// 	},
// 	success: (state, { payload }) => {
// 		return {
// 			...state,
// 			postLikes: {
// 				...state.postLikes,
// 				loading: false,
// 				// accountIds: {
// 				// 	...state.postLikes.accountIds,
// 				// 	[payload.args.account]: {
// 				// 		postIds: {
// 				// 			...(state.postLikes.accountIds[payload.args.account]
// 				// 				? state.postLikes.accountIds[payload.args.account].postIds
// 				// 				: {}),
// 				// 			// [payload.body.post]: payload.body.id,
// 				// 		},
// 				// 	},
// 				// },
// 				// byId: {
// 				// 	...state.postLikes.byId,
// 				// 	// [payload.body.id]: payload.body,
// 				// },
// 				error: {},
// 			},
// 		}
// 	},
// 	failure: (state, { payload }) => {
// 		return {
// 			...state,
// 			postLikes: {
// 				...state.postLikes,
// 				loading: false,
// 				accountIds: {
// 					...state.postLikes.accountIds,
// 					[payload.initialArgs.account]: {
// 						postIds: {
// 							...(state.postLikes.accountIds[payload.initialArgs.account]
// 								? state.postLikes.accountIds[payload.initialArgs.account]
// 										.postIds
// 								: {}),
// 							[payload.initialArgs.post]: payload.initialArgs.like,
// 						},
// 					},
// 				},
// 				error: payload,
// 			},
// 		}
// 	},
// })

export default reduceReducers(
	state => state || DEFAULT_STATE,
	likePost,
	unlikePost,
	getAllPostLikes,
)
