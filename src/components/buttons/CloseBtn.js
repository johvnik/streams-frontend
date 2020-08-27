import React from 'react'
import CloseIcon from '../icons/CloseIcon'
// import { useHistory } from 'fusion-plugin-react-router'

// import paths from '../../constants/paths'

const CloseBtn = ({ closeFn }) => {
	return (
		<div className="button closeBtn" onClick={closeFn}>
			<CloseIcon />
		</div>
	)
}

export default CloseBtn
