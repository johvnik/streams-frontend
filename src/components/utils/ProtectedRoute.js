import React, { useEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'
import { didPerformInitialLoad } from '../../actions/actions'

import Loading from './Loading'
import Navbar from '../header/Navbar'

const ProtectedRoute = ({
	component,
	auth,
	profiles,
	streams,
	posts,
	refreshLogin,
	getProfile,
	getAccount,
	getStreamsForProfile,
	getFollowersForProfile,
	getFollowingForProfile,
}) => {
	const dispatch = useDispatch()
	const Component = component

	useEffect(() => {
		if (!auth.didPerformInitialLoad) {
			refreshLogin()
				.then(res => {
					Promise.all([
						getAccount({ accountId: auth.authAccountId }),
						getStreamsForProfile({ profileId: auth.authProfileId }),
						getFollowingForProfile({ profileId: auth.authProfileId }),
						getFollowersForProfile({ profileId: auth.authProfileId }),
					]).then(values => {
						dispatch(didPerformInitialLoad())
					})
				})
				.catch(err => {
					console.log(err)
				})
		}
	}, [])

	const loadErrors = () => {
		console.log('firing load errors')
		console.log(auth.error, profiles.error, streams.error, posts.error)
		if (auth.error || profiles.error || streams.error || posts.error) {
			return true
		}
		return false
	}

	const NavRoute = () => {
		if (
			window.location.pathname === `${paths.profile}/followers` ||
			window.location.pathname === `${paths.profile}/following`
		) {
			return false
		}
		return true
	}

	// if (loadErrors()) {
	// 	return <div>whoops! something went wrong.</div>
	// }

	const isAuth = () => {
		if (!auth.isAuthenticated && auth.didAttempt) {
			return false
		}
		return true
	}

	if (!isAuth()) {
		return <Redirect to={{ pathname: paths.login }} />
	} else if (!auth.didAttempt || !auth.didPerformInitialLoad) {
		return <Loading />
	} else {
		return (
			<>
				{NavRoute() && <Navbar />}
				<Component />
			</>
		)
	}
}

const rpcs = [
	withRPCRedux(RPC_IDS.refreshLogin),
	withRPCRedux(RPC_IDS.getProfile),
	withRPCRedux(RPC_IDS.getStreamsForProfile),
	withRPCRedux(RPC_IDS.getFollowersForProfile),
	withRPCRedux(RPC_IDS.getFollowingForProfile),
	withRPCRedux(RPC_IDS.getAccount),
	// withRPCRedux(RPC_IDS.getMyProfile),
	// withRPCRedux(RPC_IDS.getStreams),
	// withRPCRedux(RPC_IDS.getFollowersForMe),
	// withRPCRedux(RPC_IDS.getFollowingForMe),
]

const mapStateToProps = state => ({
	auth: state.auth,
	profiles: state.profiles,
	streams: state.streams,
	posts: state.posts,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(ProtectedRoute)
