import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'fusion-plugin-react-router'

import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { RPC_IDS } from '../constants/rpc'
import paths from '../constants/paths'

import Loading from '../components/utils/Loading'
import ProfileList from '../components/ProfileList'
import FollowModal from '../components/modals/FollowModal'
import EditStreamModal from '../components/modals/EditStreamModal'

import SubUnsubBtn from '../components/buttons/SubUnsubBtn'
import EditStreamBtn from '../components/buttons/EditStreamBtn'

const StreamPage = ({
	getStream,
	getFollowersForStream,
	getFollowingForStream,
	authHandle,
	profiles,
	ui,
	streams,
	followProfile,
	unfollowStream,
	followStream,
}) => {
	let { streamId } = useParams()
	const history = useHistory()
	const [body, setBody] = useState('following')

	useEffect(() => {
		getStream({ streamId })
		getFollowersForStream({ streamId })
		getFollowingForStream({ streamId })
	}, [])

	const myStream = () => streams.byId[streamId].handle == authHandle

	if (!streams.byId[streamId]) {
		return <Loading />
	}

	const StreamNav = () => {
		return (
			<div className="localNav">
				<div
					className={body === 'followers' ? 'navItem active' : 'navItem'}
					onClick={() => setBody('followers')}
				>
					<div>subscribers</div>
				</div>
				<div
					className={body === 'following' ? 'navItem active' : 'navItem'}
					onClick={() => setBody('following')}
				>
					<div>following</div>
				</div>
			</div>
		)
	}

	const Body = () => {
		if (body == 'following') {
			return <StreamProfileList following={true} />
		}
		return <StreamProfileList />
	}

	const handleHandleClick = (e, handle) => {
		e.stopPropagation()
		history.push(`${paths.profile}/${handle}`)
	}

	const StreamProfileList = ({ following }) => {
		const followx = following ? 'following' : 'followers'

		if (
			!(profiles.byStream[streamId] && profiles.byStream[streamId][followx])
		) {
			return <Loading />
		}

		const fetchMoreRowsFn = ({ params }) => {
			if (following) {
				getFollowingForStream({ streamId, params })
			} else {
				getFollowersForStream({ streamId, params })
			}
		}

		return (
			<ProfileList
				authHandle={authHandle}
				profiles={profiles}
				paginationObject={profiles.byStream[streamId][followx]}
				emptyListMessage={following ? 'not following' : 'no subscribers'}
				fetchMoreRowsFn={fetchMoreRowsFn}
			/>
		)
	}

	return (
		<div className="streamPageWrapper">
			<div className="streamPage">
				<div className="header">
					<div className="name">{streams.byId[streamId].name}</div>
					<div
						className="handle"
						onClick={e => handleHandleClick(e, streams.byId[streamId].handle)}
					>
						{streams.byId[streamId].handle}
					</div>
					<div className="buttons">
						{myStream() ? (
							<EditStreamBtn streamId={streamId} />
						) : authHandle ? (
							<SubUnsubBtn
								streams={streams}
								authHandle={authHandle}
								streamId={streamId}
								streamOwner={streams.byId[streamId].handle}
								unfollowStream={unfollowStream}
								followStream={followStream}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
				<StreamNav />
				<Body />
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getStream),
	withRPCRedux(RPC_IDS.searchProfiles),
	withRPCRedux(RPC_IDS.followProfile),
	withRPCRedux(RPC_IDS.getFollowersForStream),
	withRPCRedux(RPC_IDS.getFollowingForStream),
	withRPCRedux(RPC_IDS.followStream),
	withRPCRedux(RPC_IDS.unfollowStream),
]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	profiles: state.profiles,
	streams: state.streams,
	ui: state.ui,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(StreamPage)
