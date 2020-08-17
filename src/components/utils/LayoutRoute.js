import React, { useEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'
import { didPerformInitialLoad } from '../../actions/actions'

import LoginModal from '../modals/LoginModal'
import Loading from './Loading'
import Navbar from '../header/Navbar'

const LayoutRoute = ({
	component: Component,
	auth,
	modals,
	// getAccount,
	protect,
	refreshLogin,
	// getStreamsForProfile,
	// getFollowersForProfile,
	// getFollowingForProfile,
	...rest
}) => {
	const dispatch = useDispatch()

	useEffect(() => {
		refreshLogin()
	}, [])

	const isAuth = () => {
		if (!auth.isAuthenticated && auth.didAttempt) {
			return false
		}
		return true
	}

	// if (!isAuth()) {
	// 	return <Redirect to={{ pathname: paths.login }} />
	// }

	if (!auth.isAuthenticated) {
		return <Loading />
	}

	return (
		<Route
			{...rest}
			render={props => {
				return (
					<>
						{modals.loginModal ? <LoginModal /> : <></>}
						<Navbar authHandle={auth.authHandle} />
						<Component {...props} />
					</>
				)
			}}
		></Route>
	)
}

const rpcs = [
	// withRPCRedux(RPC_IDS.getAccount),
	withRPCRedux(RPC_IDS.refreshLogin),
	// withRPCRedux(RPC_IDS.getStreamsForProfile),
	// withRPCRedux(RPC_IDS.getFollowersForProfile),
	// withRPCRedux(RPC_IDS.getFollowingForProfile),
]

const mapStateToProps = state => ({
	auth: state.auth,
	modals: state.ui.modals,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(LayoutRoute)
