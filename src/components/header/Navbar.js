import React from 'react'
import { NavLink } from 'fusion-plugin-react-router'

import paths from '../../constants/paths'

import HomeIcon from '../icons/HomeIcon'
import ProfileIcon from '../icons/ProfileIcon'
import SearchIcon from '../icons/SearchIcon'

const Navbar = ({ authHandle }) => {
	return (
		<div className="navbar">
			<div className="navbarContents">
				<NavLink exact className="titleLink" to={paths.home}>
					<HomeIcon />
					<NavTitle />
				</NavLink>
				<ul>
					<li>
						<NavLink to={`${paths.profile}/${authHandle}`}>
							<ProfileIcon />
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

const NavTitle = () => {
	return <div className="navTitle">{''}</div>
}
