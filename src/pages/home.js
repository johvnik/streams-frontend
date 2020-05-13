// @flow
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'

import LoginPage from './login'
import DashboardPage from './dashboard'
import LoadingPage from './loading'

const Home = ({ auth, verifyLogin }) => {
	useEffect(() => {
		verifyLogin()
	}, [])

	if (!auth.didAttempt || auth.isLoading) {
		return <LoadingPage />
	} else {
		if (auth.isAuthenticated) {
			return <DashboardPage />
		} else {
			return <LoginPage />
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
