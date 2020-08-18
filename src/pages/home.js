// @flow
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

// import 'react-virtualized/styles.css'

// You can import any component you want as a named export from 'react-virtualized', eg
// import { Column, Table } from 'react-virtualized'

// But if you only use a few react-virtualized components,
// And you're concerned about increasing your application's bundle size,
// You can directly import only the components you need, like so:
// import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
// import List from 'react-virtualized/dist/commonjs/List'
import {
	List,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
	AutoSizer,
	WindowScroller,
} from 'react-virtualized'

import { RPC_IDS } from '../constants/rpc'

import useWindowDimensions from '../components/utils/useWindowDimensions'
import Loading from '../components/utils/Loading'
import { ImagePreview } from '../components/utils/ImagePreview'

const Post = ({ post, measure }) => {
	if (!post) {
		return <GhostPost />
		// return <></>
	}

	return (
		<div className="post">
			<div className="postImage">
				<ImagePreview s3ObjectKey={post.image} measure={measure} />
				{/* <img src="https://source.unsplash.com/QhKX67yT7wk" onLoad={measure} /> */}
				<div className="postFooter">
					<div className="profilePhoto">
						<ImagePreview s3ObjectKey={post.profile_image} />
						{/* <img src="https://source.unsplash.com/QhKX67yT7wk" /> */}
					</div>
					<div className="postHandle">{post.handle}</div>
					{/* <LikeIcon
						postId={postId}
						myId={myId}
						streamIdLike={streamIdLike}
						liked={liked}
					/>
					<CommentIcon commented={commented} /> */}
				</div>
			</div>
		</div>
	)
}

const GhostPost = () => {
	return (
		<div className="post">
			<div className="postImage">
				<div className="ghostImage">
					<Loading />
				</div>
				<div className="postFooter">
					{/* <div className="profilePhoto">
						<img src={post.profile_image} />
					</div>
					<div className="poststreamId">{post.streamId}</div> */}
					{/* <LikeIcon
						postId={postId}
						myId={myId}
						streamIdLike={streamIdLike}
						liked={liked}
					/>
					<CommentIcon commented={commented} /> */}
				</div>
			</div>
		</div>
	)
}

const cache = new CellMeasurerCache({ fixedWidth: true, defaultHeight: 600 })

const HomePage = ({ posts, getPostsForStream }) => {
	// const { height, width } = useWindowDimensions()

	const streamId = 'ba9192f5-8ee9-452e-830b-8bec56fb0e7b'

	useEffect(() => {
		// eval(`getPostsFor${streamOrProfile()}({ streamId })`)
		getPostsForStream({ streamId })
	}, [])

	if (
		posts.byStream[streamId] &&
		'count' in posts.byStream[streamId] &&
		posts.byStream[streamId].count === 0
	) {
		return <div className="">no posts</div>
	}

	if (
		!(
			posts.byStream[streamId] &&
			posts.byStream[streamId].postIds &&
			posts.byStream[streamId].count &&
			Object.keys(posts.byStream[streamId].postIds).length
		)
	) {
		return <Loading />
	}

	const isRowLoaded = ({ index }) => {
		// return (
		// 	Object.keys(posts.byStream[streamId].postIds)[index] &&
		// 	posts.byId[Object.keys(posts.byStream[streamId].postIds)[index]]
		// )
		return false
	}

	const fetchMoreRows = ({ startIndex, stopIndex }) => {
		const limit = stopIndex - startIndex + 1
		const offset = startIndex

		console.log(`limit ${limit} - offset ${offset}`)
		getPostsForStream({
			streamId,
			params: { limit, offset },
		})
	}

	const rowRenderer = ({
		key,
		parent,
		index,
		isScrolling,
		isVisible,
		style,
	}) => {
		return (
			<CellMeasurer
				key={key}
				cache={cache}
				parent={parent}
				columnIndex={0}
				rowIndex={index}
			>
				{({ measure, registerChild }) => {
					return (
						<div ref={registerChild} style={style} className="postRow">
							<Post
								post={
									posts.byId[
										Object.keys(posts.byStream[streamId].postIds)[index]
									]
								}
								measure={measure}
							/>
						</div>
					)
				}}
			</CellMeasurer>
		)
	}

	return (
		<div id="homePage" className="homePage">
			<InfiniteLoader
				isRowLoaded={isRowLoaded}
				loadMoreRows={fetchMoreRows}
				rowCount={posts.byStream[streamId].count}
			>
				{({ onRowsRendered, registerChild }) => (
					// <WindowScroller>
					// 	{({ height, scrollTop }) => (
					<AutoSizer>
						{({ height, width }) => (
							<List
								width={width}
								height={height}
								onRowsRendered={onRowsRendered}
								ref={registerChild}
								rowCount={posts.byStream[streamId].count}
								rowHeight={cache.rowHeight}
								// rowHeight={height - 60}
								rowRenderer={rowRenderer}
								deferredMeasurementCache={cache}
								overscanRowCount={5}
								// scrollTop={scrollTop}
								// isScrolling={false}
							/>
						)}
					</AutoSizer>
					// 	)}
					// </WindowScroller>
				)}
			</InfiniteLoader>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.getPostsForStream)]

const mapStateToProps = state => ({
	posts: state.posts,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(HomePage)

/* <InfiniteScroll
				className="infiniteScroll"
				dataLength={10}
				next={() => console.log('fetching more')}
				hasMore={true}
				loader={<Loading />}
				// height={100}
				scrollableTarget="homePage"
			>
				{testData.map(value => {
					return <div key={value}>{value}</div>
				})}
			</InfiniteScroll> */

// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { compose } from 'redux'
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

// import { RPC_IDS } from '../constants/rpc'

// import LoginPage from './login'
// import DashboardPage from './dashboard'
// import LoadingPage from './loading'

// const Home = ({ auth, verifyLogin }) => {
// 	useEffect(() => {
// 		verifyLogin()
// 	}, [])

// 	if (!auth.didAttempt || auth.isLoading) {
// 		return <LoadingPage />
// 	} else {
// 		if (auth.isAuthenticated) {
// 			return <DashboardPage />
// 		} else {
// 			return <LoginPage />
// 		}
// 	}
// }

// const mapStateToProps = state => ({
// 	auth: state.auth,
// })

// const hoc = compose(
// 	withRPCRedux(RPC_IDS.verifyLogin),
// 	connect(mapStateToProps),
// )

// // export default hoc(Home)
