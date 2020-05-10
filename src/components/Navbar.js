import React from 'react'
import { Link } from 'fusion-plugin-react-router'

import paths from '../constants/paths'

const Navbar = () => (
	<>
		<Link to={paths.home}>home.</Link>
		<Link to={paths.login}>login.</Link>
	</>
)

export default Navbar
