import React from 'react'
import { styled } from 'fusion-plugin-styletron-react'

const HeaderStyle = styled('div', {
	fontSize: '80px',
	color: 'rgba(0,0,0,0.75)',
	alignItems: 'center',
	justifyContent: 'center',
	display: 'flex',
})

const PostsTitle = () => {
	return <HeaderStyle>posts</HeaderStyle>
}

export default PostsTitle
