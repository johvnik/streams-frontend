// @flow
import React from 'react'
import { Route, Switch } from 'fusion-plugin-react-router'

import Home from './pages/home'
import FourOFour from './pages/fourofour'

import Login from './pages/login'

const root = (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/login" component={Login} />
		<Route component={FourOFour} />
	</Switch>
)

export default root
