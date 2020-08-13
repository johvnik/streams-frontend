import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Loading from './utils/Loading'

const ProfilePostsGrid = ({ posts, currentProfile, isLoading }) => {
	if (isLoading) {
		return <Loading />
	}

	const fetchPosts = () => {
		console.log('fetching posts...')
	}
	// return <div>loaded up</div>
	return Object.keys(posts.byAccountId[currentProfile].postIds).length ? (
		<InfiniteScroll
			className="infiniteScroll"
			dataLength={posts.byAccountId[currentProfile].count}
			next={fetchPosts}
			hasMore={posts.byAccountId[currentProfile].next}
			loader={<Loading />}
			// endMessage={}
		>
			{Object.keys(posts.byAccountId[currentProfile].postIds).map(postId => {
				return (
					<div className="tile" key={postId}>
						<div className="content">
							<img src={posts.byId[postId].image} />
						</div>
					</div>
				)
			})}
		</InfiniteScroll>
	) : (
		<div>no posts</div>
	)
}

export default ProfilePostsGrid
