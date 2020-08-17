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
import LayoutRoute from './components/utils/LayoutRoute'

import Navbar from './components/header/Navbar'
import BackAndTitleBar from './components/header/BackAndTitleBar'
import LoginPage from './pages/login'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/home'
import StreamPage from './pages/stream'
import StreamListPage from './pages/streamList'
import SearchPage from './pages/search'
// import MyProfilePage from './pages/myProfile'
import ProfilePage from './pages/profile'
import SignupPage from './pages/signup'
import FollowingPage from './pages/following'
import FollowersPage from './pages/followers'

const root = (
	<>
		<Helmet>
			<title>streams</title>
			<link rel="stylesheet" href={assetUrl('./static/css/style.css')} />
		</Helmet>
		{/* <Route
			path={[
				`${paths.profile}/:profileIdParam`,
				`${paths.stream}/:streamIdParam`,
			]}
			component={BackAndTitleBar}
		/> */}
		<Switch>
			<Route exact path={paths.login} component={LoginPage} />
			<Route exact path={paths.signup} component={SignupPage} />
			<LayoutRoute exact path={paths.streamList} component={StreamListPage} />
			<LayoutRoute exact path={paths.search} component={SearchPage} />
			{/* <LayoutRoute
				path={`${paths.profile}/followers`}
				component={FollowersPage}
			/>
			<LayoutRoute
				path={`${paths.profile}/following`}
				component={FollowingPage}
			/>
			<LayoutRoute exact path={paths.profile} component={ProfilePage} /> */}
			<LayoutRoute
				path={`${paths.profile}/:handle/followers`}
				component={FollowersPage}
			/>
			<LayoutRoute
				path={`${paths.profile}/:handle/following`}
				component={FollowingPage}
			/>
			<LayoutRoute
				exact
				path={`${paths.profile}/:handle`}
				component={ProfilePage}
			/>
			<LayoutRoute path={`${paths.stream}/:streamId`} component={StreamPage} />
			<LayoutRoute path={paths.home} exact component={HomePage} />
			<Route component={NotFoundPage} />
		</Switch>
	</>
)

export default root
