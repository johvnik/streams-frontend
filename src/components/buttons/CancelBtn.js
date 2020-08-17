import React from 'react'
// import { useHistory } from 'fusion-plugin-react-router'

// import paths from '../../constants/paths'

const CancelBtn = ({ cancelFn }) => {
	return (
		<div className="button cancelBtn" onClick={cancelFn}>
			cancel
		</div>
	)
}

export default CancelBtn
