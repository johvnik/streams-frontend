// @flow
import React, { useEffect } from 'react'
import { Redirect } from 'fusion-plugin-react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import Login from './login'
import Dashboard from './dashboard'

import paths from '../constants/paths'
import { RPC_IDS } from '../constants/rpc'

const Home = ({ auth, verifyLogin }) => {
	useEffect(() => {
		verifyLogin()
	}, [])

	if (!auth.didAttempt || auth.isLoading) {
		return <p>loading...</p>
	} else {
		if (auth.isAuthenticated) {
			return <Dashboard />
		} else {
			return <Login />
		}
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
})

const hoc = compose(
	withRPCRedux(RPC_IDS.verifyLogin),
	connect(mapStateToProps),
)

export default hoc(Home)
