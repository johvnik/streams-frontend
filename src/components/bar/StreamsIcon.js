import React from 'react'

const StreamsIcon = ({ setBody }) => {
	const handleClick = () => {
		setBody('streamsList')
	}

	return <button onClick={handleClick}>Streams</button>
}

export default StreamsIcon
