// @flow
import React from 'react'
import { Route, Switch } from 'fusion-plugin-react-router'

import paths from './constants/paths'

import Home from './pages/home'
import FourOFour from './pages/fourofour'

import Login from './pages/login'

const root = (
	<Switch>
		<Route exact path={paths.home} component={Home} />
		<Route exact path={paths.login} component={Login} />
		<Route component={FourOFour} />
	</Switch>
)

export default root
