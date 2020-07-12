import React, { useState, useEffect } from 'react'
import {
	Route,
	Switch,
	useParams,
	Redirect,
	NavLink,
} from 'fusion-plugin-react-router'

import paths from '../../constants/paths'

import HomeIcon from '../icons/HomeIcon'
import ProfileIcon from '../icons/ProfileIcon'
import StreamListIcon from '../icons/StreamListIcon'
import SearchIcon from '../icons/SearchIcon'
import NavTitle from './NavTitle'
// import BackBtn from './BackBtn'

// const isWindowContext = typeof window !== 'undefined'

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="navbarContents">
				<NavLink exact className="titleLink" to={paths.stream}>
					<HomeIcon />
					<NavTitle />
				</NavLink>
				<ul>
					<li>
						<NavLink to={paths.profile}>
							<ProfileIcon />
						</NavLink>
					</li>
					<li>
						<NavLink to={paths.streamList}>
							<StreamListIcon />
						</NavLink>
					</li>
					<li>
						<NavLink to={paths.search}>
							<SearchIcon />
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Navbar
