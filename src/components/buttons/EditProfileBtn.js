import React from 'react'

const EditProfileBtn = ({ handle, authHandle, openProfileEditModalFn }) => {
	return handle === authHandle ? (
		<div className="button editProfileBtn" onClick={openProfileEditModalFn}>
			edit profile
		</div>
	) : (
		<></>
	)
}

export default EditProfileBtn
