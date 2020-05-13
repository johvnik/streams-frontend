import React from 'react'
import { styled } from 'fusion-plugin-styletron-react'

import LoadingIcon from '../components/LoadingIcon'

const LoadingPageDiv = styled('div', {
	display: 'grid',
	height: '100vh',
	width: '100vw',
	justifyContent: 'center',
	alignItems: 'center',
	// border: '2px dashed green',
})

const Loading = () => (
	<LoadingPageDiv>
		<LoadingIcon />
	</LoadingPageDiv>
)

export default Loading
