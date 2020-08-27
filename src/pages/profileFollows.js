// @flow
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useParams, useHistory } from 'fusion-plugin-react-router'

import { RPC_IDS } from '../constants/rpc'

import Loading from '../components/utils/Loading'
import ProfileList from '../components/ProfileList'
import paths from '../constants/paths'

const FollowsPage = ({
	authHandle,
	ui,
	profiles,
	getFollowersForProfile,
	getFollowingForProfile,
}) => {
	let { handle } = useParams()
	const history = useHistory()
	const [body, setBody] = useState(ui.follows || 'followers')

	if (!handle) {
		handle = authHandle
	}

	useEffect(() => {
		getFollowersForProfile({ handle })
		getFollowingForProfile({ handle })
	}, [])

	if (
		!(
			profiles.byProfile[handle] &&
			profiles.byProfile[handle].followers &&
			profiles.byProfile[handle].following
		)
	) {
		return <Loading />
	}

	const handleHandleClick = () => {
		history.push(`${paths.profile}/${handle}`)
	}

	const fetchMoreRowsFn = ({ params }) => {
		if (body === 'followers') {
			console.log('fetching followers')
			getFollowersForProfile({ handle, params })
		} else {
			console.log('fetching following')
			getFollowingForProfile({ handle, params })
		}
	}

	const ProfileNav = () => {
		return (
			<div className="localNav">
				<div
					className={body === 'followers' ? 'navItem active' : 'navItem'}
					onClick={() => setBody('followers')}
				>
					<div>followers</div>
				</div>
				<div
					className={body === 'following' ? 'navItem active' : 'navItem'}
					onClick={() => setBody('following')}
				>
					<div>following</div>
				</div>
			</div>
		)
	}

	return (
		<div className="followPage">
			{profiles.byHandle[handle] && profiles.byHandle[handle].full_name ? (
				<div className="fullName">{profiles.byHandle[handle].full_name}</div>
			) : (
				<></>
			)}
			{profiles.byHandle[handle] && profiles.byHandle[handle].handle ? (
				<div className="handleWrapper">
					<div className="handle" onClick={handleHandleClick}>
						{profiles.byHandle[handle].handle}
					</div>
				</div>
			) : (
				<></>
			)}
			<ProfileNav />
			<ProfileList
				authHandle={authHandle}
				profiles={profiles}
				paginationObject={profiles.byProfile[handle][body]}
				emptyListMessage="no followers"
				fetchMoreRowsFn={fetchMoreRowsFn}
			/>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getFollowersForProfile),
	withRPCRedux(RPC_IDS.getFollowingForProfile),
]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	profiles: state.profiles,
	ui: state.ui,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(FollowsPage)
