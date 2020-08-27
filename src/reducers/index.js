import { combineReducers } from 'redux'
import auth from './auth'
import accounts from './accounts'
import comments from './comments'
import streams from './streams'
import posts from './posts'
import profiles from './profiles'
import likes from './likes'
import ui from './ui'

export default combineReducers({
	auth,
	accounts,
	comments,
	streams,
	posts,
	profiles,
	likes,
	ui,
})
