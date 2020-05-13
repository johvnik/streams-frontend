// @flow
import React, { useState } from 'react'
import { styled } from 'fusion-plugin-styletron-react'
import { compose } from 'redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'

const LoginFormRootDiv = styled('div', {
	display: 'grid',
	width: '300px',
	height: '240px',
	gridTemplateRows: '8fr 1fr',
	gridRowGap: '1rem',
	// border: '1px dotted white',
})

const Form = styled('form', {
	display: 'grid',
	gridTemplateRows: '3fr 3fr 1fr 3fr',
	gridRowGap: '1rem',
})

const FormInput = styled('input', {
	gridColumn: '1 / -1',
	padding: '0.8rem',
	borderRadius: '0.2rem',
	border: '0px solid #444',
	backgroundColor: '#333',
	color: '#eee',
})

const FormInputButton = styled('input', {
	gridColumn: '1 / -1',
	padding: '0.8rem',
	borderRadius: '0.2rem',
	border: '0px solid #444',
	backgroundColor: '#2c6fbb',
	color: '#eee',
})

const ForgotPasswordDiv = styled('div', {
	display: 'grid',
	alignSelf: 'start',
	justifySelf: 'end',
	fontSize: '0.5rem',
	color: '#2c6fbb',
	userSelect: 'none',
	msUserSelect: 'none',
	KhtmlUserSelect: 'none',
	MozUserSelect: 'none',
	WebkitUserSelect: 'none',
	// border: '1px dashed white',
})

const SignUpDiv = styled('div', {
	display: 'grid',
	alignSelf: 'center',
	justifySelf: 'center',
	fontSize: '0.8rem',
})

const LoginForm = ({ login }) => {
	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = event => {
		event.preventDefault()
		login({ handle, password })
	}

	return (
		<LoginFormRootDiv>
			<Form onSubmit={handleLogin}>
				<FormInput
					value={handle}
					onChange={e => setHandle(e.target.value)}
					type="text"
					placeholder="handle"
					name="handle"
					required
				/>
				<FormInput
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
					placeholder="password"
					name="password"
					required
				/>
				<ForgotPasswordDiv>
					<b>forgot password?</b>
				</ForgotPasswordDiv>
				<FormInputButton type="submit" value="sign in" />
			</Form>
			<SignUpDiv>need an account? sign up.</SignUpDiv>
		</LoginFormRootDiv>
	)
}

const hoc = compose(withRPCRedux(RPC_IDS.login))

export default hoc(LoginForm)
