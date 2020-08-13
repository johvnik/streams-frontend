// import React, { useEffect } from 'react'
// import { compose } from 'redux'
// import { connect, useDispatch } from 'react-redux'
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
// import InfiniteScroll from 'react-infinite-scroll-component'

// import { RPC_IDS } from '../constants/rpc'

// import LoadingIcon from './icons/LoadingIcon'
// import PostList from './PostList'
// import Post from './Post'

// const Profile = ({
// 	posts,
// 	streams,
// 	getProfile,
// 	getMyProfile,
// 	profiles,
// 	getPostsForProfile,
// 	// getPostLikesForAccount,
// 	// getCommentLikesForAccount,
// 	getPostsForStream,
// 	profileId,
// }) => {
// 	useEffect(() => {
// 		console.log(`current profile: ${profiles.currentProfile}`)
// 		// getProfile({ ['profile']: profiles.currentProfile })
// 		// .then(res => {
// 		// 	if (res.body.id) {
// 		// 		getPostsForAccount({ account_id: res.body.id })
// 		// 		getPostLikesForAccount({ account_id: res.body.id })
// 		// 		getCommentLikesForAccount({ account_id: res.body.id })
// 		// 	}
// 		// })
// 	}, [])

// 	// const fetchPosts = () => {
// 	// 	let params = new URLSearchParams(
// 	// 		posts.byAccountId[profiles.currentProfile].next.split('?')[1],
// 	// 	)
// 	// 	let page = params.get('page')
// 	// 	getPostsForAccount({
// 	// 		qs: { page },
// 	// 		account_id: profiles.currentProfile,
// 	// 	})
// 	// }

// 	if (
// 		!profiles.currentProfile
// 		// !profiles.byId[profiles.currentProfile] ||
// 		// !posts.byAccountId[profiles.currentProfile]
// 	) {
// 		return <LoadingIcon />
// 	} else {
// 		return <div>{'loaded'}</div>
// 		// return (
// 		// 	<div className="profile">
// 		// 		<div className="profileTop">
// 		// 			<img src={profiles.byId[profiles.currentProfile].image} />
// 		// 			{profiles.byId[profiles.currentProfile].handle}
// 		// 			{profiles.byId[profiles.currentProfile].full_name ? (
// 		// 				profiles.byId[profiles.currentProfile].full_name
// 		// 			) : (
// 		// 				<input placeholder="full name" />
// 		// 			)}
// 		// 			{profiles.byId[profiles.currentProfile].bio ? (
// 		// 				profiles.byId[profiles.currentProfile].bio
// 		// 			) : (
// 		// 				<input placeholder="bio" />
// 		// 			)}
// 		// 		</div>
// 		// 		<div className="profileBottom">
// 		// 			{posts.byAccountId[profiles.currentProfile].postIds.length ? (
// 		// 				<InfiniteScroll
// 		// 					className="infiniteScroll"
// 		// 					dataLength={
// 		// 						posts.byAccountId[profiles.currentProfile].postIds.length
// 		// 					}
// 		// 					next={fetchPosts}
// 		// 					hasMore={posts.byAccountId[profiles.currentProfile].next}
// 		// 					loader={<LoadingIcon />}
// 		// 					endMessage={<p>end of the road.</p>}
// 		// 				>
// 		// 					{posts.byAccountId[profiles.currentProfile].postIds.map(
// 		// 						postId => {
// 		// 							return (
// 		// 								<div className="tile" key={postId}>
// 		// 									<img src={`${posts.byId[postId].image},${postId}`} />
// 		// 								</div>
// 		// 							)
// 		// 						},
// 		// 					)}
// 		// 				</InfiniteScroll>
// 		// 			) : (
// 		// 				<div>no posts</div>
// 		// 			)}
// 		// 		</div>
// 		// 	</div>
// 		// )
// 	}
// }

// const rpcs = [
// 	withRPCRedux(RPC_IDS.getPostsForProfile),
// 	withRPCRedux(RPC_IDS.getPostsForStream),
// 	// withRPCRedux(RPC_IDS.getPostLikesForAccount),
// 	// withRPCRedux(RPC_IDS.getCommentLikesForAccount),
// 	withRPCRedux(RPC_IDS.getProfile),
// 	withRPCRedux(RPC_IDS.getMyProfile),
// ]

// const mapStateToProps = state => ({
// 	streams: state.streams,
// 	posts: state.posts,
// 	profiles: state.profiles,
// })

// const hoc = compose(
// 	...rpcs,
// 	connect(mapStateToProps),
// )

// export default hoc(Profile)
