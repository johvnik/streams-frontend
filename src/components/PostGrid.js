import React, { useState, useEffect } from 'react'
import {
	List,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
	AutoSizer,
	WindowScroller,
} from 'react-virtualized'

import Loading from './utils/Loading'
import ImagePreview from './utils/ImagePreview'

import useWindowDimensions from './utils/useWindowDimensions'
import { useDispatch } from 'react-redux'
import {
	openEditProfileModal,
	openLoginModal,
	openPostModal,
} from '../actions/actions'

const cache = new CellMeasurerCache({ fixedWidth: true, defaultHeight: 600 })

const PostGrid = ({
	authHandle,
	posts,
	paginationObject,
	emptyListMessage,
	fetchMoreRowsFn,
}) => {
	const dispatch = useDispatch()
	const { width, height } = useWindowDimensions()

	const [scrollToIndex, setScrollToIndex] = useState(-1)
	const [scrollToInput, setScrollToInput] = useState('')

	const [hasScrolled, setHasScrolled] = useState(false)
	const [scrollTop, setScrollTop] = useState(350)

	useEffect(() => {
		cache.clearAll()
	}, [width])

	const fetchMoreRows = ({ startIndex, stopIndex }) => {
		const startPostIndex = startIndex * 3
		const stopPostIndex = stopIndex * 3 + 2
		const limit = stopPostIndex - startPostIndex
		const offset = startPostIndex
		const params = { limit, offset }

		fetchMoreRowsFn({ params })
	}

	const isRowLoaded = ({ index }) => {
		const firstPostIndex = index * 3
		const secondPostIndex = firstPostIndex + 1
		const thirdPostIndex = secondPostIndex + 1

		// only need to check first photo index, because if this photo
		// is loaded, it called for all photos for that row, so it is loaded
		const isLoaded = !!(
			paginationObject &&
			paginationObject.results &&
			posts.byId[Object.keys(paginationObject.results)[firstPostIndex]]
		)
			? true
			: false

		return isLoaded
	}

	const PostGridCell = ({ index }) => {
		const post = posts.byId[Object.keys(paginationObject.results)[index]]

		const onPostGridCellClick = () => {
			if (post) {
				dispatch(openPostModal(post.id))
			} else {
				console.log('good thing you checked if the post exists in this cell')
			}
		}

		return (
			<div className="postGridCell" onClick={onPostGridCellClick}>
				<div className="content">
					{post ? <ImagePreview s3ObjectKey={post.image} /> : <></>}
				</div>
			</div>
		)
	}

	const PostGridRow = ({ index, style, registerChild }) => {
		const first = index * 3
		const second = first + 1
		const third = second + 1

		return (
			<div className="postGridRow" ref={registerChild} style={style}>
				<PostGridCell index={first} />
				<PostGridCell index={second} />
				<PostGridCell index={third} />
			</div>
		)
	}

	const rowRenderer = ({ key, parent, index, style }) => {
		return (
			<CellMeasurer
				key={key}
				cache={cache}
				parent={parent}
				rowIndex={index}
				columnIndex={0}
			>
				{({ measure, registerChild }) => (
					<PostGridRow
						index={index}
						measure={measure}
						registerChild={registerChild}
						style={style}
					/>
				)}
			</CellMeasurer>
		)
	}

	if (!(paginationObject && 'count' in paginationObject)) {
		if (!(paginationObject && paginationObject.isLoading)) {
			fetchMoreRowsFn({ params: null })
		}
		return (
			<div className="postGrid">
				<Loading />
			</div>
		)
	}

	if (!(paginationObject && paginationObject.count)) {
		return <div className="postGrid emptyMessageColor">{emptyListMessage}</div>
	}

	return (
		<InfiniteLoader
			isRowLoaded={isRowLoaded}
			loadMoreRows={fetchMoreRows}
			rowCount={
				Math.floor(paginationObject.count / 3) +
				(paginationObject.count % 3 ? 1 : 0)
			}
		>
			{({ onRowsRendered, registerChild }) => (
				<WindowScroller
					// initialScrollTop={hasScrolled ? null : 350}
					onScroll={() => setScrollToIndex(-1)}
				>
					{({ height, scrollTop, onChildScroll }) => (
						<AutoSizer disableHeight>
							{({ width }) => {
								// console.log(scrollTop)
								console.log('scroll to index', scrollToIndex)
								return (
									<List
										// className="postGrid"
										autoHeight
										height={height}
										width={width}
										rowRenderer={rowRenderer}
										scrollTop={scrollTop}
										ref={registerChild}
										onRowsRendered={onRowsRendered}
										rowCount={
											Math.floor(paginationObject.count / 3) +
											(paginationObject.count % 3 ? 1 : 0)
										}
										deferredMeasurementCache={cache}
										rowHeight={cache.rowHeight}
										onScroll={onChildScroll}
										// onScroll={({ scrollTop }) => {
										// 	console.log('setting scroll top: ' + scrollTop)
										// 	setScrollTop(scrollTop)
										// }}
										scrollToAlignment="start"
										scrollToIndex={scrollToIndex}
									></List>
								)
							}}
						</AutoSizer>
					)}
				</WindowScroller>
			)}
		</InfiniteLoader>
	)
}

export default PostGrid

// REFERENCE: this is the grid with 1px gap, but using infinite scroll
// return Object.keys(posts.byProfile[handle].results).length ? (
// 	<InfiniteScroll
// 		className="postGrid"
// 		dataLength={posts.byProfile[handle].count}
// 		next={fetchPosts}
// 		hasMore={posts.byProfile[handle].next}
// 		loader={<Loading />}
// 		// endMessage={}
// 	>
// 		{Object.keys(posts.byProfile[handle].results).map(postId => {
// 			return (
// 				<div className="tile" key={postId}>
// 					<div className="content">
// 						<ImagePreview s3ObjectKey={posts.byId[postId].image} />
// 					</div>
// 				</div>
// 			)
// 		})}
// 	</InfiniteScroll>
// ) : (
// 	<div className="emptyMessageColor">no posts</div>
// )

// CSS
// .postGrid {
// 	display: grid;
// 	grid-template-columns: 1fr 1fr 1fr;
// 	grid-auto-rows: auto;
// 	gap: 1px;
// 	background-color: red;

// 	.tile {
// 		position: relative;
// 		width: 100%;

// 		&::before {
// 			content: '';
// 			display: block;
// 			padding-top: 100%;
// 			// background-color: transparent;
// 		}

// 		.content {
// 			position: absolute;
// 			top: 0;
// 			left: 0;
// 			bottom: 0;
// 			right: 0;
// 			overflow: hidden;
// 		}

// 		img {
// 			object-fit: cover;
// 			height: 100%;
// 			width: 100%;
// 		}
// 	}
// }
