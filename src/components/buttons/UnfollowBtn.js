import React from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import MinusIcon from '../icons/MinusIcon'
import { openLoginModal } from '../../actions/actions'

const UnfollowBtn = ({ handle, authHandle, unfollowFn }) => {
	const dispatch = useDispatch()

	const handleUnfollow = e => {
		e.stopPropagation()
		if (authHandle) {
			console.log('open unfollow modal??')
		} else {
			dispatch(openLoginModal())
		}
		// unfollowFn({ handle, authHandle })
	}

	return handle !== authHandle ? (
		<div className="button unfollowBtn" onClick={handleUnfollow}>
			<MinusIcon />
		</div>
	) : (
		<></>
	)
}

export default UnfollowBtn
