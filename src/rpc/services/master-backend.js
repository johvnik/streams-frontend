const MASTER_API_BASEPATH = 'http://localhost:8000/api'

const LOGIN_ENDPOINT = 'login'
const REFRESH_LOGIN_ENDPOINT = 'refreshLogin'

const masterBackend = {
	name: 'master backend',
	basePath: MASTER_API_BASEPATH,
	loginEndpoint: LOGIN_ENDPOINT,
	refreshLoginEndpoint: REFRESH_LOGIN_ENDPOINT,
	endpoints: [LOGIN_ENDPOINT, REFRESH_LOGIN_ENDPOINT, 'getPosts'],
}

export default masterBackend
