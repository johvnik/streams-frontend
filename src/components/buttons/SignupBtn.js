import React from 'react'
import { useHistory } from 'fusion-plugin-react-router'

import paths from '../../constants/paths'

const SignupBtn = () => {
	const history = useHistory()

	const onClick = () => {
		history.push(paths.signup)
	}

	return (
		<div className="button signupBtn" onClick={onClick}>
			signup
		</div>
	)
}

export default SignupBtn
