import React from 'react'
import { useHistory } from 'fusion-plugin-react-router'

import paths from '../constants/paths'
import ProfileFollowBtn from './buttons/ProfileFollowBtn'
import UnfollowBtn from './buttons/UnfollowBtn'

const ProfileListItem = ({
	authProfileId,
	profiles,
	profileId,
	openFollowModalFn,
	displayUnfollowBtn,
}) => {
	const history = useHistory()

	const handleProfileClick = () => {
		history.push(`${paths.profile}/${profileId}`)
	}

	const CondFollowBtn = () => {
		if (authProfileId != profileId) {
			return <ProfileFollowBtn openFollowModalFn={openFollowModalFn} />
		}
		return <></>
	}

	return (
		<div className="profileListItem" onClick={handleProfileClick}>
			<div className="info">
				<div className="profileImage">
					<img src={profiles.byId[profileId].image} />
				</div>
				{profiles.byId[profileId].full_name && (
					<div className="profileName">
						{profiles.byId[profileId].full_name}
					</div>
				)}
				<div className="profileHandle">{profiles.byId[profileId].handle}</div>
			</div>
			{displayUnfollowBtn ? <UnfollowBtn /> : <CondFollowBtn />}
		</div>
	)
}

export default ProfileListItem
