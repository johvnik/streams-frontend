import React from 'react'

import EditIcon from '../icons/EditIcon'

const EditProfileBtn = ({ openProfileEditModalFn }) => {
	return (
		<div className="button editProfileBtn" onClick={openProfileEditModalFn}>
			{/* <EditIcon /> */}
			edit profile
		</div>
	)
}

export default EditProfileBtn
