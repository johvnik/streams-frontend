import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Loading from './utils/Loading'

import { ImagePreview } from '../components/utils/ImagePreview'

const ProfilePostsGrid = ({ posts, handle, isLoading }) => {
	if (isLoading) {
		return <Loading />
	}

	const fetchPosts = () => {
		console.log('fetching posts...')
	}
	// return <div>loaded up</div>
	return Object.keys(posts.byProfile[handle].postIds).length ? (
		<InfiniteScroll
			className="infiniteScroll"
			dataLength={posts.byProfile[handle].count}
			next={fetchPosts}
			hasMore={posts.byProfile[handle].next}
			loader={<Loading />}
			// endMessage={}
		>
			{Object.keys(posts.byProfile[handle].postIds).map(postId => {
				return (
					<div className="tile" key={postId}>
						<div className="content">
							<ImagePreview s3ObjectKey={posts.byId[postId].image} />
						</div>
					</div>
				)
			})}
		</InfiniteScroll>
	) : (
		<div className="emptyMessageColor">no posts</div>
	)
}

export default ProfilePostsGrid
