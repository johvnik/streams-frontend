import React, { useEffect } from 'react'
import { Helmet } from 'fusion-plugin-react-helmet-async'
import { styled } from 'fusion-plugin-styletron-react'

const RootDiv = styled('div', {
	display: 'grid',
	height: '100vh',
	justifyContent: 'center',
	alignItems: 'center',
	margin: '0px',
	padding: '0px',
	fontFamily: 'Verdana, Geneva, sans-serif',
	color: '#eee',
	// border: '2px dashed white',
})

const Root = ({ children }) => {
	return (
		<RootDiv>
			<Helmet>
				<title>streams</title>
				<style>
					{
						'body, html { background-color: black; margin: 0px; padding: 0px; } *, *::after, *::before { box-sizing: border-box; }'
					}
				</style>
			</Helmet>
			{children}
		</RootDiv>
	)
}

export default Root
