import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faEdit as farEdit } from '@fortawesome/free-regular-svg-icons'

const EditIcon = () => {
	return <FontAwesomeIcon icon={farEdit} className="icon editIcon" />
}

export default EditIcon
