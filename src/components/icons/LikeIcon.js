import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

const LikeIcon = ({ liked }) => {
	return liked ? (
		<FontAwesomeIcon icon={faHeart} className="icon likeIcon likedLikeIcon" />
	) : (
		<FontAwesomeIcon icon={farHeart} className="icon likeIcon" />
	)
}

export default LikeIcon

// import React, { useState } from 'react'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
// import {
// 	faHeart as farHeart,
// 	faComment as farComment,
// } from '@fortawesome/free-regular-svg-icons'

// import { RPC_IDS } from '../constants/rpc'

// const LikeIcon = ({ postId, postLikes, myId, handleLike, liked }) => {
// 	if (liked()) {
// 		return (
// 			<div className="postLikeIcon">
// 				<FontAwesomeIcon
// 					onClick={handleLike}
// 					icon={faHeart}
// 					className="likeIcon liked"
// 				/>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div className="postLikeIcon">
// 			<FontAwesomeIcon
// 				onClick={handleLike}
// 				icon={farHeart}
// 				className="likeIcon"
// 			/>
// 		</div>
// 	)
// }

// const rpcs = []

// const mapStateToProps = state => ({
// 	postLikes: state.likes.postLikes,
// })

// const hoc = compose(
// 	...rpcs,
// 	connect(mapStateToProps),
// )

// export default hoc(LikeIcon)
