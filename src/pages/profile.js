import React, { useState, useEffect, useRef } from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useParams, useHistory, Redirect } from 'fusion-plugin-react-router'

import { RPC_IDS } from '../constants/rpc'
import paths from '../constants/paths'

import ImagePreview from '../components/utils/ImagePreview'
import PlusIcon from '../components/icons/PlusIcon'
import EditIcon from '../components/icons/EditIcon'
import EditProfileBtn from '../components/buttons/EditProfileBtn'
import UnfollowBtn from '../components/buttons/UnfollowBtn'
import CreatePostBtn from '../components/buttons/CreatePostBtn'
import CreateStreamBtn from '../components/buttons/CreateStreamBtn'

import PostsIcon from '../components/icons/PostsIcon'
import StreamListIcon from '../components/icons/StreamListIcon'
import Loading from '../components/utils/Loading'
import FollowBtn from '../components/buttons/FollowBtn'
import PostGrid from '../components/PostGrid'
import StreamList from '../components/StreamList'
import { setFollows, openLoginModal } from '../actions/actions'

const ProfilePage = ({
	authHandle,
	posts,
	streams,
	profiles,
	getProfile,
	getPostsForProfile,
	getStreamsForProfile,
	// unfollowProfileFromProfile,
}) => {
	let { handle } = useParams()

	useEffect(() => {
		getProfile({ handle })
		// getPostsForProfile({ handle })
		getStreamsForProfile({ handle })
	}, [handle, authHandle])

	const history = useHistory()
	const dispatch = useDispatch()
	const bottomRef = useRef(null)

	const myProfile = handle === authHandle
	const isLoadingPosts = !posts.byProfile[handle]
	const isLoadingProfile = !(
		profiles.byHandle[handle] && Object.keys(profiles.byHandle[handle]).length
	)

	const [body, setBody] = useState(myProfile ? 'streams' : 'posts')

	const handlePostsClick = () => {
		setBody('posts')
		setTimeout(() => {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' })
		}, 300)
	}

	const handleFollowersClick = () => {
		if (authHandle) {
			dispatch(setFollows('followers'))
			history.push(`${paths.profile}/${handle}${paths.follows}`)
		} else {
			dispatch(openLoginModal())
		}
	}

	const handleFollowingClick = () => {
		if (authHandle) {
			dispatch(setFollows('following'))
			history.push(`${paths.profile}/${handle}${paths.follows}`)
		} else {
			dispatch(openLoginModal())
		}
	}

	const fetchMoreRowsFn = ({ params }) => {
		console.log('fetching post grid posts...')
		console.log(`handle: ${handle}`)
		console.log(`params: ${params}`)
		getPostsForProfile({ handle, params })
	}

	const Body = () => {
		if (body === 'posts') {
			const paginationObject = posts.byProfile[handle]

			// if (!(paginationObject && 'count' in paginationObject)) {
			// 	return <Loading />
			// }
			return <div className="emptyMessageColor">posts go here</div>

			return (
				<PostGrid
					authHandle={authHandle}
					posts={posts}
					paginationObject={paginationObject}
					emptyListMessage="no posts"
					fetchMoreRowsFn={fetchMoreRowsFn}
				/>
			)
		}
		if (body === 'streams') {
			return <StreamList handle={handle} />
		}
	}

	if (isLoadingProfile) {
		return <Loading />
	}

	return (
		<div className="profilePage">
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
								profiles.byHandle[handle].full_name ? 'handle' : 'handle noName'
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
					<FollowBtn handle={handle} authHandle={authHandle} />
					<UnfollowBtn handle={handle} authHandle={authHandle} unfollowFn />
					{handle === authHandle ? <EditProfileBtn /> : <></>}
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
					// <div className="profileBody myProfileBody">
					<div className="addHeader">
						{body == 'streams' ? <CreateStreamBtn /> : <CreatePostBtn />}
					</div>
					// </div>
				)}
				<div className="profileBody">
					<Body />
				</div>
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.getProfile),
	withRPCRedux(RPC_IDS.getPostsForProfile),
	withRPCRedux(RPC_IDS.getStreamsForProfile),
	// withRPCRedux(RPC_IDS.unfollowProfileFromProfile),
]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	posts: state.posts,
	streams: state.streams,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(ProfilePage)
