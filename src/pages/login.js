// @flow
import React from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'

import Navbar from '../components/Navbar'

const Login = ({ auth }) => (
	<>
		<Navbar />
		<LoginForm />
	</>
)

const mapStateToProps = state => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(Login)
