import React, { useEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'
import StreamList from '../StreamList'

const FollowModal = ({
	authHandle,
	cancelFn,
	handle,
	followProfile,
	profiles,
}) => {
	const handleModalClick = e => {
		e.stopPropagation()
	}

	const handleFollowStream = streamId => {
		followProfile({ streamId, handle, authHandle })
		cancelFn()
	}

	return (
		<div className="modalWrapper" onClick={cancelFn}>
			<div className="modal followModal" onClick={handleModalClick}>
				<div className="modalHeading">
					{`choose a stream to follow ${profiles.byHandle[handle].handle}`}
				</div>
				<div className="modalBody">
					<StreamList
						handle={authHandle}
						streamSelectFn={handleFollowStream}
						onlyMyStreams
						hideButtons
					/>
				</div>
			</div>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.followProfile)]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	profiles: state.profiles,
	streams: state.streams,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(FollowModal)
