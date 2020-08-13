import React, { useState, useEffect, useRef } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams, useHistory, Redirect } from 'fusion-plugin-react-router'

import { RPC_IDS } from '../constants/rpc'
import paths from '../constants/paths'

import EditIcon from '../components/icons/EditIcon'
import PostsIcon from '../components/icons/PostsIcon'
import StreamListIcon from '../components/icons/StreamListIcon'
import Loading from '../components/utils/Loading'
import MyProfile from './myProfile'
import UnfollowBtn from '../components/buttons/UnfollowBtn'
import ProfileFollowBtn from '../components/buttons/ProfileFollowBtn'
import ProfilePostsGrid from '../components/ProfilePostsGrid'

import StreamList from '../components/StreamList'
import FollowModal from '../components/modals/FollowModal'

const ProfilePage = ({
	authProfileId,
	profiles,
	getProfile,
	posts,
	getStreamsForProfile,
	unfollowProfileFromProfile,
	getPostsForProfile,
}) => {
	let { profileId } = useParams()
	const history = useHistory()
	const bottomRef = useRef(null)

	const [body, setBody] = useState('posts')
	const [followModal, setFollowModal] = useState(0)

	useEffect(() => {
		getProfile({ profileId })
		getStreamsForProfile({ profileId })
		getPostsForProfile({ profileId })
	}, [])

	const loading = () => {
		if (
			profiles.byId[profileId] &&
			Object.keys(profiles.byId[profileId]).length
		) {
			return false
		}
		return true
	}

	if (loading()) {
		return <Loading />
	}

	const handlePostsClick = () => {
		setBody('posts')
		// window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop })
		bottomRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	const handleFollowersClick = () => {
		history.push(`${paths.profile}/${profileId}/followers`)
	}

	const handleFollowingClick = () => {
		history.push(`${paths.profile}/${profileId}/following`)
	}

	const Body = () => {
		if (body === 'posts') {
			return (
				<ProfilePostsGrid
					posts={posts}
					profiles={profiles}
					currentProfile={profileId}
					isLoading={isLoadingPosts()}
				/>
			)
		}
		if (body === 'streams') {
			return <ProfileStreams currentProfile={profileId} />
			// return 'streams'
		}
	}

	if (profileId == authProfileId) {
		return <Redirect to={`${paths.profile}`} />
	}

	const closeModal = () => {
		setFollowModal(0)
	}

	const isLoadingPosts = () => {
		if (posts.byAccountId[profileId]) {
			return false
		}
		return true
	}

	const UnfollowBtnCondRender = ({ id }) => {
		if (
			profiles.myId &&
			profiles.following.byId[profiles.myId] &&
			profiles.myId != id &&
			profiles.following.byId[profiles.myId][id]
		) {
			return (
				<UnfollowBtn
					profileId={id}
					myProfileId={profiles.myId}
					unfollowFn={unfollowProfileFromProfile}
				/>
			)
		}
		return <></>
	}

	const ProfileFollowBtnCondRender = ({ openModalFn, profileId }) => {
		if (profiles.myId && profileId != profiles.myId) {
			return <ProfileFollowBtn openModalFn={openModalFn} />
		}
		return <></>
	}

	return (
		<div className="profilePageWrapper">
			{followModal ? (
				<FollowModal
					myProfileId={authProfileId}
					cancelFn={closeFollowModal}
					profileId={followModal}
					followProfile={followProfile}
				/>
			) : (
				<></>
			)}
			<div className="profilePage">
				<div className="profileTop">
					<div className="profileInfoTop">
						<div className="profilePhoto">
							<img src={profiles.byId[profileId].image} />
						</div>
						<div className="profileTopRight">
							{profiles.byId[profileId].full_name && (
								<div className="fullName">
									{profiles.byId[profileId].full_name}
								</div>
							)}
							<div
								className={
									profiles.byId[profileId].full_name
										? 'handle'
										: 'handle noName'
								}
							>
								{profiles.byId[profileId].handle}
							</div>
							<div className="profileNumbersWrapper">
								<div
									className={
										profiles.byId[profileId].full_name
											? 'profileNumbers'
											: 'profileNumbers centered'
									}
								>
									<div className="profileNumber" onClick={handlePostsClick}>
										<div className="postCount">
											{profiles.byId[profileId].post_count}
										</div>
										<div className="postText">Posts</div>
									</div>
									<div className="profileNumber" onClick={handleFollowersClick}>
										<div className="followersCount">
											{profiles.byId[profileId].follower_count}
										</div>
										<div className="followersText">Followers</div>
									</div>
									<div className="profileNumber" onClick={handleFollowingClick}>
										<div className="followingCount">
											{profiles.byId[profileId].following_count}
										</div>
										<div className="followingText">Following</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="profileInfoBio">{profiles.byId[profileId].bio}</div>
					<div className="profileButtons">
						<ProfileFollowBtnCondRender
							profileId={profileId}
							openModalFn={() => setFollowModal(profileId)}
						/>
						<UnfollowBtnCondRender id={profileId} />
					</div>
				</div>
				<div className="profileBottom" ref={bottomRef}>
					<div className="profileNav">
						<div
							className={body === 'streams' ? 'navItem active' : 'navItem'}
							onClick={() => setBody('streams')}
						>
							<StreamListIcon />
						</div>
						<div
							className={body === 'posts' ? 'navItem active' : 'navItem'}
							onClick={() => setBody('posts')}
						>
							<PostsIcon />
						</div>
					</div>
					<div className="profileBody">
						<Body />
					</div>
				</div>
			</div>
		</div>
	)
}

const ProfileStreams = ({ currentProfile }) => {
	return (
		<div className="profileStreams">
			<StreamList currentProfile={currentProfile} />
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getProfile),
	withRPCRedux(RPC_IDS.getStreamsForProfile),
	withRPCRedux(RPC_IDS.unfollowProfileFromProfile),
	withRPCRedux(RPC_IDS.getPostsForProfile),
]

const mapStateToProps = state => ({
	authProfileId: state.auth.authProfileId,
	posts: state.posts,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(ProfilePage)
