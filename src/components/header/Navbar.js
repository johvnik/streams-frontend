import React from 'react'
import { NavLink } from 'fusion-plugin-react-router'

import paths from '../../constants/paths'

import HomeIcon from '../icons/HomeIcon'
import GlobeIcon from '../icons/GlobeIcon'
import ProfileIcon from '../icons/ProfileIcon'
import SearchIcon from '../icons/SearchIcon'
import LoginBtn from '../buttons/LoginBtn'
import SignupBtn from '../buttons/SignupBtn'

const Navbar = ({ authHandle, homeStreamName }) => {
	return (
		<div className="navbar">
			{authHandle ? (
				<div className="navbarContents">
					<NavLink exact className="titleLink" to={paths.home}>
						{/* <HomeIcon /> */}
						<div className="navTitle">
							{homeStreamName ? homeStreamName : 'streams.'}
						</div>
					</NavLink>
					<ul>
						<li>
							<NavLink to={`${paths.profile}/${authHandle}`}>
								<ProfileIcon />
							</NavLink>
						</li>
						<li>
							<NavLink to={paths.explore}>
								<GlobeIcon />
							</NavLink>
						</li>
						<li>
							<NavLink to={paths.search}>
								<SearchIcon />
							</NavLink>
						</li>
					</ul>
				</div>
			) : (
				<div className="unauthBarContents">
					<div className="buttons">
						<LoginBtn />
						<SignupBtn />
						<NavLink to={paths.search}>
							<SearchIcon />
						</NavLink>
					</div>
				</div>
			)}
		</div>
	)
}

export default Navbar
