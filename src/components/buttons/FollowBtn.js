import React from 'react'
import { useDispatch } from 'react-redux'

import { openFollowModal, openLoginModal } from '../../actions/actions'
import PlusIcon from '../icons/PlusIcon'

const FollowBtn = ({ handle, authHandle }) => {
	const dispatch = useDispatch()

	const handleClick = e => {
		e.stopPropagation()
		if (authHandle) {
			dispatch(openFollowModal(handle))
		} else {
			dispatch(openLoginModal())
		}
	}

	if (handle == authHandle) {
		return <></>
	}

	return (
		<div className="button followBtn" onClick={handleClick}>
			<PlusIcon />
		</div>
	)
}

export default FollowBtn
