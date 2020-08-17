import React, { useState, useEffect, useRef } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams, useHistory, Redirect } from 'fusion-plugin-react-router'

import { RPC_IDS } from '../constants/rpc'
import paths from '../constants/paths'

import { ImagePreview } from '../components/utils/ImagePreview'
import PlusIcon from '../components/icons/PlusIcon'
import EditIcon from '../components/icons/EditIcon'
import EditProfileBtn from '../components/buttons/EditProfileBtn'
import UnfollowBtn from '../components/buttons/UnfollowBtn'
import EditProfileModal from '../components/modals/EditProfileModal'
import CreatePostModal from '../components/modals/CreatePostModal'
import CreateStreamModal from '../components/modals/CreateStreamModal'
import FollowModal from '../components/modals/FollowModal'

import PostsIcon from '../components/icons/PostsIcon'
import StreamListIcon from '../components/icons/StreamListIcon'
import Loading from '../components/utils/Loading'
import FollowBtn from '../components/buttons/FollowBtn'
import ProfilePostsGrid from '../components/ProfilePostsGrid'
import StreamList from '../components/StreamList'

const ProfilePage = ({
	authHandle,
	posts,
	profiles,
	getProfile,
	followProfile,
	getPostsForProfile,
	getStreamsForProfile,
	// unfollowProfileFromProfile,
}) => {
	let { handle } = useParams()
	const history = useHistory()
	const bottomRef = useRef(null)

	const myProfile = handle === authHandle
	const isLoadingPosts = !posts.byProfile[handle]
	const isLoadingProfile = !(
		profiles.byHandle[handle] && Object.keys(profiles.byHandle[handle]).length
	)

	const [body, setBody] = useState(myProfile ? 'posts' : 'streams')
	const [followModal, setFollowModal] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [createPostModal, setCreatePostModal] = useState(false)
	const [createStreamModal, setCreateStreamModal] = useState(false)

	useEffect(() => {
		getProfile({ handle })
		getStreamsForProfile({ handle })
		getPostsForProfile({ handle })
	}, [])

	const handlePostsClick = () => {
		setBody('posts')
		bottomRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	const handleFollowersClick = () => {
		history.push(`${paths.profile}/${handle}/followers`)
	}

	const handleFollowingClick = () => {
		history.push(`${paths.profile}/${handle}/following`)
	}

	const openProfileEditModal = e => {
		e.stopPropagation()
		closeModals()
		setEditModal(true)
	}

	const openCreatePostModal = e => {
		e.stopPropagation()
		closeModals()
		setCreatePostModal(true)
	}

	const openCreateStreamModal = e => {
		e.stopPropagation()
		closeModals()
		setCreateStreamModal(true)
	}

	const openFollowModal = (e, profileId) => {
		e.stopPropagation()
		closeModals()
		setFollowModal(profileId)
	}

	const closeModals = () => {
		setEditModal(false)
		setCreatePostModal(false)
		setCreateStreamModal(false)
		setFollowModal(false)
	}

	const AddPostButton = ({ openCreatePostModal }) => {
		return (
			<div className="addButton" onClick={openCreatePostModal}>
				<PlusIcon />
				<div className="addButtonText">post</div>
			</div>
		)
	}

	const AddStreamButton = ({ openModal }) => {
		return (
			<div className="addButton" onClick={openModal}>
				<PlusIcon />
				<div className="addButtonText">stream</div>
			</div>
		)
	}

	const Body = () => {
		if (body === 'posts') {
			return (
				<ProfilePostsGrid
					posts={posts}
					profiles={profiles}
					handle={handle}
					isLoading={isLoadingPosts}
				/>
			)
		}
		if (body === 'streams') {
			return (
				<div className="profileStreams">
					<StreamList handle={handle} />
				</div>
			)
		}
	}

	if (isLoadingProfile) {
		return <Loading />
	}

	return (
		<div className="profilePageWrapper">
			<div className="profilePage">
				{editModal && <EditProfileModal cancelFn={closeModals} />}
				{createPostModal && <CreatePostModal cancelFn={closeModals} />}
				{createStreamModal && <CreateStreamModal cancelFn={closeModals} />}
				{followModal ? (
					<FollowModal
						myHandle={authHandle}
						cancelFn={closeModals}
						handle={followModal}
						followProfile={followProfile}
					/>
				) : (
					<></>
				)}
				<div className="profileTop">
					<div className="profileInfoTop">
						<div className="profilePhoto">
							<ImagePreview s3ObjectKey={profiles.byHandle[handle].image} />
						</div>
						<div className="profileTopRight">
							{profiles.byHandle[handle].full_name && (
								<div className="fullName">
									{profiles.byHandle[handle].full_name}
								</div>
							)}
							<div
								className={
									profiles.byHandle[handle].full_name
										? 'handle'
										: 'handle noName'
								}
							>
								{profiles.byHandle[handle].handle}
							</div>
							<div className="profileNumbersWrapper">
								<div
									className={
										profiles.byHandle[handle].full_name
											? 'profileNumbers'
											: 'profileNumbers centered'
									}
								>
									<div className="profileNumber" onClick={handlePostsClick}>
										<div className="postCount">
											{profiles.byHandle[handle].post_count}
										</div>
										<div className="postText">Posts</div>
									</div>
									<div className="profileNumber" onClick={handleFollowersClick}>
										<div className="followersCount">
											{profiles.byHandle[handle].follower_count}
										</div>
										<div className="followersText">Followers</div>
									</div>
									<div className="profileNumber" onClick={handleFollowingClick}>
										<div className="followingCount">
											{profiles.byHandle[handle].following_count}
										</div>
										<div className="followingText">Following</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="profileInfoBio multiline">
						{profiles.byHandle[handle].bio}
					</div>
					<div className="profileButtons">
						<FollowBtn
							handle={handle}
							authHandle={authHandle}
							openFollowModalFn={e => openFollowModal(e, handle)}
						/>
						<UnfollowBtn handle={handle} authHandle={authHandle} unfollowFn />
						<EditProfileBtn
							handle={handle}
							authHandle={authHandle}
							openProfileEditModalFn={openProfileEditModal}
						/>
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
					{myProfile && (
						<div className="profileBody myProfileBody">
							<div className="addHeader">
								{body == 'streams' ? (
									<AddStreamButton openModal={openCreateStreamModal} />
								) : (
									<AddPostButton openCreatePostModal={openCreatePostModal} />
								)}
							</div>
						</div>
					)}
					<div className="profileBody">
						<Body />
					</div>
				</div>
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getProfile),
	withRPCRedux(RPC_IDS.followProfile),
	withRPCRedux(RPC_IDS.getPostsForProfile),
	withRPCRedux(RPC_IDS.getStreamsForProfile),
	// withRPCRedux(RPC_IDS.unfollowProfileFromProfile),
]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	posts: state.posts,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(ProfilePage)
