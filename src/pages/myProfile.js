import React, { useState, useEffect, useRef } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
	Route,
	Switch,
	useParams,
	useHistory,
	Redirect,
	NavLink,
} from 'fusion-plugin-react-router'
// import { useParams } from 'react-router'

import { RPC_IDS } from '../constants/rpc'
import paths from '../constants/paths'

import PostsIcon from '../components/icons/PostsIcon'
import PlusIcon from '../components/icons/PlusIcon'
import StreamListIcon from '../components/icons/StreamListIcon'
import EditIcon from '../components/icons/EditIcon'
import Loading from '../components/utils/Loading'
import EditProfileModal from '../components/modals/EditProfileModal'
import CreatePostModal from '../components/modals/CreatePostModal'
import ProfilePostsGrid from '../components/ProfilePostsGrid'

import StreamList from '../components/StreamList'
import profiles from '../reducers/profiles'
import EditProfileBtn from '../components/buttons/EditProfileBtn'

const MyProfilePage = ({
	authProfileId,
	profiles,
	getProfile,
	posts,
	getStreamsForProfile,
	getPostsForProfile,
}) => {
	const history = useHistory()
	const params = useParams()
	const bottomRef = useRef(null)

	const [body, setBody] = useState('streams')
	const [editModal, setEditModal] = useState(false)
	const [createPostModal, setCreatePostModal] = useState(false)

	useEffect(() => {
		getProfile({ profileId: authProfileId })
		getStreamsForProfile({ profileId: authProfileId })
		getPostsForProfile({ profileId: authProfileId })
	}, [])

	if (!(authProfileId && Object.keys(profiles.byId[authProfileId]).length)) {
		return <Loading />
	}

	const handlePostsClick = () => {
		setBody('posts')
		bottomRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	const handleFollowersClick = () => {
		history.push(`${paths.profile}/followers`)
	}

	const handleFollowingClick = () => {
		history.push(`${paths.profile}/following`)
	}

	const isLoadingPosts = () => {
		if (posts.byAccountId[authProfileId]) {
			return false
		}
		return true
	}

	const Body = () => {
		if (body === 'posts') {
			return (
				<ProfilePostsGrid
					posts={posts}
					profiles={profiles}
					currentProfile={authProfileId}
					isLoading={isLoadingPosts()}
				/>
			)
		}
		if (body === 'streams') {
			return <ProfileStreams currentProfile={authProfileId} />
		}
	}

	const openProfileEditModal = e => {
		e.stopPropagation()
		setCreatePostModal(false)
		setEditModal(true)
	}

	const closeEditModal = () => {
		setEditModal(false)
	}

	const openCreatePostModal = e => {
		e.stopPropagation()
		setEditModal(false)
		setCreatePostModal(true)
	}

	const closeCreatePostModal = () => {
		setCreatePostModal(false)
	}

	return (
		<div className="profilePageWrapper">
			<div className="profilePage">
				{editModal && <EditProfileModal cancelFn={closeEditModal} />}
				{createPostModal && <CreatePostModal cancelFn={closeCreatePostModal} />}
				<div className="profileTop">
					<div className="profileInfoTop">
						<div className="profilePhoto">
							<img src={profiles.byId[authProfileId].image} />
						</div>
						<div className="profileTopRight">
							{profiles.byId[authProfileId].full_name && (
								<div className="fullName">
									{profiles.byId[authProfileId].full_name}
								</div>
							)}
							<div
								className={
									profiles.byId[authProfileId].full_name
										? 'handle'
										: 'handle noName'
								}
							>
								{profiles.byId[authProfileId].handle}
							</div>
							<div className="profileNumbersWrapper">
								<div
									className={
										profiles.byId[authProfileId].full_name
											? 'profileNumbers'
											: 'profileNumbers centered'
									}
								>
									<div className="profileNumber" onClick={handlePostsClick}>
										<div className="postCount">
											{profiles.byId[authProfileId].post_count}
										</div>
										<div className="postText">Posts</div>
									</div>
									<div className="profileNumber" onClick={handleFollowersClick}>
										<div className="followerCount">
											{profiles.byId[authProfileId].follower_count}
										</div>
										<div className="followerText">Followers</div>
									</div>
									<div className="profileNumber" onClick={handleFollowingClick}>
										<div className="followingCount">
											{profiles.byId[authProfileId].following_count}
										</div>
										<div className="followingText">Following</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="profileInfoBio">
						{profiles.byId[authProfileId].bio}
					</div>
					<div className="profileButtons">
						<EditProfileBtn openProfileEditModalFn={openProfileEditModal} />
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
					<div className="profileBody myProfileBody">
						<div className="addHeader">
							{body == 'streams' ? (
								<AddStreamButton />
							) : (
								<AddPostButton openCreatePostModal={openCreatePostModal} />
							)}
						</div>
						<Body />
					</div>
				</div>
			</div>
		</div>
	)
}

const AddPostButton = ({ openCreatePostModal }) => {
	return (
		<div className="addButton" onClick={openCreatePostModal}>
			<PlusIcon />
			<div className="addButtonText">post</div>
		</div>
	)
}

const AddStreamButton = () => {
	return (
		<div className="addButton">
			<PlusIcon />
			<div className="addButtonText">stream</div>
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

export default hoc(MyProfilePage)
