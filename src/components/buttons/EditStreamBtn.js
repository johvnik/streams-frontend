import React from 'react'

// import EditIcon from '../icons/EditIcon'
import { useDispatch } from 'react-redux'
import { openEditStreamModal } from '../../actions/actions'

const EditStreamBtn = ({ streamId }) => {
	const dispatch = useDispatch()

	return (
		<div
			className="button editStreamBtn"
			onClick={() => dispatch(openEditStreamModal(streamId))}
		>
			edit stream
		</div>
	)
}

export default EditStreamBtn
