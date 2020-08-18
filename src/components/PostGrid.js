import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
	List,
	// Grid,
	Table,
	Column,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
	AutoSizer,
	WindowScroller,
} from 'react-virtualized'

import Loading from './utils/Loading'
import { ImagePreview } from './utils/ImagePreview'

const users = [
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
	{ name: 'foo' },
]

const PostGrid = ({ posts, handle, isLoading }) => {
	if (isLoading) {
		return <Loading />
	}

	const fetchPosts = () => {
		console.log('fetching posts...')
	}

	const rowRenderer = ({ key, columnIndex, rowIndex, style }) => {
		return (
			<div className="postGridCell" key={key} style={style}>
				{/* {rowIndex} - {users[rowIndex].name} */}
				{`row: ${rowIndex + 1} column: ${columnIndex + 1}`}
			</div>
		)
	}

	const length = users.length
	const rows = Math.round(users.length / 3)

	return (
		<>
			<div>{`user list count: ${length} rows: ${rows}`}</div>
			<WindowScroller>
				{({ height, scrollTop }) => (
					<AutoSizer disableHeight>
						{({ width }) => (
							<Table
								autoHeight
								className="postGrid"
								rowGetter={({ index }) => users[index]}
								height={height}
								width={width}
								scrollTop={scrollTop}
								// columnCount={1}
								// columnWidth={width}
								rowCount={users.length}
								rowHeight={30}
								// isScrolling={false}
							>
								<Column label="name" dataKey="name" width={100} />
							</Table>
						)}
					</AutoSizer>
				)}
			</WindowScroller>
		</>
	)
}

export default PostGrid

// return Object.keys(posts.byProfile[handle].postIds).length ? (
// 	<InfiniteScroll
// 		className="postGrid"
// 		dataLength={posts.byProfile[handle].count}
// 		next={fetchPosts}
// 		hasMore={posts.byProfile[handle].next}
// 		loader={<Loading />}
// 		// endMessage={}
// 	>
// 		{Object.keys(posts.byProfile[handle].postIds).map(postId => {
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
