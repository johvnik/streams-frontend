import React from 'react'

import { useDispatch } from 'react-redux'
import { openEditProfileModal } from '../../actions/actions'

const EditProfileBtn = () => {
	const dispatch = useDispatch()

	return (
		<div
			className="button editProfileBtn"
			onClick={() => dispatch(openEditProfileModal())}
		>
			edit profile
		</div>
	)
}

export default EditProfileBtn
