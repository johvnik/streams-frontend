import React from 'react'

import PlusIcon from '../icons/PlusIcon'

const FollowBtn = ({ handle, authHandle, openFollowModalFn }) => {
	return handle !== authHandle ? (
		<div className="button followBtn" onClick={openFollowModalFn}>
			<PlusIcon />
		</div>
	) : (
		<></>
	)
}

export default FollowBtn
