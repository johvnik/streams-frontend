const MASTER_API_BASEPATH = 'http://localhost:8000/api'

const LOGIN_ENDPOINT = 'login'
const REFRESH_LOGIN_ENDPOINT = 'refreshLogin'
const VERIFY_LOGIN_ENDPOINT = 'verifyLogin'

const masterBackend = {
	name: 'master backend',
	basePath: MASTER_API_BASEPATH,
	loginEndpoint: LOGIN_ENDPOINT,
	refreshLoginEndpoint: REFRESH_LOGIN_ENDPOINT,
	verifyLoginEndpoint: VERIFY_LOGIN_ENDPOINT,
	endpoints: [
		LOGIN_ENDPOINT,
		REFRESH_LOGIN_ENDPOINT,
		VERIFY_LOGIN_ENDPOINT,
		'getMyOwnStreams',
		'getStreamsIFollow',
		'getPostsForStream',
	],
}

export default masterBackend
