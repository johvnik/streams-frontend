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

import LayoutRoute from './components/utils/LayoutRoute'
// import Navbar from './components/header/Navbar'
import LoginPage from './pages/login'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/home'
import StreamFollowsPage from './pages/streamFollows'
import SearchPage from './pages/search'
import ExplorePage from './pages/explore'
// import MyProfilePage from './pages/myProfile'
import ProfilePage from './pages/profile'
import SignupPage from './pages/signup'
import ProfileFollowsPage from './pages/profileFollows'

const root = (
	<>
		<Helmet>
			<title>streams</title>
			<link rel="stylesheet" href={assetUrl('./static/css/style.css')} />
		</Helmet>
		<Switch>
			<Route exact path={paths.login} component={LoginPage} />
			<Route exact path={paths.signup} component={SignupPage} />
			<LayoutRoute exact path={paths.search} component={SearchPage} />
			<LayoutRoute
				exact
				path={paths.explore}
				component={ExplorePage}
				protectedRoute
			/>
			<LayoutRoute
				exact
				path={`${paths.profile}/:handle${paths.follows}`}
				component={ProfileFollowsPage}
				protectedRoute
			/>
			<LayoutRoute
				exact
				path={`${paths.profile}/:handle`}
				component={ProfilePage}
			/>
			<LayoutRoute
				exact
				path={`${paths.stream}/:streamId`}
				component={StreamFollowsPage}
				protectedRoute
			/>
			<LayoutRoute
				exact
				path={paths.home}
				component={HomePage}
				protectedRoute
			/>
			<Route component={NotFoundPage} />
		</Switch>
	</>
)

export default root
