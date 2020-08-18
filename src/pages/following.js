// @flow
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useParams } from 'fusion-plugin-react-router'

import { RPC_IDS } from '../constants/rpc'

import Loading from '../components/utils/Loading'
import FollowModal from '../components/modals/FollowModal'
import ProfileList from '../components/ProfileList'

const FollowingPage = ({
	authHandle,
	profiles,
	followProfile,
	getFollowingForProfile,
}) => {
	let { handle } = useParams()

	const [followModal, setFollowModal] = useState(0)

	if (!handle) {
		handle = authHandle
	}

	useEffect(() => {
		getFollowingForProfile({ handle })
	}, [])

	const openFollowModal = (e, handle) => {
		e.stopPropagation()
		setFollowModal(handle)
	}

	const closeFollowModal = () => {
		setFollowModal(0)
	}

	if (
		!(
			profiles.byProfile[handle] &&
			profiles.byProfile[handle].following &&
			profiles.byProfile[handle].following.byProfile
		)
	) {
		return <Loading />
	}

	return (
		<div className="followPageWrapper">
			<div className="followPage">
				{followModal ? (
					<FollowModal
						authHandle={authHandle}
						cancelFn={closeFollowModal}
						handle={followModal}
						followProfile={followProfile}
					/>
				) : (
					<></>
				)}
				<ProfileList
					authHandle={authHandle}
					profiles={profiles}
					paginationObject={profiles.byProfile[handle].following}
					openFollowModalFn={openFollowModal}
					emptyListMessage="not following"
				/>
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.followProfile),
	withRPCRedux(RPC_IDS.getFollowingForProfile),
]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(FollowingPage)
