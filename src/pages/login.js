// @flow
import React from 'react'
import { styled } from 'fusion-plugin-styletron-react'

import LoginForm from '../components/LoginForm'

const LoginPageDiv = styled('div', {
	display: 'grid',
	height: '100vh',
	width: '100vw',
	justifyContent: 'center',
	alignItems: 'center',
	// border: '4px dashed red',
})

const Login = () => (
	<LoginPageDiv>
		<LoginForm />
	</LoginPageDiv>
)

export default Login
