import React from 'react'
import { styled } from 'fusion-plugin-styletron-react'

import Posts from '../components/Posts'

const DashboardPageDiv = styled('div', {
	display: 'grid',
	height: '100vh',
	width: '100vw',
	gridTemplateColumns: '1fr 3fr 1fr',
})

const MenuDiv = styled('div', {
	border: '1px dotted red',
})

const StreamDiv = styled('div', {
	border: '1px dotted white',
})

const Dashboard = () => (
	<DashboardPageDiv>
		<MenuDiv></MenuDiv>
		<StreamDiv></StreamDiv>
		<></>
	</DashboardPageDiv>
)

export default Dashboard
