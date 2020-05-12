// @flow
import React from 'react'
import { Route, Switch } from 'fusion-plugin-react-router'

import paths from './constants/paths'

import Home from './pages/home'
import FourOFour from './pages/fourofour'

import Root from './common-root'

const root = (
	<Root>
		<Switch>
			<Route exact path={paths.home} component={Home} />
			<Route component={FourOFour} />
		</Switch>
	</Root>
)

export default root
