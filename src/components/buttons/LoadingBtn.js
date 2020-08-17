import React from 'react'
// import { useHistory } from 'fusion-plugin-react-router'

// import paths from '../../constants/paths'
import Loading from '../utils/Loading'

const LoadingBtn = ({ cancelFn }) => {
	return (
		<div className="button loadingBtn">
			<Loading />
		</div>
	)
}

export default LoadingBtn
