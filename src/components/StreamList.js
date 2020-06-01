import React from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'

import { setCurrentStream } from '../actions/actions'

const StreamList = ({ ownStreams, followedStreams, setBody }) => {
	const dispatch = useDispatch()

	const handleStreamClick = stream => {
		setBody('stream')
		dispatch(setCurrentStream({ stream }))
	}

	return (
		<div className="streamsList">
			<h1>my streams.</h1>
			{ownStreams.map(stream => (
				<div
					className="streamListItem"
					onClick={() => handleStreamClick(stream)}
					key={stream.id}
				>
					{stream.name}
				</div>
			))}
			<h1>followed streams.</h1>
			{followedStreams.map(stream => (
				<div
					className="streamListItem"
					onClick={() => handleStreamClick(stream)}
					key={stream.id}
				>
					{stream.name} - {stream.handle}
				</div>
			))}
		</div>
	)
}

const mapStateToProps = state => ({
	ownStreams: Object.keys(state.streams.ownStreams.byId).map(
		key => state.streams.ownStreams.byId[key],
	),
	followedStreams: Object.keys(state.streams.followedStreams.byId).map(
		key => state.streams.followedStreams.byId[key],
	),
})

const hoc = compose(connect(mapStateToProps))

export default hoc(StreamList)
