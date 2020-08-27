import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../../constants/rpc'
import Loading from '../utils/Loading'
import PlusIcon from '../icons/PlusIcon'
import StreamList from '../StreamList'

const StreamListPage = ({ profiles }) => {
	return (
		<div className="listPageWrapper">
			<div className="listPage">
				{/* <StreamList currentProfile={profiles.myId} /> */}
			</div>
		</div>
	)
}

const rpcs = []

const mapStateToProps = state => ({
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(StreamListPage)

// const StreamListPage = ({
// 	streams,
// 	posts,
// 	ownStreams,
// 	followedStreams,
// 	getStreams,
// }) => {
// 	// const [pageLoaded, setPageLoaded] = useState(false)

// 	useEffect(() => {
// 		getStreams()
// 		// setPageLoaded(true)
// 	}, [])

// 	const loading = () => {
// 		if (
// 			streams.loading &&
// 			!ownStreams.length &&
// 			!followedStreams.length &&
// 			!streams.hasLoaded
// 		) {
// 			return true
// 		}
// 		return false
// 	}

// 	if (loading()) {
// 		return <Loading />
// 	}

// 	const noStreams = () => {
// 		if (streams.hasLoaded && !ownStreams.length && !followedStreams.length) {
// 			return true
// 		}
// 		return false
// 	}

// 	if (noStreams()) {
// 		return (
// 			<div className="listPageWrapper">
// 				<div className="listPage">no streams.</div>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div className="listPageWrapper">
// 			<div className="listPage">
// 				<div className="add">
// 					<div className="addButton">
// 						<PlusIcon />
// 					</div>
// 				</div>
// 				<div className="streamList">
// 					{followedStreams.map(stream => (
// 						<div className="stream" key={stream.id}>
// 							<div className="title">
// 								<div className="name">{stream.name}</div>
// 								<div className="handle">{stream.handle}</div>
// 							</div>
// 							{posts.byStreamId[stream.id] &&
// 								Object.keys(posts.byStreamId[stream.id])
// 									.slice(0, 4)
// 									.map(key => {
// 										return (
// 											posts.byId[key].image && (
// 												<div key={posts.byId[key].id} className="photo">
// 													<img src={posts.byId[key].image} />
// 												</div>
// 											)
// 										)
// 									})}
// 						</div>
// 					))}
// 					{ownStreams.map(stream => (
// 						<div className="stream" key={stream.id}>
// 							<div className="title">{stream.name}</div>
// 							{posts.byStreamId[stream.id] &&
// 								Object.keys(posts.byStreamId[stream.id])
// 									.slice(0, 4)
// 									.map(key => {
// 										if (posts.byId[key].image) {
// 											return (
// 												<div key={posts.byId[key].id} className="photo">
// 													<img src={posts.byId[key].image} />
// 												</div>
// 											)
// 										}
// 									})}
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// const rpcs = [withRPCRedux(RPC_IDS.getStreams)]

// const mapStateToProps = state => ({
// 	streams: state.streams,
// 	ownStreams: Object.keys(state.streams.ownStreams.byId).map(
// 		key => state.streams.ownStreams.byId[key],
// 	),
// 	followedStreams: Object.keys(state.streams.followedStreams.byId).map(
// 		key => state.streams.followedStreams.byId[key],
// 	),
// 	posts: state.posts,
// })

// const hoc = compose(
// 	...rpcs,
// 	connect(mapStateToProps),
// )

// export default hoc(StreamListPage)
