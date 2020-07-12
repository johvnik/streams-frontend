import { combineReducers } from 'redux'
import auth from './auth'
import streams from './streams'
import posts from './posts'
import profiles from './profiles'
import likes from './likes'

export default combineReducers({
	auth,
	streams,
	posts,
	profiles,
	likes,
})
