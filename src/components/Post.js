import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'

const Post = ({ posts, postId }) => {
	return <div className="post">{posts.byId[postId].caption}</div>
}

const rpcs = []

const mapStateToProps = state => ({
	streams: state.streams,
	posts: state.posts,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(Post)
