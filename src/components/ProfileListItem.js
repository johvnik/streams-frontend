import React from 'react'
import { useHistory } from 'fusion-plugin-react-router'

import { ImagePreview } from './utils/ImagePreview'

import paths from '../constants/paths'
import FollowBtn from './buttons/FollowBtn'
import UnfollowBtn from './buttons/UnfollowBtn'

const ProfileListItem = ({
	authHandle,
	profiles,
	handle,
	openFollowModalFn,
	displayUnfollowBtn,
}) => {
	const history = useHistory()

	const handleProfileClick = () => {
		history.push(`${paths.profile}/${handle}`)
	}

	const CondFollowBtn = () => {
		if (authHandle != handle) {
			return (
				<FollowBtn
					authHandle={authHandle}
					openFollowModalFn={openFollowModalFn}
				/>
			)
		}
		return <></>
	}

	return (
		<div className="profileListItem" onClick={handleProfileClick}>
			<div className="info">
				<div className="profileImage">
					<ImagePreview s3ObjectKey={profiles.byHandle[handle].image} />
				</div>
				{profiles.byHandle[handle].full_name && (
					<div className="profileName">
						{profiles.byHandle[handle].full_name}
					</div>
				)}
				<div className="profileHandle">{profiles.byHandle[handle].handle}</div>
			</div>
			{displayUnfollowBtn ? <UnfollowBtn /> : <CondFollowBtn />}
		</div>
	)
}

export default ProfileListItem
