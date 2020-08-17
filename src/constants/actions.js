import { watchedEnum } from './util'

const _ACTION_IDS = {
	resetStore: 'resetStore',
	didPerformInitialLoad: 'didPerformInitialLoad',
	openLoginModal: 'openLoginModal',
	closeLoginModal: 'closeLoginModal',
}

const ACTION_IDS = watchedEnum(_ACTION_IDS, 'action')

export default ACTION_IDS
