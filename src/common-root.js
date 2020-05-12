import React, { useEffect } from 'react'
import { Helmet } from 'fusion-plugin-react-helmet-async'
import { styled } from 'fusion-plugin-styletron-react'

const RootDiv = styled('div', {
	height: '100%',
	margin: '0',
	fontFamily: 'Verdana, Geneva, sans-serif',
})

const Root = ({ children }) => {
	return (
		<RootDiv>
			<Helmet>
				<title>Streams</title>
				<style>{'body { background-color: black; }'}</style>
			</Helmet>
			{children}
		</RootDiv>
	)
}

export default Root
