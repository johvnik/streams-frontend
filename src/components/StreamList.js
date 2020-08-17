import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useHistory } from 'fusion-plugin-react-router'

import { RPC_IDS } from '../constants/rpc'
import paths from '../constants/paths'
import { setCurrentStream } from '../actions/actions'

import DetailsIcon from '../components/icons/DetailsIcon'
import Loading from '../components/utils/Loading'
import SubUnsubBtn from '../components/buttons/SubUnsubBtn'
import { ImagePreview } from './utils/ImagePreview'

const StreamList = ({
	authHandle,
	handle,
	profiles,
	streams,
	posts,
	getStreamsForProfile,
	unfollowStream,
	followStream,
	onlyMyStreams,
	hideButtons,
	streamSelectFn,
}) => {
	// const dispatch = useDispatch()
	const history = useHistory()

	const handleStreamClick = streamId => {
		// console.log(`clicked on stream ${stream.name}`)
		streamSelectFn(streamId)
	}

	const handleDetails = (e, streamId) => {
		e.stopPropagation()
		history.push(`${paths.stream}/${streamId}`)
	}

	const handleHandleClick = (e, profileId) => {
		e.stopPropagation()
		history.push(`${paths.profile}/${profileId}`)
	}

	if (!streams.byProfile[handle]) {
		return <Loading />
	}

	if (
		!Object.keys(streams.byProfile[handle]['all']).filter(
			key =>
				streams.byProfile[handle]['all'][key] &&
				!(onlyMyStreams && key in streams.byProfile[handle]['following']),
		).length
	) {
		return (
			<div className="streamList emptyMessageColor">
				{onlyMyStreams ? 'you have not created any streams' : 'no streams'}
			</div>
		)
	}

	return (
		<div className="streamList">
			{Object.keys(streams.byProfile[handle]['all'])
				.filter(
					key =>
						streams.byProfile[handle]['all'][key] &&
						!(onlyMyStreams && key in streams.byProfile[handle]['following']),
				)
				.map(key => {
					return streams.byId[key]
				})
				.map(stream => (
					<div
						className="stream"
						key={stream.id}
						onClick={() => handleStreamClick(stream.id)}
					>
						<div className="streamHeader">
							<div className="headerText">
								<div className="name">{stream.name}</div>
								{stream.owner != handle && (
									<div
										className="handle"
										onClick={e => handleHandleClick(e, stream.owner)}
									>
										{stream.handle}
									</div>
								)}
							</div>
							{!hideButtons && handle != authHandle && (
								<SubUnsubBtn
									streams={streams}
									authHandle={authHandle}
									streamId={stream.id}
									streamOwnerId={stream.owner}
									unfollowStream={unfollowStream}
									followStream={followStream}
								/>
							)}
							<div
								className="streamDetailsBtn"
								onClick={e => handleDetails(e, stream.id)}
							>
								<DetailsIcon />
							</div>
						</div>
						{posts.byStream[stream.id] &&
							posts.byStream[stream.id].postIds &&
							Object.keys(posts.byStream[stream.id].postIds)
								.slice(0, 4)
								.map(key => {
									return (
										posts.byId[key].image && (
											<div key={posts.byId[key].id} className="photo">
												<ImagePreview s3ObjectKey={posts.byId[key].image} />
												{/* <ImagePreview s3ObjectKey="ocean1.jpg" /> */}
											</div>
										)
									)
								})}
					</div>
				))}
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getStreamsForProfile),
	withRPCRedux(RPC_IDS.unfollowStream),
	withRPCRedux(RPC_IDS.followStream),
]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	streams: state.streams,
	posts: state.posts,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(StreamList)
