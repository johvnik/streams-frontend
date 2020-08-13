// @flow
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { RPC_IDS } from '../constants/rpc'

import Loading from '../components/utils/Loading'
import { ImagePreview } from '../components/utils/ImagePreview'

const HomePage = () => {
	return (
		<div className="streamPageWrapper">
			<div className="streamPage">
				{/* <ImagePreview s3ObjectKey="ocean1.jpg" /> */}
			</div>
		</div>
	)
}

export default HomePage

// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { compose } from 'redux'
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

// import { RPC_IDS } from '../constants/rpc'

// import LoginPage from './login'
// import DashboardPage from './dashboard'
// import LoadingPage from './loading'

// const Home = ({ auth, verifyLogin }) => {
// 	useEffect(() => {
// 		verifyLogin()
// 	}, [])

// 	if (!auth.didAttempt || auth.isLoading) {
// 		return <LoadingPage />
// 	} else {
// 		if (auth.isAuthenticated) {
// 			return <DashboardPage />
// 		} else {
// 			return <LoginPage />
// 		}
// 	}
// }

// const mapStateToProps = state => ({
// 	auth: state.auth,
// })

// const hoc = compose(
// 	withRPCRedux(RPC_IDS.verifyLogin),
// 	connect(mapStateToProps),
// )

// // export default hoc(Home)
