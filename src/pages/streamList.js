import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'
import Loading from '../components/utils/Loading'

const StreamListPage = ({ streams, getMyOwnStreams, getStreamsIFollow }) => {
	useEffect(() => {
		getMyOwnStreams()
		getStreamsIFollow()
	}, [])

	const loading = () => {
		if (streams.loading) {
			return true
		}
		return false
	}

	if (loading()) {
		return <Loading />
	}

	return (
		<div className="listPageWrapper">
			<div className="listPage">something</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getMyOwnStreams),
	withRPCRedux(RPC_IDS.getStreamsIFollow),
]

const mapStateToProps = state => ({
	streams: state.streams,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(StreamListPage)
