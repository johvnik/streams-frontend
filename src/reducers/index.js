import { combineReducers } from 'redux'
import posts from './posts'
import login from './login'

export default combineReducers({
	posts,
	login,
})
