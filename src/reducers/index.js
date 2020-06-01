import { combineReducers } from 'redux'
import auth from './auth'
import streams from './streams'
import posts from './posts'

export default combineReducers({
	auth,
	streams,
	posts,
})
