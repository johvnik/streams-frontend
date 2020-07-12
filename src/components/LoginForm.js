// @flow
import React, { useState } from 'react'
import { compose } from 'redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'

const LoginForm = ({ login }) => {
	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = event => {
		event.preventDefault()
		login({ handle, password })
	}

	return (
		<div className="login-form">
			<form className="form" onSubmit={handleLogin}>
				<input
					value={handle}
					onChange={e => setHandle(e.target.value)}
					type="text"
					placeholder="handle"
					name="handle"
					required
				/>
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
					placeholder="password"
					name="password"
					required
				/>
				<div className="forgot-password">forgot password?</div>
				<input className="login-button" type="submit" value="sign in" />
				<div className="sign-up">
					need an account?<div className="button">sign up.</div>
				</div>
			</form>
		</div>
	)
}

const hoc = compose(withRPCRedux(RPC_IDS.login))

export default hoc(LoginForm)
