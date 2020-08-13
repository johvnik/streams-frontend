import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import MinusIcon from '../icons/MinusIcon'

const UnfollowBtn = ({ profileId, myProfileId, unfollowFn }) => {
	const handleUnfollow = e => {
		e.stopPropagation()
		unfollowFn({ profileId, myProfileId })
	}

	return (
		<div className="button unfollowBtn" onClick={handleUnfollow}>
			<MinusIcon />
		</div>
	)
}

export default UnfollowBtn
