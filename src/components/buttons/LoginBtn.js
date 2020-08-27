import React from 'react'
import { useHistory } from 'fusion-plugin-react-router'

import paths from '../../constants/paths'
import { useDispatch } from 'react-redux'
import { openLoginModal } from '../../actions/actions'

const LoginBtn = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	const onClick = () => {
		// history.push(paths.login)
		dispatch(openLoginModal())
	}

	return (
		<div className="button loginBtn" onClick={onClick}>
			login
		</div>
	)
}

export default LoginBtn
