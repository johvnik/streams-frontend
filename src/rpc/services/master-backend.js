const MASTER_API_BASEPATH = 'http://localhost:8000/api'

const LOGIN_ENDPOINT = 'login'
const REFRESH_ENDPOINT = 'refreshLogin'
const CREATE_ACCOUNT_ENDPOINT = 'createAccount'

const safeEndpoints = [
	LOGIN_ENDPOINT,
	REFRESH_ENDPOINT,
	CREATE_ACCOUNT_ENDPOINT,
	'getProfile',
	'getStream',
	'getPostsForProfile',
	'getFollowersForProfile',
	'getFollowingForProfile',
	'getStreamsForProfile',
	'getFollowersForStream',
	'getFollowingForStream',
	'searchProfiles',
	'getPostsForStream',
	'getSignedUrl',
	'getExplore',
	'getPost',
	'getCommentsForPost',
	'getNewCommentsForPost',
	'getNewCommentsForPostCount',
]

const masterBackend = {
	name: 'master backend',
	basePath: MASTER_API_BASEPATH,
	safeEndpoints,
	createAccountEndpoint: CREATE_ACCOUNT_ENDPOINT,
	loginEndpoint: LOGIN_ENDPOINT,
	refreshEndpoint: REFRESH_ENDPOINT,
	endpoints: [
		...safeEndpoints,
		// 'getStreams',
		// 'getMyProfile',
		// 'getPostLikesForProfile',
		// 'getCommentLikesForProfile',
		// 'getFollowersForMe',
		// 'getFollowingForMe',
		'unfollowStream',
		'unfollowProfile',
		'unfollowProfileFromProfile',
		'followStream',
		'followProfile',
		'getAccount',
		'updateAccount',
		'deleteAccount',
		'createStream',
		'updateStream',
		'deleteStream',
		'createPostComment',
		'likePost',
		'unlikePost',
		'getAllPostLikes',
	],
}

export default masterBackend
