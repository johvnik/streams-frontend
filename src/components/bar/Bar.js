import React from 'react'

import ProfileIcon from './ProfileIcon'
import StreamsIcon from './StreamsIcon'
import StreamTitle from './Title'

const Bar = ({ body, setBody }) => {
	return (
		<div className="bar">
			<ProfileIcon />
			<StreamTitle body={body} />
			<StreamsIcon setBody={setBody} />
		</div>
	)
}

export default Bar
