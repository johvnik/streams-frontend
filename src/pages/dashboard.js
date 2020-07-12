import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { Route, Switch } from 'fusion-plugin-react-router'

import paths from '../constants/paths'

// import { RPC_IDS } from '../constants/rpc'

import NotFoundPage from './NotFoundPage'
import Navbar from '../components/header/Navbar'
import Stream from '../components/Stream'
import StreamList from '../components/StreamList'

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<Switch>
				{/* <ProtectedRoute exact path={paths.home} component={DashboardPage} /> */}
				<Route exact path={paths.dashboard} component={StreamList} />
				<Route exact path={paths.streamList} component={StreamList} />
				<Route component={NotFoundPage} />
			</Switch>
		</>
	)
}

export default Dashboard

// import React, { useState, useEffect } from 'react'
// import { compose } from 'redux'
// import { connect, useDispatch } from 'react-redux'
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

// import { RPC_IDS } from '../constants/rpc'
// import { setCurrentStream } from '../actions/actions'

// // import Bar from '../components/header/Header'
// // import Stream from '../components/Stream'
// // import StreamList from '../components/StreamList'
// // import MyProfile from '../components/MyProfile'
// // import Search from '../components/Search'
// // import Profile from '../components/Profile'

// const Dashboard = ({
// 	streams,
// 	getStreams,
// 	// getMyOwnStreams,
// 	// getStreamsIFollow,
// 	getPostsForStream,
// 	getMyProfile,
// 	profiles,
// 	getPostsForAccount,
// 	getPostLikesForAccount,
// 	getCommentLikesForAccount,
// }) => {
// 	/*
// 		the body of the web page below the header.
// 		set this to change what the dashboard displays.
// 	*/
// 	const [body, setBody] = useState('streamsList')

// 	const dispatch = useDispatch()

// 	useEffect(() => {
// 		getStreams()
// 		// getMyProfile()
// 		// .then(res => {
// 		// 	getPostsForAccount({ account_id: res.body.id })
// 		// 	getPostLikesForAccount({ account_id: res.body.id })
// 		// 	getCommentLikesForAccount({ account_id: res.body.id })
// 		// })
// 		// getMyOwnStreams().then(res => {
// 		// 	if (res.body.length) {
// 		// 		res.body.forEach(stream => {
// 		// 			getPostsForStream({ stream_id: stream.id })
// 		// 			if (!Object.keys(streams.currentStream).length) {
// 		// 				dispatch(setCurrentStream({ stream }))
// 		// 			}
// 		// 		})
// 		// 	}
// 		// })
// 		// getStreamsIFollow().then(res => {
// 		// 	if (res.body.length) {
// 		// 		res.body.forEach(stream => {
// 		// 			getPostsForStream({ stream_id: stream.id })
// 		// 			if (!Object.keys(streams.currentStream).length) {
// 		// 				dispatch(setCurrentStream({ stream }))
// 		// 			}
// 		// 		})
// 		// 	}
// 		// })
// 	}, [])

// 	const Body = () => {
// 		if (body === 'streamsList') {
// 			return <StreamList setBody={setBody} />
// 			// return <div>hey here are my streams</div>
// 		} else if (body === 'myProfile') {
// 			return <MyProfile />
// 		} else if (body === 'search') {
// 			return <Search setBody={setBody} />
// 		} else if (body === 'profile') {
// 			return <Profile />
// 		} else {
// 			return <Stream />
// 		}
// 	}

// 	return (
// 		<div className="dashboardPage">
// 			{/* <Bar body={body} setBody={setBody} /> */}
// 			<Body />
// 		</div>
// 	)
// }

// const rpcs = [
// 	withRPCRedux(RPC_IDS.getStreams),
// 	// withRPCRedux(RPC_IDS.getMyOwnStreams),
// 	// withRPCRedux(RPC_IDS.getStreamsIFollow),
// 	withRPCRedux(RPC_IDS.getPostsForStream),
// 	withRPCRedux(RPC_IDS.getPostsForAccount),
// 	withRPCRedux(RPC_IDS.getMyProfile),
// 	withRPCRedux(RPC_IDS.getPostLikesForAccount),
// 	withRPCRedux(RPC_IDS.getCommentLikesForAccount),
// ]

// const mapStateToProps = state => ({
// 	streams: state.streams,
// 	profiles: state.profiles,
// })

// const hoc = compose(
// 	...rpcs,
// 	connect(mapStateToProps),
// )

// export default hoc(Dashboard)
