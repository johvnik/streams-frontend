import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { NavLink } from 'react-router-dom'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

import HomeIcon from '../icons/HomeIcon'
import ProfileIcon from '../icons/ProfileIcon'
import StreamListIcon from '../icons/StreamListIcon'
import SearchIcon from '../icons/SearchIcon'
import NavTitle from './NavTitle'
import BackIcon from '../icons/BackIcon'
import {
	Route,
	Switch,
	useParams,
	Redirect,
	useHistory,
} from 'fusion-plugin-react-router'
// import BackBtn from './BackBtn'

// const isWindowContext = typeof window !== 'undefined'

const BackAndTitleBar = ({ auth }) => {
	const history = useHistory()

	const onClick = () => {
		history.goBack()
	}

	// if (history.length < 2) {
	// 	return null
	// }

	return (
		<div className="backAndTitleBar">
			<div onClick={onClick} className="barContents">
				<BackIcon />
			</div>
		</div>
	)
}

const rpcs = []

const mapStateToProps = state => ({
	auth: state.auth,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(BackAndTitleBar)
