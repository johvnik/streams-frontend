import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { RPC_IDS } from '../constants/rpc'

import LoadingIcon from './icons/LoadingIcon'
import PostList from './PostList'
import Post from './Post'

const MyProfile = ({
	posts,
	streams,
	profiles,
	getPostsForAccount,
	getPostsForStream,
}) => {
	const fetchPosts = () => {
		let params = new URLSearchParams(
			posts.byAccountId[profiles.myId].next.split('?')[1],
		)
		let page = params.get('page')
		getPostsForAccount({
			qs: { page },
			account_id: profiles.myId,
		})
	}

	return (
		<div className="profile">
			<div className="profileTop">
				<img src={profiles.byId[profiles.myId].image} />
				{profiles.byId[profiles.myId].handle}
				{profiles.byId[profiles.myId].full_name ? (
					profiles.byId[profiles.myId].full_name
				) : (
					<input placeholder="full name" />
				)}
				{profiles.byId[profiles.myId].bio ? (
					profiles.byId[profiles.myId].bio
				) : (
					<input placeholder="bio" />
				)}
			</div>
			<div className="profileBottom">
				{posts.byAccountId[profiles.myId].postIds.length ? (
					<InfiniteScroll
						className="infiniteScroll"
						dataLength={posts.byAccountId[profiles.myId].postIds.length}
						next={fetchPosts}
						hasMore={posts.byAccountId[profiles.myId].next}
						loader={<LoadingIcon />}
						endMessage={<p>end of the road.</p>}
					>
						{posts.byAccountId[profiles.myId].postIds.map(postId => {
							return (
								<div className="tile" key={postId}>
									<img src={`${posts.byId[postId].image},${postId}`} />
								</div>
							)
						})}
					</InfiniteScroll>
				) : (
					<div>no posts</div>
				)}
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getPostsForAccount),
	withRPCRedux(RPC_IDS.getPostsForStream),
]

const mapStateToProps = state => ({
	streams: state.streams,
	posts: state.posts,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(MyProfile)
