import React from 'react'

import PlusIcon from '../icons/PlusIcon'

const ProfileFollowBtn = ({ openFollowModalFn }) => {
	return (
		<div className="button followBtn" onClick={openFollowModalFn}>
			<PlusIcon />
		</div>
	)
}

export default ProfileFollowBtn
