import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { RPC_IDS } from '../constants/rpc'

import Post from '../components/Post'
import Loading from '../components/utils/Loading'

const StreamPage = () => {
	return (
		<div className="streamPageWrapper">
			<div className="streamPage">stream page!!</div>
		</div>
	)
}

export default StreamPage
