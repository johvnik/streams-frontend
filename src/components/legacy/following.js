// // @flow
// import React, { useState, useEffect } from 'react'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
// import { useParams } from 'fusion-plugin-react-router'

// import { RPC_IDS } from '../constants/rpc'

// import Loading from '../components/utils/Loading'
// import ProfileList from '../components/ProfileList'

// const FollowingPage = ({ authHandle, profiles, getFollowingForProfile }) => {
// 	let { handle } = useParams()

// 	if (!handle) {
// 		handle = authHandle
// 	}

// 	useEffect(() => {
// 		getFollowingForProfile({ handle })
// 	}, [])

// 	if (!(profiles.byProfile[handle] && profiles.byProfile[handle].following)) {
// 		return <Loading />
// 	}

// 	return (
// 		<div className="followPageWrapper">
// 			<div className="followPage">
// 				<ProfileList
// 					authHandle={authHandle}
// 					profiles={profiles}
// 					paginationObject={profiles.byProfile[handle].following}
// 					emptyListMessage="not following"
// 				/>
// 			</div>
// 		</div>
// 	)
// }

// const rpcs = [
// 	withRPCRedux(RPC_IDS.followProfile),
// 	withRPCRedux(RPC_IDS.getFollowingForProfile),
// ]

// const mapStateToProps = state => ({
// 	authHandle: state.auth.authHandle,
// 	profiles: state.profiles,
// })

// const hoc = compose(
// 	...rpcs,
// 	connect(mapStateToProps),
// )

// export default hoc(FollowingPage)
