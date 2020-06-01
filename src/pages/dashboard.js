import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'

import Bar from '../components/bar/Bar'
import Stream from '../components/Stream'
import StreamList from '../components/StreamList'

const Dashboard = ({
	getMyOwnStreams,
	getStreamsIFollow,
	getPostsForStream,
}) => {
	/*
		the body of the web page below the header.
		set this to change what the dashboard displays.
	*/
	const [body, setBody] = useState('streams')

	useEffect(() => {
		getMyOwnStreams().then(res => {
			if (res.body.length) {
				res.body.forEach(stream => {
					getPostsForStream({ stream_id: stream.id })
				})
			}
		})
		getStreamsIFollow().then(res => {
			if (res.body.length) {
				res.body.forEach(stream => {
					getPostsForStream({ stream_id: stream.id })
				})
			}
		})
	}, [])

	const Body = () => {
		if (body === 'streamsList') {
			return <StreamList setBody={setBody} />
		} else {
			return <Stream />
		}
	}

	return (
		<div className="dashboardPage">
			<Bar body={body} setBody={setBody} />
			<Body />
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getMyOwnStreams),
	withRPCRedux(RPC_IDS.getStreamsIFollow),
	withRPCRedux(RPC_IDS.getPostsForStream),
]

const mapStateToProps = state => ({
	streams: state.streams,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(Dashboard)
