// import React from 'react'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
// import InfiniteScroll from 'react-infinite-scroll-component'

// import { RPC_IDS } from '../constants/rpc'

// import LoadingIcon from './icons/LoadingIcon'

// const PostList = ({ streams, posts, getPostsForStream, children }) => {
// 	const fetchPosts = () => {
// 		let params = new URLSearchParams(
// 			posts.byStreamId[streams.currentStream.id].next.split('?')[1],
// 		)
// 		let page = params.get('page')
// 		getPostsForStream({
// 			qs: { page },
// 			stream_id: streams.currentStream.id,
// 		})
// 	}

// 	return (
// 		<InfiniteScroll
// 			className="infiniteScroll"
// 			dataLength={posts.byStreamId[streams.currentStream.id].postIds.length}
// 			next={fetchPosts}
// 			hasMore={posts.byStreamId[streams.currentStream.id].next}
// 			loader={<LoadingIcon />}
// 			endMessage={<p>end of the road.</p>}
// 		>
// 			{children}
// 		</InfiniteScroll>
// 	)
// }

// const rpcs = [withRPCRedux(RPC_IDS.getPostsForStream)]

// const mapStateToProps = state => ({
// 	streams: state.streams,
// 	posts: state.posts,
// })

// const hoc = compose(
// 	...rpcs,
// 	connect(mapStateToProps),
// )

// export default hoc(PostList)
