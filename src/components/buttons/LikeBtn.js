import React from 'react'

import LikeIcon from '../icons/LikeIcon'

const LikeBtn = ({ liked, likeFn }) => {
	const handleClick = e => {
		e.stopPropagation()
		likeFn()
	}

	return (
		<div className="likeBtn" onClick={handleClick}>
			<LikeIcon liked />
		</div>
	)
}

export default LikeBtn
