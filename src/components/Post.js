import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import {
	faHeart as farHeart,
	faComment as farComment,
} from '@fortawesome/free-regular-svg-icons'

import { RPC_IDS } from '../constants/rpc'

import LikeIcon from './LikeIcon'

const Post = ({ postLikes, posts, postId, likePost, unlikePost, myId }) => {
	const [detailsOpen, setDetailsOpen] = useState(false)
	const [commented, setCommented] = useState(false)

	const liked = () => {
		if (postLikes.accountIds[myId]) {
			if (postLikes.accountIds[myId].postIds[postId]) {
				return true
			}
		}
		return false
	}

	const handleLike = () => {
		if (liked()) {
			const like = postLikes.accountIds[myId].postIds[postId]
			unlikePost({ post: postId, account: myId, like })
		} else {
			likePost({ post: postId, account: myId })
		}
	}

	const handleComment = () => {
		setCommented(commented => !commented)
	}

	const CommentIcon = ({ commented }) => {
		if (commented) {
			return (
				<div className="postCommentIcon">
					<FontAwesomeIcon
						onClick={handleComment}
						icon={faComment}
						className="commentIcon"
					/>
				</div>
			)
		}

		return (
			<div className="postCommentIcon">
				<FontAwesomeIcon
					onClick={handleComment}
					icon={farComment}
					className="commentIcon"
				/>
			</div>
		)
	}

	const toggleDetail = () => {
		setDetailsOpen(open => !open)
	}

	return (
		<div className="post" onDoubleClick={handleLike}>
			<div className="postImage">
				<img src={`${posts.byId[postId].image},${postId}`} />
				<div className="postFooter" onClick={toggleDetail}>
					<div className="postProfileImage">
						<img src={posts.byId[postId].profile_image} />
					</div>
					<div className="postHandle">{posts.byId[postId].handle}</div>
					<LikeIcon
						postId={postId}
						myId={myId}
						handleLike={handleLike}
						liked={liked}
					/>
					<CommentIcon commented={commented} />
				</div>
				{detailsOpen ? (
					<div className="details slideAnim">details go in here.</div>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.likePost), withRPCRedux(RPC_IDS.unlikePost)]

const mapStateToProps = state => ({
	streams: state.streams,
	posts: state.posts,
	postLikes: state.likes.postLikes,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(Post)
