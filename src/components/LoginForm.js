// @flow
import React, { useState } from 'react'
import { compose } from 'redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

const LoginForm = ({ login }) => {
	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = event => {
		event.preventDefault()
		login({ handle, password })
	}

	return (
		<form onSubmit={handleLogin}>
			<label>{'handle: '}</label>
			<input
				value={handle}
				onChange={e => setHandle(e.target.value)}
				type="text"
				name="handle"
				required
			/>
			<br />
			<br />
			<label>{'password: '}</label>
			<input
				value={password}
				onChange={e => setPassword(e.target.value)}
				type="password"
				name="password"
				required
			/>
			<br />
			<br />
			<input type="submit" value="Login" />
		</form>
	)
}

const hoc = compose(withRPCRedux('login'))

export default hoc(LoginForm)
