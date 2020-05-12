// @flow
import React from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { Redirect } from 'fusion-plugin-react-router'

import paths from '../constants/paths'

const Login = ({ auth }) => (
	<>
		<LoginForm />
	</>
)

const mapStateToProps = state => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(Login)
