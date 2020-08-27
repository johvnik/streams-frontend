import { createRPCReducer } from 'fusion-plugin-rpc-redux-react'
import reduceReducers from 'reduce-reducers'
import mapKeys from 'lodash/mapKeys'

import { RPC_IDS } from '../constants/rpc'
import ACTION_IDS from '../constants/actions'

const DEFAULT_STATE = {
	postComments: {
		byPost: {},
		byId: {},
	},
	commentComments: {
		byComment: {},
		byId: {},
	},
}

const resetStore = (state, action) => {
	switch (action.type) {
		case ACTION_IDS.resetStore:
			return { ...DEFAULT_STATE }
		default:
			return state
	}
}

const createPostComment = createRPCReducer(RPC_IDS.createPostComment, {
	start: (state, { payload }) => {
		console.log(payload)
		return {
			...state,
			postComments: {
				...state.postComments,
				byPost: {
					...state.postComments.byPost,
					[payload.postId]: {
						...state.postComments.byPost[payload.postId],
						// 	? Object.keys(state.postComments.byPost[payload.postId]).map((key) => {
						//       // key === 'count' ? state.postComments.byPost[payload.postId][key] = state.postComments.byPost[payload.postId][key] + 1 :
						//       if (key === 'count') {
						//         return
						//       }
						//   })
						// 	: {}),
						// count:
						// 	state.postComments.byPost[payload.postId] &&
						// 	state.postComments.byPost[payload.postId].count
						// 		? state.postComments.byPost[payload.postId].count + 1
						// 		: 1,
						// isLoading: true,
						// results: {
						// 	...(state.postComments.byPost[payload.postId] &&
						// 	state.postComments.byPost[payload.postId].results
						// 		? state.postComments.byPost[payload.postId].results
						// 		: {}),
						// 	[payload.comment.id]: true,
						// },

						// NOW WE'RE GONNA DO THIS UPON SUCCESS...
						count:
							state.postComments.byPost[payload.postId] &&
							state.postComments.byPost[payload.postId].count
								? state.postComments.byPost[payload.postId].count + 1
								: 1,

						// TRY NOT PUTTING IT IN YET
						results: {
							// switching order back to bottom..
							[payload.comment.id]: true,
							...(state.postComments.byPost[payload.postId] &&
							state.postComments.byPost[payload.postId].results
								? state.postComments.byPost[payload.postId].results
								: {}),
						},

						isCreating: true,
					},
				},
				byId: {
					...state.postComments.byId,
					[payload.comment.id]: payload.comment,
				},
			},
		}
	},
	success: (state, { payload }) => {
		console.log(payload)
		return {
			...state,
			postComments: {
				...state.postComments,
				byPost: {
					...state.postComments.byPost,
					[payload.initialArgs.postId]: {
						...state.postComments.byPost[payload.initialArgs.postId],
						// isLoading: true,
						// count:
						// 	state.postComments.byPost[payload.initialArgs.postId] &&
						// 	state.postComments.byPost[payload.initialArgs.postId].count
						// 		? state.postComments.byPost[payload.initialArgs.postId].count +
						// 		  1
						// 		: 1,
						// results: {
						// 	// trying it in fron tthis time
						// 	[payload.initialArgs.comment.id]: true,
						// 	...(state.postComments.byPost[payload.initialArgs.postId] &&
						// 	state.postComments.byPost[payload.initialArgs.postId].results
						// 		? state.postComments.byPost[payload.initialArgs.postId].results
						// 		: {}),
						// },

						// count:
						// 	state.postComments.byPost[payload.postId] &&
						// 	state.postComments.byPost[payload.postId].count
						// 		? state.postComments.byPost[payload.postId].count + 1
						// 		: 1,
						// results: {
						// 	// trying it in here this time
						// 	[payload.comment.id]: true,
						// 	...(state.postComments.byPost[payload.postId] &&
						// 	state.postComments.byPost[payload.postId].results
						// 		? state.postComments.byPost[payload.postId].results
						// 		: {}),
						// },

						// DOING THIS UPON SUCCESS NOW
						// count:
						// 	state.postComments.byPost[payload.initialArgs.postId] &&
						// 	state.postComments.byPost[payload.initialArgs.postId].count
						// 		? state.postComments.byPost[payload.initialArgs.postId].count +
						// 		  1
						// 		: 1,

						isCreating: false,
						creationError: null,
					},
				},

				// NO NEED TO ADD IT IN ANYMORE, THIS'S GONNA COME BACK FROM THE FETCH
				// BUT IT WOULDN'T MATTER EITHER WAY
				byId: {
					...state.postComments.byId,
					[payload.body.id]: payload.body,
				},
			},
		}
	},
	failure: (state, { payload }) => {
		console.log(payload)

		// const hasResults = !!(
		// 	state.postComments.byPost[payload.initialArgs.postId] &&
		// 	state.postComments.byPost[payload.initialArgs.postId].results
		// )

		// if (hasResults) {
		//   delete state.postComments.byPost[payload.initialArgs.postId].results[payload.initialArgs.comment.id]
		// }

		return {
			...state,
			postComments: {
				...state.postComments,
				byPost: {
					...state.postComments.byPost,
					[payload.initialArgs.postId]: {
						...state.postComments.byPost[payload.initialArgs.postId],
						// 	? state.postComments.byPost[payload.initialArgs.postId].map(
						// 			(value, key) => {
						// 				key === 'count' ? value - 1 : value
						// 			},
						// 	  )
						// 	: {}),
						count:
							state.postComments.byPost[payload.initialArgs.postId] &&
							state.postComments.byPost[payload.initialArgs.postId].count
								? state.postComments.byPost[payload.initialArgs.postId].count -
								  1
								: 0,
						// isLoading: true,
						// results: {
						// 	...(state.postComments.byPost[payload.initialArgs.postId] &&
						// 	state.postComments.byPost[payload.initialArgs.postId].results
						// 		? state.postComments.byPost[payload.initialArgs.postId].results
						// 		: {}),

						// NOTHING TO REMOVE ANYMORE NOW, GONNA GET FROM BACKEND
						// results: {
						// 	...(state.postComments.byPost[payload.initialArgs.postId] &&
						// 	state.postComments.byPost[payload.initialArgs.postId].results
						// 		? Object.keys(
						// 				state.postComments.byPost[payload.initialArgs.postId]
						// 					.results,
						// 		  )
						// 				.filter(key => key !== payload.initialArgs.comment.id)
						// 				.reduce((acc, key) => {
						// 					acc[key] =
						// 						state.postComments.byPost[
						// 							payload.initialArgs.postId
						// 						].results[key]
						// 					return acc
						// 				}, {})
						// 		: {}),
						// 	// [payload.initialArgs.comment.id]: false,
						// },
						isCreating: false,
						creationError: payload.body,
					},
				},
			},
		}
	},
})

const getNewCommentsForPostCount = createRPCReducer(
	RPC_IDS.getNewCommentsForPostCount,
	{
		start: (state, { payload }) => {
			// console.log(payload)
			return {
				...state,
			}
		},
		success: (state, { payload }) => {
			// console.log(payload)
			return {
				...state,
				postComments: {
					...state.postComments,
					byPost: {
						...state.postComments.byPost,
						[payload.initialArgs.postId]: {
							...state.postComments.byPost[payload.initialArgs.postId],
							newCount: payload.body.count,
						},
					},
				},
			}
		},
		failure: (state, { payload }) => {
			// console.log(payload)
			return {
				...state,
			}
		},
	},
)

const getNewCommentsForPost = createRPCReducer(RPC_IDS.getNewCommentsForPost, {
	start: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
		}
	},
	success: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			postComments: {
				...state.postComments,
				byPost: {
					...state.postComments.byPost,
					[payload.initialArgs.postId]: {
						...state.postComments.byPost[payload.initialArgs.postId],
						time: payload.body.time,
						// count:
						// 	state.postComments.byPost[payload.initialArgs.postId] &&
						// 	state.postComments.byPost[payload.initialArgs.postId].count
						// 		? state.postComments.byPost[payload.initialArgs.postId].count +
						// 		  payload.body.count
						// 		: payload.body.count,
						count: payload.body.count,
						results: {
							...payload.body.results.reduce((acc, comment) => {
								acc[comment.id] = true
								return acc
							}, {}),
							...(state.postComments.byPost[payload.initialArgs.postId] &&
							state.postComments.byPost[payload.initialArgs.postId].results
								? state.postComments.byPost[payload.initialArgs.postId].results
								: {}),
						},
						newCount: 0,
					},
				},
				byId: {
					...state.postComments.byId,
					...mapKeys(payload.body.results, 'id'),
				},
			},
		}
	},
	failure: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
		}
	},
})

const getCommentsForPost = createRPCReducer(RPC_IDS.getCommentsForPost, {
	start: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			postComments: {
				...state.postComments,
				byPost: {
					...state.postComments.byPost,
					[payload.postId]: {
						...state.postComments.byPost[payload.postId],
						isLoading: true,
					},
				},
			},
		}
	},
	success: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			postComments: {
				...state.postComments,
				byPost: {
					...state.postComments.byPost,
					[payload.initialArgs.postId]: {
						...state.postComments.byPost[payload.initialArgs.postId],
						count: payload.body.count,
						time: payload.body.time,
						next: payload.body.next,
						previous: payload.body.previous,
						results: {
							// back on top
							...(state.postComments.byPost[payload.initialArgs.postId] &&
							state.postComments.byPost[payload.initialArgs.postId].results
								? state.postComments.byPost[payload.initialArgs.postId].results
								: {}),
							...payload.body.results.reduce((acc, comment) => {
								acc[comment.id] = true
								return acc
							}, {}),
						},
						isLoading: false,
						error: null,
					},
				},
				byId: {
					...state.postComments.byId,
					...mapKeys(payload.body.results, 'id'),
				},
			},
		}
	},
	failure: (state, { payload }) => {
		// console.log(payload)
		return {
			...state,
			postComments: {
				...state.postComments,
				byPost: {
					...state.postComments.byPost,
					[payload.postId]: {
						...state.postComments.byPost[payload.postId],
						isLoading: false,
						error: payload.body,
					},
				},
			},
		}
	},
})

export default reduceReducers(
	state => state || DEFAULT_STATE,
	resetStore,
	createPostComment,
	getCommentsForPost,
	getNewCommentsForPost,
	getNewCommentsForPostCount,
)
