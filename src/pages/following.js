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
import ProfileListItem from '../components/ProfileListItem'
import InfiniteScroll from 'react-infinite-scroll-component'

const FollowingPage = ({
	authProfileId,
	profiles,
	followProfile,
	getFollowingForProfile,
}) => {
	let { profileId } = useParams()

	const [followModal, setFollowModal] = useState(0)

	if (!profileId) {
		profileId = authProfileId
	}

	useEffect(() => {
		getFollowingForProfile({ profileId })
	}, [])

	const openFollowModal = (e, profileId) => {
		e.stopPropagation()
		setFollowModal(profileId)
	}

	const closeFollowModal = () => {
		setFollowModal(0)
	}

	if (
		!(
			profiles.byProfileId[profileId] &&
			profiles.byProfileId[profileId].following &&
			profiles.byProfileId[profileId].following.profileIds
		)
	) {
		return <Loading />
	}

	return (
		<div className="followPageWrapper">
			<div className="followPage">
				{followModal ? (
					<FollowModal
						myProfileId={authProfileId}
						cancelFn={closeFollowModal}
						profileId={followModal}
						followProfile={followProfile}
					/>
				) : (
					<></>
				)}
				{profiles.byProfileId[profileId] &&
					profiles.byProfileId[profileId].following &&
					profiles.byProfileId[profileId].following.profileIds && (
						<ProfileList
							authProfileId={authProfileId}
							profiles={profiles}
							paginationObject={profiles.byProfileId[profileId].following}
							openFollowModalFn={openFollowModal}
							emptyListMessage="not following"
						/>
					)}
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.followProfile),
	withRPCRedux(RPC_IDS.getFollowingForProfile),
]

const mapStateToProps = state => ({
	authProfileId: state.auth.authProfileId,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(FollowingPage)
