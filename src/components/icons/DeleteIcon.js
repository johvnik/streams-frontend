import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { faTrashAlt as farEdit } from '@fortawesome/free-regular-svg-icons'

const DeleteIcon = () => {
	return <FontAwesomeIcon icon={faTrashAlt} className="icon deleteIcon" />
}

export default DeleteIcon
