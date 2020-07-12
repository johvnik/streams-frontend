// @flow
import React from 'react'
import { Helmet } from 'fusion-plugin-react-helmet-async'
import { assetUrl } from 'fusion-core'
import {
	Route,
	Switch,
	useParams,
	Redirect,
	NavLink,
} from 'fusion-plugin-react-router'

import paths from './constants/paths'

import ProtectedRoute from './components/utils/ProtectedRoute'

import Navbar from './components/header/Navbar'
import BackAndTitleBar from './components/header/BackAndTitleBar'
import LoginPage from './pages/login'
import NotFoundPage from './pages/NotFoundPage'
import StreamPage from './pages/stream'
import StreamListPage from './pages/streamList'
import SearchPage from './pages/search'
import MyProfilePage from './pages/myProfile'
import ProfilePage from './pages/profile'

const root = (
	<>
		<Helmet>
			<title>streams</title>
			<link rel="stylesheet" href={assetUrl('./static/css/style.css')} />
		</Helmet>
		<Route
			exact
			path={[paths.stream, paths.profile, paths.search, paths.streamList]}
			component={Navbar}
		/>
		<Route path={[`${paths.profile}/:profileId`]} component={BackAndTitleBar} />
		<Switch>
			<Route exact path={paths.login} component={LoginPage} />
			<ProtectedRoute exact path={paths.stream} component={StreamPage} />
			<ProtectedRoute
				exact
				path={paths.streamList}
				component={StreamListPage}
			/>
			<ProtectedRoute exact path={paths.profile} component={MyProfilePage} />
			<ProtectedRoute exact path={paths.search} component={SearchPage} />
			<Route path={`${paths.profile}/:profileId`} component={ProfilePage} />
			<Route component={NotFoundPage} />
		</Switch>
	</>
)

export default root
