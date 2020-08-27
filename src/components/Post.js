// @flow
import React from 'react'

import { openPostModal } from '../actions/actions'
import Loading from './utils/Loading'
import ImagePreview from './utils/ImagePreview'
import { useDispatch } from 'react-redux'

const Post = ({ post, streams, profiles, measure, useDefaultImage }) => {
	const dispatch = useDispatch()

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

	if (!post) {
		return <GhostPost />
	}

	return (
		<div className="postWrapper">
			<div className="post" onClick={() => dispatch(openPostModal(post.id))}>
				<ImagePreview
					s3ObjectKey={post.image}
					measure={measure}
					useDefaultImage
				/>
				<div className="postFooter">
					<div className="profilePhoto">
						<ImagePreview s3ObjectKey={post.profile_image} />
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

export default Post

// // @flow
// import React from 'react'

// import { openPostModal } from '../actions/actions'
// import Loading from './utils/Loading'
// import ImagePreview from './utils/ImagePreview'
// import { useDispatch } from 'react-redux'

// const Post = ({ post, streams, profiles, measure, useDefaultImage }) => {
// 	const dispatch = useDispatch()

// 	const GhostPost = () => {
// 		return (
// 			<div className="post">
// 				<div className="postImage">
// 					<div className="ghostImage">
// 						<Loading />
// 					</div>
// 					<div className="postFooter">
// 						{/* <div className="profilePhoto">
// 							<img src={post.profile_image} />
// 						</div>
// 						<div className="poststreamId">{post.streamId}</div> */}
// 						{/* <LikeIcon
// 							postId={postId}
// 							myId={myId}
// 							streamIdLike={streamIdLike}
// 							liked={liked}
// 						/>
// 						<CommentIcon commented={commented} /> */}
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	}

// 	if (!post) {
// 		return <GhostPost />
// 		// return <></>
// 	}

// 	return (
// 		<div className="post" onClick={() => dispatch(openPostModal(post.id))}>
// 			<div className="postImage">
// 				<ImagePreview
// 					s3ObjectKey={post.image}
// 					measure={measure}
// 					useDefaultImage
// 				/>
// 				{/* <img src="https://source.unsplash.com/QhKX67yT7wk" onLoad={measure} /> */}
// 				<div className="postFooter">
// 					<div className="profilePhoto">
// 						<ImagePreview s3ObjectKey={post.profile_image} />
// 						{/* <img src="https://source.unsplash.com/QhKX67yT7wk" /> */}
// 					</div>
// 					<div className="postHandle">{post.handle}</div>
// 					{/* <LikeIcon
// 						postId={postId}
// 						myId={myId}
// 						streamIdLike={streamIdLike}
// 						liked={liked}
// 					/>
// 					<CommentIcon commented={commented} /> */}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default Post
