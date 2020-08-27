import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { RPC_IDS } from '../constants/rpc'
import PostGrid from '../components/PostGrid'

const ExplorePage = ({ posts, getExplore }) => {
	useEffect(() => {
		// getExplore()
	}, [])

	const fetchMoreRowsFn = ({ params }) => {
		console.info(
			`fetching posts for PostGrid on ExplorePage with params ${JSON.stringify(
				params,
			)}`,
		)
		getExplore({ params })
	}

	return (
		<div className="explorePage">
			<PostGrid
				posts={posts}
				paginationObject={posts.byExplore}
				emptyListMessage="no posts"
				fetchMoreRowsFn={fetchMoreRowsFn}
			/>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.getExplore)]

const mapStateToProps = state => ({
	posts: state.posts,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(ExplorePage)
