import React from 'react'

import EditIcon from '../icons/EditIcon'

const EditStreamBtn = ({ openStreamEditModalFn }) => {
	return (
		<div className="button editStreamBtn" onClick={openStreamEditModalFn}>
			{/* <EditIcon /> */}
			edit stream
		</div>
	)
}

export default EditStreamBtn
