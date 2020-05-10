import React from 'react'
import { styled } from 'fusion-plugin-styletron-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

const FullHeightDiv = styled('div', {
	height: '100%',
	backgroundColor: '#FFFFFF',
	marginTop: '15px',
	// border: '1px solid black',
})

const CenterStyle = styled('div', {
	display: 'block',
	alignItems: 'center',
	justifyContent: 'center',
	display: 'flex',
	height: '100%',
})

const PostsDiv = styled('div', {
	width: '600px',
	maxWidth: '100%',
	// border: '1px solid black',
})

const PostDiv = styled('div', {
	fontFamily: 'HelveticaNeue-Light, Arial',
	color: 'rgba(0,0,0,0.75)',
	alignItems: 'center',
	justifyContent: 'center',
	display: 'flex',
	padding: '5px',
	// border: '1px solid black',
})

var index = 0

const Posts = ({ posts, getPosts }) => {
	return (
		<FullHeightDiv>
			<CenterStyle>
				<PostsDiv>
					{posts.loading ? (
						<PostDiv>...</PostDiv>
					) : (
						<PostDiv>
							<button onClick={() => getPosts()}>get posts</button>
						</PostDiv>
					)}
					{posts.error ? <PostDiv>{posts.error.message}</PostDiv> : null}
					{posts.data.map(post => (
						<PostDiv key={post.id}>
							{post.handle} posted {post.caption}
						</PostDiv>
					))}
				</PostsDiv>
			</CenterStyle>
		</FullHeightDiv>
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
