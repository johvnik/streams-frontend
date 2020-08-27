import { watchedEnum } from './util'

const _ACTION_IDS = {
	resetStore: 'resetStore',
	clear401Error: 'clear401Error',
	setFollows: 'setFollows',
	clearSearchResults: 'clearSearchResults',
	setHomeStream: 'setHomeStream',
	didPerformInitialLoad: 'didPerformInitialLoad',
	openLoginModal: 'openLoginModal',
	closeLoginModal: 'closeLoginModal',
	openPostModal: 'openPostModal',
	openFollowModal: 'openFollowModal',
	openEditProfileModal: 'openEditProfileModal',
	openEditStreamModal: 'openEditStreamModal',
	openCreatePostModal: 'openCreatePostModal',
	openCreateStreamModal: 'openCreateStreamModal',
	closeModals: 'closeModals',
}

const ACTION_IDS = watchedEnum(_ACTION_IDS, 'action')

export default ACTION_IDS
