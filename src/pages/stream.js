import React, { useState } from 'react'
import { useHistory, useParams } from 'fusion-plugin-react-router'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { RPC_IDS } from '../constants/rpc'

import Loading from '../components/utils/Loading'

const StreamPage = ({ authProfileId, profiles, streams }) => {
	let { streamId } = useParams()
	const [body, setBody] = useState('following')

	const myStream = () => streams.byId[streamId].owner == authProfileId

	const CondStreamName = () => {
		if (myStream()) {
			return (
				<div className="streamName">
					<input />
				</div>
			)
		}
		return <></>
	}

	const StreamNav = () => {
		return (
			<div className="streamNav">
				<div
					className={body === 'subscribers' ? 'navItem active' : 'navItem'}
					onClick={() => setBody('subscribers')}
				>
					<div className="streamNavContent">subscribers</div>
				</div>
				<div
					className={body === 'following' ? 'navItem active' : 'navItem'}
					onClick={() => setBody('following')}
				>
					<div className="streamNavContent">following</div>
				</div>
			</div>
		)
	}

	const Body = () => {
		if (body == 'following') {
			return 'following'
		}
		return 'subscribers'
	}

	return (
		<div className="streamPageWrapper">
			<div className="streamPage">
				<CondStreamName />
				<StreamNav />
				<Body />
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.searchProfiles),
	withRPCRedux(RPC_IDS.followProfile),
]

const mapStateToProps = state => ({
	authProfileId: state.auth.authProfileId,
	profiles: state.profiles,
	streams: state.streams,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(StreamPage)
