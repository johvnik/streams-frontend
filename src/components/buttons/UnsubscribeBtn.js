import React from 'react'

const UnsubscribeBtn = ({ unfollowStream, streamId, myProfileId }) => {
	const handleUnsubscribe = e => {
		e.stopPropagation()
		unfollowStream({ streamId, profileId: myProfileId })
	}

	return (
		<div className="button unsubscribeBtn" onClick={handleUnsubscribe}>
			unsubscribe
		</div>
	)
}

export default UnsubscribeBtn
