// @flow
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import {
	List,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
	AutoSizer,
	WindowScroller,
} from 'react-virtualized'

import { RPC_IDS } from '../constants/rpc'

import Post from '../components/Post'
import Loading from '../components/utils/Loading'
import ImagePreview from '../components/utils/ImagePreview'
import useWindowDimensions from '../components/utils/useWindowDimensions'
import StreamList from '../components/StreamList'
import { openPostModal } from '../actions/actions'

const cache = new CellMeasurerCache({ fixedWidth: true, defaultHeight: 1400 })

const HomePage = ({
	homeStream,
	posts,
	streams,
	profiles,
	authHandle,
	getPostsForStream,
}) => {
	const { width, height } = useWindowDimensions()
	const dispatch = useDispatch()

	useEffect(() => {
		if (
			!(
				posts.byStream[homeStream] &&
				posts.byStream[homeStream].count &&
				posts.byStream[homeStream].results &&
				Object.keys(posts.byStream[homeStream].results).length
			)
		) {
			getPostsForStream({ streamId: homeStream })
		}
	}, [homeStream])

	useEffect(() => {
		cache.clearAll()
	}, [width, height])

	if (!homeStream) {
		return (
			<div className="homePage">
				<div>choose a stream to view.</div>
				<StreamList handle={authHandle} />
			</div>
		)
	}

	if (
		posts.byStream[homeStream] &&
		'count' in posts.byStream[homeStream] &&
		posts.byStream[homeStream].count === 0
	) {
		return (
			<div className="homePage">
				<div className="emptyMessageColor">no posts</div>
			</div>
		)
	}

	if (
		!(
			posts.byStream[homeStream] &&
			posts.byStream[homeStream].results &&
			posts.byStream[homeStream].count
		)
	) {
		return <Loading />
	}

	const isRowLoaded = ({ index }) => {
		// console.log(index)
		const isLoaded = !!(
			posts.byStream[homeStream] &&
			posts.byStream[homeStream].results &&
			posts.byId[Object.keys(posts.byStream[homeStream].results)[index]]
		)
			? true
			: false

		// console.log(isLoaded)

		return isLoaded
	}

	const fetchMoreRows = ({ startIndex, stopIndex }) => {
		const limit = stopIndex - startIndex + 1
		const offset = startIndex

		console.log(`limit ${limit} - offset ${offset}`)
		getPostsForStream({
			streamId: homeStream,
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
			<CellMeasurer key={key} cache={cache} parent={parent} rowIndex={index}>
				{({ measure, registerChild }) => {
					return (
						<div
							ref={registerChild}
							style={style}
							className="postRow"
							onClick={() =>
								dispatch(
									openPostModal(
										Object.keys(posts.byStream[homeStream].results)[index],
									),
								)
							}
						>
							<Post
								post={
									posts.byId[
										Object.keys(posts.byStream[homeStream].results)[index]
									]
								}
								measure={measure}
								useDefaultImage
							/>
						</div>
					)
				}}
			</CellMeasurer>
		)
	}

	return (
		<div className="homePage">
			<InfiniteLoader
				isRowLoaded={isRowLoaded}
				loadMoreRows={fetchMoreRows}
				rowCount={posts.byStream[homeStream].count}
			>
				{({ onRowsRendered, registerChild }) => (
					// <WindowScroller>
					// 	{({ height, scrollTop }) => (
					<AutoSizer>
						{({ width, height }) => (
							<List
								// autoHeight
								// scrollTop={scrollTop}
								width={width}
								height={height}
								onRowsRendered={onRowsRendered}
								ref={registerChild}
								rowCount={posts.byStream[homeStream].count}
								rowHeight={cache.rowHeight}
								rowRenderer={rowRenderer}
								deferredMeasurementCache={cache}
								overscanRowCount={20}
								defaultHeight={cache.defaultHeight}
								// scrollToIndex={5}
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
	homeStream: state.ui.homeStream,
	posts: state.posts,
	streams: state.streams,
	profiles: state.profiles,
	authHandle: state.auth.authHandle,
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
