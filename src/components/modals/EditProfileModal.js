import React, { useEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'
import { didPerformInitialLoad } from '../../actions/actions'

import Loading from '../utils/Loading'
import Navbar from '../header/Navbar'
import StreamList from '../StreamList'

const EditProfileModal = ({ profiles, cancelFn, followProfile, profileId }) => {
	// const dispatch = useDispatch()

	// useEffect(() => {}, [])

	const handleModalClick = e => {
		e.stopPropagation()
	}

	const handleFollowStream = streamId => {
		followProfile({ streamId, profileId })
		cancelFn()
	}

	return (
		<div className="modalWrapper" onClick={cancelFn}>
			<div className="modal editProfileModal" onClick={handleModalClick}>
				<div className="modalHeading">edit profile</div>
				<div className="modalBody">edit the profile!</div>
			</div>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.followProfile)]

const mapStateToProps = state => ({
	profiles: state.profiles,
	streams: state.streams,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(EditProfileModal)
