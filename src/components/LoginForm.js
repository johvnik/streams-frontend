// // @flow
// import React, { useState } from 'react'
// import { compose } from 'redux'
// import { connect, useDispatch } from 'react-redux'
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
// import {
// 	Route,
// 	Switch,
// 	useParams,
// 	Redirect,
// 	useHistory,
// } from 'fusion-plugin-react-router'

// import { RPC_IDS } from '../constants/rpc'
// import paths from '../constants/paths'
// import { resetStore } from '../actions/actions'

// const LoginForm = ({ login }) => {
// 	const [handle, setHandle] = useState('')
// 	const [password, setPassword] = useState('')

// 	const history = useHistory()
// 	const dispatch = useDispatch()

// 	const handleLogin = event => {
// 		event.preventDefault()
// 		dispatch(resetStore())
// 		login({ handle, password })
// 	}

// 	const signup = () => {
// 		history.push(paths.signup)
// 		// return <Redirect to={{ pathname: paths.signup }} />
// 	}

// 	return (
// 		<div className="login-form">
// 			<form className="form" onSubmit={handleLogin}>
// 				<input
// 					value={handle}
// 					onChange={e => setHandle(e.target.value)}
// 					type="text"
// 					placeholder="handle"
// 					name="handle"
// 					required
// 				/>
// 				<input
// 					value={password}
// 					onChange={e => setPassword(e.target.value)}
// 					type="password"
// 					placeholder="password"
// 					name="password"
// 					required
// 				/>
// 				<div className="forgot-password">forgot password?</div>
// 				<input className="login-button" type="submit" value="login" />
// 				<div className="sign-up" onClick={signup}>
// 					need an account?
// 					<div className="button">sign up.</div>
// 				</div>
// 			</form>
// 		</div>
// 	)
// }

// const hoc = compose(withRPCRedux(RPC_IDS.login))

// export default hoc(LoginForm)
