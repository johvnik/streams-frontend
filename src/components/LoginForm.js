// @flow
import React, { useState } from 'react'

const LoginForm = () => {
	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	return (
		<form action="/login" method="post">
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

export default LoginForm
