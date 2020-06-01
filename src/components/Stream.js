import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { RPC_IDS } from '../constants/rpc'

import Post from './Post'
import LoadingIcon from './LoadingIcon'

const Stream = ({ streams, posts, getPostsForStream }) => {
	const fetchPosts = () => {
		let params = new URLSearchParams(
			posts.byStreamId[streams.currentStream.id].next.split('?')[1],
		)
		let page = params.get('page')
		getPostsForStream({
			qs: { page },
			stream_id: streams.currentStream.id,
		})
	}

	if (!Object.keys(streams.currentStream).length) {
		return <div className="stream">no current stream selected.</div>
	} else if (
		posts.byStreamId[streams.currentStream.id] &&
		!posts.byStreamId[streams.currentStream.id].postIds.length
	) {
		return <div className="stream">no posts.. try following people!</div>
	} else if (posts.byStreamId[streams.currentStream.id]) {
		return (
			<InfiniteScroll
				className="infiniteScroll"
				dataLength={posts.byStreamId[streams.currentStream.id].postIds.length}
				next={fetchPosts}
				hasMore={posts.byStreamId[streams.currentStream.id].next}
				loader={<LoadingIcon />}
				endMessage={<p>end of the road.</p>}
			>
				{/* <div className="stream"> */}
				{posts.byStreamId[streams.currentStream.id].postIds.map(postId => {
					return <Post key={postId} postId={postId} />
				})}
				{/* </div> */}
			</InfiniteScroll>
			// 	<div className="stream">
			// 	{posts.byStreamId[streams.currentStream.id].postIds.map(postId => {
			// 		return <Post key={postId} postId={postId} />
			// 	})}
			// </div>
		)
	} else {
		return (
			<div className="stream">
				<LoadingIcon />
			</div>
		)
	}
}

const rpcs = [withRPCRedux(RPC_IDS.getPostsForStream)]

const mapStateToProps = state => ({
	streams: state.streams,
	posts: state.posts,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(Stream)
