import React, { useEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

import Loading from './Loading'

const ProtectedRoute = ({ auth, verifyLogin, component }) => {
	const Component = component

	useEffect(() => {
		verifyLogin()
	}, [])

	if (!auth.isAuthenticated && auth.didAttempt) {
		return <Redirect to={{ pathname: paths.login }} />
	} else if (!auth.didAttempt) {
		return <Loading />
	} else {
		return <Component />
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

export default hoc(ProtectedRoute)
