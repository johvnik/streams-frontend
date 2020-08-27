import React, { useState, useEffect, useRef } from 'react'
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
import { v4 as uuidv4 } from 'uuid'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'
import { closeModals } from '../../actions/actions'

import ImagePreview from '../utils/ImagePreview'
import Loading from '../utils/Loading'
import CancelBtn from '../buttons/CancelBtn'
import CloseBtn from '../buttons/CloseBtn'
import LoadingBtn from '../buttons/LoadingBtn'
import accounts from '../../reducers/accounts'
import LikeBtn from '../buttons/LikeBtn'
import Post from '../Post'
import useWindowDimensions from '../utils/useWindowDimensions'

const CommentListItem = ({ comment }) => {
	return (
		<div className="commentListItem">
			<div className="profileImage">
				<ImagePreview s3ObjectKey={comment.profile_image} />
			</div>
			<div className="center">
				<div className="text">
					<span>
						<b>{`${comment.handle} `}</b>
					</span>
					{comment.text}
				</div>
				<div className="commentInfo">
					<div className="commentTime">2h</div>
					<div className="commentLikes">10 likes</div>
				</div>
			</div>
			<div className="icons">
				<LikeBtn liked />
			</div>
		</div>
	)
}

const GhostCommentListItem = () => {
	return (
		<div className="commentListItem">
			<div className="profileImage">
				{/* <ImagePreview s3ObjectKey={comment.profile_image} /> */}
			</div>
			<div className="text">
				<span>{/* <b>{`${comment.handle} `}</b> */}</span>
				{/* {comment.text} */}
				loading...
			</div>
		</div>
	)
}

const CommentPostBtn = ({ createPostCommentFn }) => {
	return (
		<div className="commentPostBtn" onClick={createPostCommentFn}>
			post
		</div>
	)
}

const CreateComment = ({ authHandle, profiles, postId, createPostComment }) => {
	const [text, setText] = useState('')

	if (!(authHandle && profiles.byHandle[authHandle])) {
		return <div className="createComment">log in to comment</div>
	}

	const createPostCommentFn = () => {
		if (text) {
			const id = uuidv4()
			console.log(`posting comment id: ${id}`)
			createPostComment({ postId, comment: { id, text } })
		}
	}

	return (
		<div className="createComment">
			<div className="profileImage">
				<ImagePreview s3ObjectKey={profiles.byHandle[authHandle].image} />
			</div>
			<textarea
				value={text}
				onChange={e => setText(e.target.value)}
				type="text"
				placeholder="write a comment..."
				className=""
				maxLength="1000"
			/>
			<CommentPostBtn createPostCommentFn={createPostCommentFn} />
		</div>
	)
}

const cache = new CellMeasurerCache({ fixedWidth: true, defaultHeight: 40 })

const PostCommentList = ({
	comments,
	paginationObject,
	fetchMoreRowsFn,
	emptyListMessage,
	scrolling,
	getNewCommentsForPost,
	getNewCommentsForPostCount,
	postId,
	getCommentsForPost,
}) => {
	const [scrollTop, setScrollTop] = useState(0)
	// const [newCommentCount, setNewCommentCount] = useState(0)

	const { width, height } = useWindowDimensions()
	const commentListRef = useRef(null)

	useEffect(() => {
		cache.clearAll()
	}, [width, paginationObject && paginationObject.results])

	useEffect(() => {
		const interval = setInterval(() => {
			if (paginationObject && 'time' in paginationObject) {
				getNewCommentsForPostCount({
					postId,
					time: paginationObject.time,
				})
			}
		}, 30000)

		return () => clearInterval(interval)
	}, [paginationObject])

	useEffect(() => {
		if (paginationObject && Object.keys(paginationObject.results)) {
			if (paginationObject.time) {
				getNewCommentsForPost({
					postId,
					time: paginationObject.time,
				})
			}
		} else {
			getCommentsForPost({ postId })
		}
		// if (paginationObject && Object.keys(paginationObject.results)) {

		// }
	}, [])

	useEffect(() => {
		if (commentListRef && commentListRef.current) {
			const coords = commentListRef.current.getBoundingClientRect()
			const currentScrollTop = Math.max(-coords.top, 0)
			setScrollTop(currentScrollTop)
		}
	}, [scrolling])

	const fetchNewComments = e => {
		e.stopPropagation()
		getNewCommentsForPost({ postId, time: paginationObject.time })
	}

	const LoadMoreRowsBtn = () => {
		return paginationObject && paginationObject.newCount ? (
			<div className="loadNewComments" onClick={fetchNewComments}>
				load <span>{paginationObject.newCount}</span> new{' '}
				{paginationObject.newCount > 1 ? 'posts' : 'post'}
			</div>
		) : (
			<></>
		)
	}

	if (!(paginationObject && 'count' in paginationObject)) {
		return <div className="emptyMessageColor">loading comments...</div>
	}

	if (!Object.keys(paginationObject.results).length) {
		return (
			<div>
				<LoadMoreRowsBtn />
				<div className="emptyMessageColor">{emptyListMessage}</div>
			</div>
		)
	}

	const fetchMoreRows = ({ startIndex, stopIndex }) => {
		const limit = stopIndex - startIndex + 1
		const offset = startIndex
		const params = { limit, offset }
		fetchMoreRowsFn({ time: paginationObject.time, params })
	}

	const isRowLoaded = ({ index }) => {
		const isLoaded = !!(
			paginationObject &&
			paginationObject.results &&
			comments.postComments.byId[Object.keys(paginationObject.results)[index]]
		)
			? true
			: false
		return isLoaded
	}

	const rowRenderer = ({
		key,
		parent,
		index,
		isScrolling,
		isVisible,
		style,
	}) => {
		const comment =
			comments.postComments.byId[Object.keys(paginationObject.results)[index]]

		return (
			<CellMeasurer key={key} cache={cache} parent={parent} rowIndex={index}>
				{({ measure, registerChild }) => (
					<div key={key} style={style} ref={registerChild}>
						{comment ? (
							<CommentListItem comment={comment} />
						) : (
							<GhostCommentListItem />
						)}
					</div>
				)}
			</CellMeasurer>
		)
	}

	return (
		<>
			<LoadMoreRowsBtn />
			<InfiniteLoader
				isRowLoaded={isRowLoaded}
				loadMoreRows={fetchMoreRows}
				rowCount={paginationObject.count}
			>
				{({ onRowsRendered, registerChild }) => (
					<WindowScroller>
						{({ height }) => (
							<AutoSizer disableHeight>
								{({ width }) => {
									// if (commentListRef.current) {
									// 	console.log(commentListRef.current.getBoundingClientRect())
									// }
									// console.log(scrollTop)
									return (
										<div ref={commentListRef}>
											<List
												autoHeight
												height={height}
												width={width}
												scrollTop={scrollTop}
												ref={registerChild}
												onRowsRendered={onRowsRendered}
												rowRenderer={rowRenderer}
												rowCount={paginationObject.count}
												deferredMeasurementCache={cache}
												rowHeight={cache.rowHeight}
												// this isn't firing since i'm on a div w overflow
												// onScroll={({
												// 	clientHeight,
												// 	clientWidth,
												// 	scrollHeight,
												// 	scrollLeft,
												// 	scrollTop,
												// 	scrollWidth,
												// }) => {
												// 	console.log(clientHeight)
												// }}
												// scrollToIndex={60}
											/>
										</div>
									)
								}}
							</AutoSizer>
						)}
					</WindowScroller>
				)}
			</InfiniteLoader>
		</>
	)
}

const PostModal = ({
	authHandle,
	posts,
	comments,
	profiles,
	postId,
	getPost,
	getCommentsForPost,
	createPostComment,
	getNewCommentsForPost,
	getNewCommentsForPostCount,
}) => {
	const dispatch = useDispatch()
	const [scrolling, setScrolling] = useState(false)

	useEffect(() => {
		getPost({ postId })
		// getCommentsForPost({ postId })
	}, [])

	const post = posts.byId[postId]

	const handleModalClick = e => {
		e.stopPropagation()
	}

	const cancelFn = () => {
		dispatch(closeModals())
	}

	const fetchMoreComments = ({ params }) => {
		console.info(
			`fetching comments for Post ${postId} with params ${JSON.stringify(
				params,
			)}`,
		)
		getCommentsForPost({ postId, params })
	}

	return (
		<div className="modalWrapper" onClick={cancelFn}>
			<div className="postModal" onScroll={() => setScrolling(prev => !prev)}>
				<div className="modalHeading">
					<CloseBtn closeFn={cancelFn} />
				</div>
				<div className="modalBody">
					<Post post={post} />
					<div onClick={e => e.stopPropagation()}>
						<div className="postDetails" onClick={handleModalClick}>
							<div className="postCaption">{post.caption}</div>
							<PostCommentList
								comments={comments}
								paginationObject={comments.postComments.byPost[postId]}
								fetchMoreRowsFn={fetchMoreComments}
								emptyListMessage="no comments"
								scrolling={scrolling}
								postId={postId}
								getNewCommentsForPostCount={getNewCommentsForPostCount}
								getNewCommentsForPost={getNewCommentsForPost}
								getCommentsForPost={getCommentsForPost}
							/>
							<CreateComment
								authHandle={authHandle}
								profiles={profiles}
								postId={postId}
								createPostComment={createPostComment}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getPost),
	withRPCRedux(RPC_IDS.createPostComment),
	withRPCRedux(RPC_IDS.getCommentsForPost),
	withRPCRedux(RPC_IDS.getNewCommentsForPost),
	withRPCRedux(RPC_IDS.getNewCommentsForPostCount),
]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	posts: state.posts,
	profiles: state.profiles,
	comments: state.comments,
	postId: state.ui.modals.postModal,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(PostModal)
