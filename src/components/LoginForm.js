// @flow
import React, { useState } from 'react'
import { styled } from 'fusion-plugin-styletron-react'
import { compose } from 'redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'

const FormDiv = styled('div', {
	// alignItems: 'center',
	// justifyContent: 'center',
	// display: 'grid',
	// padding: '5px',
	border: '1px dashed white',
	width: '400px',
})

const FormInput = styled('input', {
	padding: '4px',
	borderRadius: '4px',
	border: '0px solid #444',
	backgroundColor: '#333',
	color: '#eee',
})

const FormInputButton = styled('input', {
	padding: '4px',
	borderRadius: '4px',
	border: '1px solid #222',
	backgroundColor: '#2c6fbb',
	color: '#eee',
})

const LoginForm = ({ login }) => {
	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = event => {
		event.preventDefault()
		login({ handle, password })
	}

	return (
		<FormDiv>
			<form onSubmit={handleLogin}>
				<FormInput
					value={handle}
					onChange={e => setHandle(e.target.value)}
					type="text"
					placeholder="handle"
					name="handle"
					required
				/>
				<br />
				<br />
				<FormInput
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
					placeholder="password"
					name="password"
					required
				/>
				<br />
				<br />
				<FormInputButton type="submit" value="sign in" />
			</form>
		</FormDiv>
	)
}

const hoc = compose(withRPCRedux(RPC_IDS.login))

export default hoc(LoginForm)
