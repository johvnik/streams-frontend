import React from 'react'
import { styled } from 'fusion-plugin-styletron-react'

const LoadingDiv = styled('div', {
	display: 'grid',
	// border: '2px dashed green',
})

const Loading = () => <LoadingDiv>loading...</LoadingDiv>

export default Loading
