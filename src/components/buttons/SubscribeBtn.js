import React from 'react'

const SubscribeBtn = ({ followStream, streamId, myProfileId }) => {
	const handleSubscribe = e => {
		e.stopPropagation()
		followStream({ streamId, profileId: myProfileId })
	}

	return (
		<div className="button subscribeBtn" onClick={handleSubscribe}>
			subscribe
		</div>
	)
}

export default SubscribeBtn
