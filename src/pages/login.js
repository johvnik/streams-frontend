// @flow
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useHistory } from 'fusion-plugin-react-router'

import { RPC_IDS } from '../constants/rpc'
import { resetStore } from '../actions/actions'
import paths from '../constants/paths'

import Loading from '../components/utils/Loading'
// import LoginForm from '../components/LoginForm'

const LoginPage = ({ login }) => {
	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()
	const dispatch = useDispatch()
	// if (auth.isLoading) {
	// 	return <Loading />
	// } else if (auth.isAuthenticated) {
	// 	return <Redirect to={{ pathname: paths.home }} />
	// } else {
	const handleLogin = event => {
		event.preventDefault()
		dispatch(resetStore())
		login({ handle, password }).then(res => {
			history.push(paths.home)
		})
	}

	const signup = () => {
		history.push(paths.signup)
		// return <Redirect to={{ pathname: paths.signup }} />
	}

	return (
		<div className="loginPage">
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
					<input className="login-button" type="submit" value="login" />
					<div className="sign-up" onClick={signup}>
						need an account?
					</div>
				</form>
			</div>
		</div>
	)
	// }
}

const rpcs = [withRPCRedux(RPC_IDS.login)]

const mapStateToProps = state => ({})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(LoginPage)
