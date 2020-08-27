import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import { faEdit as farEdit } from '@fortawesome/free-regular-svg-icons'

const CloseIcon = () => {
	return <FontAwesomeIcon icon={faTimes} className="icon closeIcon" />
}

export default CloseIcon
