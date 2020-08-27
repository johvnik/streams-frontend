import React from 'react'
import { useDispatch } from 'react-redux'

import { openCreateStreamModal } from '../../actions/actions'
import PlusIcon from '../icons/PlusIcon'

const CreateStreamBtn = () => {
	const dispatch = useDispatch()

	return (
		<div
			className="addButton"
			onClick={() => dispatch(openCreateStreamModal())}
		>
			<PlusIcon />
			<div className="addButtonText">stream</div>
		</div>
	)
}

export default CreateStreamBtn
