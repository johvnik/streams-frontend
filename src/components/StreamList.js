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
import SubscribeBtn from '../components/buttons/SubscribeBtn'
import UnsubscribeBtn from '../components/buttons/UnsubscribeBtn'
import { ImagePreview } from './utils/ImagePreview'

const StreamList = ({
	authProfileId,
	currentProfile,
	profiles,
	streams,
	posts,
	getStreamsForProfile,
	unfollowStream,
	followStream,
	getMyProfile,
	onlyMyStreams,
	hideButtons,
	streamSelectFn,
}) => {
	// const dispatch = useDispatch()
	const history = useHistory()

	const handleStreamClick = stream => {
		// console.log(`clicked on stream ${stream.name}`)
		streamSelectFn(stream.id)
	}

	const handleDetails = (e, streamId) => {
		e.stopPropagation()
		history.push(`${paths.stream}/${streamId}`)
	}

	const StreamButton = ({ streamId, streamOwnerId }) => {
		if (currentProfile == authProfileId) {
			return <></>
		}

		if (streams.byProfileId[authProfileId]) {
			if (streams.byProfileId[authProfileId]['following'][streamId]) {
				return (
					<div className="headerButton">
						<UnsubscribeBtn
							unfollowStream={unfollowStream}
							streamId={streamId}
							myProfileId={authProfileId}
						/>
					</div>
				)
			}

			if (authProfileId != streamOwnerId) {
				return (
					<div className="headerButton">
						<SubscribeBtn
							followStream={followStream}
							streamId={streamId}
							myProfileId={authProfileId}
						/>
					</div>
				)
			}
		}

		return <></>
	}

	const handleHandleClick = (e, profileId) => {
		e.stopPropagation()
		history.push(`${paths.profile}/${profileId}`)
	}

	if (!streams.byProfileId[currentProfile]) {
		return <Loading />
	}

	return (
		<div className="streamList">
			{Object.keys(streams.byProfileId[currentProfile]['all'])
				.filter(
					key =>
						!(
							onlyMyStreams &&
							key in streams.byProfileId[currentProfile]['following']
						),
				)
				.map(key => {
					return streams.byId[key]
				})
				.map(stream => (
					<div
						className="stream"
						key={stream.id}
						onClick={() => handleStreamClick(stream)}
					>
						<div className="streamHeader">
							<div className="headerText">
								<div className="name">{stream.name}</div>
								{stream.owner != currentProfile && (
									<div
										className="handle"
										onClick={e => handleHandleClick(e, stream.owner)}
									>
										{stream.handle}
									</div>
								)}
							</div>
							{!hideButtons && (
								<StreamButton
									streamId={stream.id}
									streamOwnerId={stream.owner}
								/>
							)}
							<div
								className="streamDetailsBtn"
								onClick={e => handleDetails(e, stream.id)}
							>
								<DetailsIcon />
							</div>
						</div>
						{posts.byStreamId[stream.id] &&
							posts.byStreamId[stream.id].postIds &&
							Object.keys(posts.byStreamId[stream.id].postIds)
								.slice(0, 4)
								.map(key => {
									return (
										posts.byId[key].image && (
											<div key={posts.byId[key].id} className="photo">
												<img src={posts.byId[key].image} />
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
	withRPCRedux(RPC_IDS.getMyProfile),
]

const mapStateToProps = state => ({
	authProfileId: state.auth.authProfileId,
	streams: state.streams,
	posts: state.posts,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(StreamList)
