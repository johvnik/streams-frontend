import React, { useEffect } from 'react'
import {
	Route,
	Switch,
	useParams,
	Redirect,
	useHistory,
} from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import ls from 'local-storage'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'
import {
	didPerformInitialLoad,
	setHomeStream,
	resetStore,
	openLoginModal,
	clear401Error,
	closeModals,
	closeLoginModal,
} from '../../actions/actions'

import LoginModal from '../modals/LoginModal'
import PostModal from '../modals/PostModal'
import FollowModal from '../modals/FollowModal'
import EditProfileModal from '../modals/EditProfileModal'
import CreatePostModal from '../modals/CreatePostModal'
import CreateStreamModal from '../modals/CreateStreamModal'
import Loading from './Loading'
import Navbar from '../header/Navbar'
import EditStreamModal from '../modals/EditStreamModal'

const LayoutRoute = ({
	component: Component,
	protectedRoute,
	auth,
	streams,
	modals,
	homeStream,
	refreshLogin,
	getAccount,
	getAllPostLikes,
	getPostsForStream,
	...rest
}) => {
	const dispatch = useDispatch()

	useEffect(() => {
		if (!auth.didPerformInitialLoad) {
			// dispatch(resetStore())

			refreshLogin()
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
	}, [auth.authHandle])

	// const isAuth = () => {
	// 	if (!auth.isAuthenticated && auth.didAttempt) {
	// 		return false
	// 	}
	// 	return true
	// }

	if (!auth.didAttempt) {
		return <Loading />
	}

	// if (auth.error401) {
	// 	return <Redirect to={{ pathname: paths.login }} />
	// 	// if (protectedRoute) {
	// 	// 	return <Redirect to={{ pathname: paths.login }} />
	// 	// } else {
	// 	// 	if (!modals.loginModal) {
	// 	// 		dispatch(clear401Error())
	// 	// 		dispatch(openLoginModal())
	// 	// 	}
	// 	// }
	// }

	if (
		auth.error401 ||
		(protectedRoute && !auth.authHandle && auth.didAttempt)
	) {
		dispatch(closeModals())
		dispatch(closeLoginModal())
		return <Redirect to={{ pathname: paths.login }} />
	}

	// if (auth.error) {
	// 	return <Redirect to={{ pathname: paths.login }} />
	// }

	// if (!auth.didPerformInitialLoad) {
	// 	return <Loading />
	// }

	return (
		<Route
			{...rest}
			render={props => {
				return (
					<>
						{modals.loginModal ? <LoginModal /> : <></>}
						{modals.postModal ? <PostModal /> : <></>}
						{modals.followModal ? <FollowModal /> : <></>}
						{modals.editProfileModal ? <EditProfileModal /> : <></>}
						{modals.editStreamModal ? <EditStreamModal /> : <></>}
						{modals.createPostModal ? <CreatePostModal /> : <></>}
						{modals.createStreamModal ? <CreateStreamModal /> : <></>}
						<Navbar
							authHandle={auth.authHandle}
							homeStreamName={
								homeStream
									? streams.byId[homeStream] && streams.byId[homeStream].name
										? streams.byId[homeStream].name
										: ls.get('homeStreamName')
									: null
							}
						/>
						<Component {...props} />
					</>
				)
			}}
		></Route>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.refreshLogin),
	withRPCRedux(RPC_IDS.getAccount),
	withRPCRedux(RPC_IDS.getAllPostLikes),
	withRPCRedux(RPC_IDS.getPostsForStream),

	// withRPCRedux(RPC_IDS.getFollowersForProfile),
	// withRPCRedux(RPC_IDS.getFollowingForProfile),
]

const mapStateToProps = state => ({
	auth: state.auth,
	streams: state.streams,
	modals: state.ui.modals,
	homeStream: state.ui.homeStream,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(LayoutRoute)
