// @flow
import React from 'react'
import { Helmet } from 'fusion-plugin-react-helmet-async'
import { assetUrl } from 'fusion-core'
import { Route, Switch } from 'fusion-plugin-react-router'

import paths from './constants/paths'

import Home from './pages/home'
import FourOFour from './pages/fourofour'

const root = (
	<>
		<Helmet>
			<title>streams</title>
			<link rel="stylesheet" href={assetUrl('./static/css/style.css')} />
		</Helmet>
		<Switch>
			<Route exact path={paths.home} component={Home} />
			<Route component={FourOFour} />
		</Switch>
	</>
)

export default root
