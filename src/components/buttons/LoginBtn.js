import React from 'react'
import { useHistory } from 'fusion-plugin-react-router'

import paths from '../../constants/paths'

const LoginBtn = () => {
	const history = useHistory()

	const onClick = () => {
		history.push(paths.login)
	}

	return (
		<div className="button loginBtn" onClick={onClick}>
			login
		</div>
	)
}

export default LoginBtn
