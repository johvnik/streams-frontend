import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons'

const ProfileIcon = () => {
	return <FontAwesomeIcon icon={farUser} className="icon profileIcon" />
}

export default ProfileIcon
