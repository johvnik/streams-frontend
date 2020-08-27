// @flow
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useHistory } from 'fusion-plugin-react-router'
import ls from 'local-storage'

import { RPC_IDS } from '../constants/rpc'
import {
	resetStore,
	setHomeStream,
	didPerformInitialLoad,
} from '../actions/actions'
import paths from '../constants/paths'

import Loading from '../components/utils/Loading'
import LoadingBtn from '../components/buttons/LoadingBtn'
// import LoginForm from '../components/LoginForm'

const LoginPage = ({
	auth,
	login,
	getAccount,
	getAllPostLikes,
	getPostsForStream,
}) => {
	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()
	const dispatch = useDispatch()

	const handleLogin = event => {
		event.preventDefault()
		dispatch(resetStore())

		login({ handle, password })
			.then(res => {
				// console.log(res)
				if (res.code === 200) {
					// const authHandle = res.body && res.body.handle
					const initCalls = [getAccount(), getAllPostLikes()]

					const lsHomeStream = ls.get('homeStream')
					if (lsHomeStream) {
						dispatch(setHomeStream(lsHomeStream))
						initCalls.push(getPostsForStream({ streamId: lsHomeStream }))
					}

					Promise.all(initCalls)
						.then(responses => {
							let errorLoading = false
							console.log(responses)

							for (const res of responses) {
								console.log(res)
								if (res && (res.code < 200 || res.code >= 300)) {
									errorLoading = true
								}
							}

							if (!errorLoading) {
								dispatch(didPerformInitialLoad())
								history.push(paths.home)
							} else {
								// error handling for auth
							}
						})
						.catch(err => {
							// error handling for auth
						})
				} else {
					// error handling for auth
				}
			})
			.catch(err => {
				// error handling for auth
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
					{auth.isLoading ||
					(auth.authHandle && !auth.didPerformInitialLoad) ? (
						<LoadingBtn />
					) : (
						<input className="login-button" type="submit" value="login" />
					)}
					<div className="sign-up" onClick={signup}>
						need an account?
					</div>
				</form>
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.login),
	withRPCRedux(RPC_IDS.getAccount),
	withRPCRedux(RPC_IDS.getAllPostLikes),
	withRPCRedux(RPC_IDS.getPostsForStream),
]

const mapStateToProps = state => ({
	auth: state.auth,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(LoginPage)
