// @flow
import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'
import paths from '../constants/paths'

import Loading from '../components/utils/Loading'
import LoginForm from '../components/LoginForm'

const LoginPage = ({ auth }) => {
	if (auth.isLoading) {
		return <Loading />
	} else if (auth.isAuthenticated) {
		return <Redirect to={{ pathname: paths.home }} />
	} else {
		return (
			<div className="loginPage">
				<LoginForm />
			</div>
		)
	}
}

const rpcs = [withRPCRedux(RPC_IDS.verifyLogin)]

const mapStateToProps = state => ({
	auth: state.auth,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(LoginPage)
