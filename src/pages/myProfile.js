import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useParams } from 'fusion-plugin-react-router'
import InfiniteScroll from 'react-infinite-scroll-component'

import { RPC_IDS } from '../constants/rpc'

import EditIcon from '../components/icons/EditIcon'
import Loading from '../components/utils/Loading'

const MyProfilePage = ({ profiles, getMyProfile }) => {
	useEffect(() => {
		getMyProfile()
	}, [])

	if (!(profiles.myId && Object.keys(profiles.byId[profiles.myId]).length)) {
		return <Loading />
	}

	return (
		<div className="profilePageWrapper">
			<div className="profilePage">
				<div className="profileTop">
					<div className="profileInfoTop">
						<div className="profilePhoto">
							<img src={profiles.byId[profiles.myId].image} />
						</div>
						<div className="profileTopRight">
							{profiles.byId[profiles.myId].full_name && (
								<div className="fullName">Llamo Agua</div>
							)}
							<div
								className={
									profiles.byId[profiles.myId].full_name
										? 'handle'
										: 'handle noName'
								}
							>
								{profiles.byId[profiles.myId].handle}
							</div>
							<div
								className={
									profiles.byId[profiles.myId].full_name
										? 'profileNumbers'
										: 'profileNumbers centered'
								}
							>
								<div className="profileNumber">
									<div className="postCount">
										{profiles.byId[profiles.myId].posts}
									</div>
									<div className="postText">Posts</div>
								</div>
								<div className="profileNumber">
									<div className="followersCount">1000</div>
									<div className="followersText">Followers</div>
								</div>
								<div className="profileNumber">
									<div className="followingCount">100</div>
									<div className="followingText">Following</div>
								</div>
							</div>
							{/* <div className="editButton"> */}
							<div className="editButton">
								<EditIcon />
							</div>
							{/* </div> */}
						</div>
					</div>
					<div className="profileInfoBio">
						{profiles.byId[profiles.myId].bio}
					</div>
					<div className="profileButtons">
						{/* <button>Edit Profile</button> */}
					</div>
					{/* <div className="profileDetails">name and stuch</div> */}
				</div>
				<div className="profileBottom">photos and such</div>
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getMyProfile),
	withRPCRedux(RPC_IDS.getPostsForAccount),
]

const mapStateToProps = state => ({
	posts: state.posts,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(MyProfilePage)
