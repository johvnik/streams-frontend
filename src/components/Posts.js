import React, { useEffect } from 'react'
import { styled } from 'fusion-plugin-styletron-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import Loading from './LoadingIcon'

// const FullHeightDiv = styled('div', {
// 	height: '100%',
// 	color: '#eee',
// 	marginTop: '15px',
// 	// border: '1px solid black',
// })

// const CenterStyle = styled('div', {
// 	display: 'block',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// 	display: 'flex',
// 	height: '100%',
// })

const PostsRootDiv = styled('div', {
	display: 'flex',
	// width: '600px',
	// maxWidth: '100%',
	// color: '#eee',
	justifyContent: 'flex-top',
	alignItems: 'center',
	border: '1px dashed white',
})

const PostDiv = styled('div', {
	alignItems: 'center',
	justifyContent: 'center',
	display: 'flex',
	padding: '5px',
	// border: '1px solid black',
})

var index = 0

const Posts = ({ posts, getPosts }) => {
	useEffect(() => {
		getPosts()
	}, [])

	return (
		<PostsRootDiv>
			{posts.loading ? (
				<Loading />
			) : posts ? (
				posts.data.map(post => (
					<PostDiv key={post.id}>
						{post.handle} posted {post.caption}
					</PostDiv>
				))
			) : (
				<p>no posts available.</p>
			)}
		</PostsRootDiv>
	)
}

const mapStateToProps = state => ({
	posts: state.posts,
})

const hoc = compose(
	withRPCRedux('getPosts'),
	connect(mapStateToProps),
)

export default hoc(Posts)
