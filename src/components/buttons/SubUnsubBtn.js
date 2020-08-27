import React from 'react'
import { useDispatch } from 'react-redux'
import { openLoginModal } from '../../actions/actions'

const SubUnsubBtn = ({
	streams,
	authHandle,
	streamId,
	streamOwner,
	unfollowStream,
	followStream,
}) => {
	if (authHandle && streams.byProfile[authHandle]) {
		if (streams.byProfile[authHandle]['following'][streamId]) {
			return (
				<div className="headerButton">
					<UnsubscribeBtn
						unfollowStream={unfollowStream}
						streamId={streamId}
						authHandle={authHandle}
						streamOwner={streamOwner}
					/>
				</div>
			)
		}

		if (!authHandle || authHandle != streamOwner) {
			return (
				<div className="headerButton">
					<SubscribeBtn
						followStream={followStream}
						streamId={streamId}
						authHandle={authHandle}
						streamOwner={streamOwner}
					/>
				</div>
			)
		}
	}

	return <></>
}

const SubscribeBtn = ({ followStream, streamId, authHandle, streamOwner }) => {
	const dispatch = useDispatch()

	const handleSubscribe = e => {
		e.stopPropagation()
		if (authHandle) {
			followStream({ streamId, handle: authHandle, streamOwner })
		} else {
			dispatch(openLoginModal())
		}
	}

	return (
		<div className="button subscribeBtn" onClick={handleSubscribe}>
			subscribe
		</div>
	)
}

const UnsubscribeBtn = ({
	unfollowStream,
	streamId,
	authHandle,
	streamOwner,
}) => {
	const handleUnsubscribe = e => {
		e.stopPropagation()
		unfollowStream({ streamId, handle: authHandle, streamOwner })
	}

	return (
		<div className="button unsubscribeBtn" onClick={handleUnsubscribe}>
			unsubscribe
		</div>
	)
}

export default SubUnsubBtn
