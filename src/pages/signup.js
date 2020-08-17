// @flow
import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'fusion-plugin-react-router'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'
import paths from '../constants/paths'

import Loading from '../components/utils/Loading'

const SignupPage = ({ auth, createAccount, login }) => {
	const [email, setEmail] = useState('')
	const [fullName, setFullName] = useState('')
	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()

	const handleSignup = event => {
		event.preventDefault()
		createAccount({
			handle,
			password,
			email,
			profile: { full_name: fullName },
		}).then(res => {
			console.log(res)
			if (!res.code) {
				login({ handle, password })
			}
		})
	}

	const routeToLogin = () => {
		history.push(paths.login)
	}

	if (auth.isLoading) {
		return <Loading />
	}

	if (auth.authProfileId) {
		return <Redirect to={{ pathname: paths.profile }} />
	}

	//  else if (auth.isAuthenticated && auth.authProfileId) {
	// 	return <Redirect to={{ pathname: paths.profile }} />
	// } else {
	return (
		<div className="signupPage">
			<div className="signupForm">
				<form className="form" onSubmit={handleSignup}>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="text"
						placeholder="email"
						name="email"
						required
					/>
					<input
						value={fullName}
						onChange={e => setFullName(e.target.value)}
						type="text"
						placeholder="full name"
						name="fullName"
						required
					/>
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
					<input className="submitButton" type="submit" value="sign up" />
					<div className="login" onClick={routeToLogin}>
						already have an account?
					</div>
				</form>
			</div>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.createAccount), withRPCRedux(RPC_IDS.login)]

const mapStateToProps = state => ({
	auth: state.auth,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(SignupPage)
