import React from 'react'
import { useHistory } from 'fusion-plugin-react-router'

import BackIcon from '../icons/BackIcon'

const BackBtn = ({}) => {
	const history = useHistory()

	const handleBackClick = () => {
		history.goBack()
	}

	return (
		<div className="button backBtn" onClick={handleBackClick}>
			<BackIcon />
		</div>
	)
}

// export default BackBtn
