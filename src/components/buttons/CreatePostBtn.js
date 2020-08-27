import React from 'react'
import { useDispatch } from 'react-redux'

import { openCreatePostModal } from '../../actions/actions'
import PlusIcon from '../icons/PlusIcon'

const CreatePostBtn = () => {
	const dispatch = useDispatch()

	return (
		<div className="addButton" onClick={() => dispatch(openCreatePostModal())}>
			<PlusIcon />
			<div className="addButtonText">post</div>
		</div>
	)
}

export default CreatePostBtn
