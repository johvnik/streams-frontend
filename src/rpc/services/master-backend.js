const MASTER_API_BASEPATH = 'http://localhost:8000/api'

const LOGIN_ENDPOINT = 'login'
const REFRESH_LOGIN_ENDPOINT = 'refreshLogin'
// const VERIFY_LOGIN_ENDPOINT = 'verifyLogin'
const CREATE_ACCOUNT_ENDPOINT = 'createAccount'

const safeEndpoints = [
	CREATE_ACCOUNT_ENDPOINT,
	LOGIN_ENDPOINT,
	'getProfile',
	'getPostsForProfile',
	'getFollowersForProfile',
	'getFollowingForProfile',
	'getStreamsForProfile',
]

const masterBackend = {
	name: 'master backend',
	basePath: MASTER_API_BASEPATH,
	safeEndpoints,
	createAccountEndpoint: CREATE_ACCOUNT_ENDPOINT,
	loginEndpoint: LOGIN_ENDPOINT,
	refreshLoginEndpoint: REFRESH_LOGIN_ENDPOINT,
	// verifyLoginEndpoint: VERIFY_LOGIN_ENDPOINT,
	endpoints: [
		...safeEndpoints,
		REFRESH_LOGIN_ENDPOINT,
		// VERIFY_LOGIN_ENDPOINT,
		'getStreams',
		'getPostsForStream',
		'getMyProfile',
		'getPostLikesForProfile',
		'getCommentLikesForProfile',
		'likePost',
		'unlikePost',
		'searchProfiles',
		'getFollowersForMe',
		'getFollowingForMe',
		'unfollowStream',
		'unfollowProfile',
		'unfollowProfileFromProfile',
		'followStream',
		'followProfile',
	],
}

export default masterBackend
