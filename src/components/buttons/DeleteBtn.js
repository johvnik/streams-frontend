import React, { useState } from 'react'
// import { useHistory } from 'fusion-plugin-react-router'

// import paths from '../../constants/paths'
import DeleteIcon from '../icons/DeleteIcon'
import LoadingIcon from '../icons/LoadingIcon'

const CancelBtn = ({ openConfirmModalFn }) => {
	return (
		<div className="button deleteBtn" onClick={openConfirmModalFn}>
			<DeleteIcon />
		</div>
	)
}

export default CancelBtn
