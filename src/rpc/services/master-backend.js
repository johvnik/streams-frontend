const MASTER_API_BASEPATH = 'http://localhost:8000/api'

const masterBackend = {
	name: 'master backend',
	basePath: MASTER_API_BASEPATH,
	endpoints: ['login', 'refreshLogin', 'getPosts'],
}

export default masterBackend
