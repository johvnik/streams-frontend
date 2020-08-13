import { watchedEnum } from './util'

const _ACTION_IDS = {
	resetStore: 'resetStore',
	didPerformInitialLoad: 'didPerformInitialLoad',
	setCurrentStream: 'setCurrentStream',
	setCurrentProfile: 'setCurrentProfile',
}

const ACTION_IDS = watchedEnum(_ACTION_IDS, 'action')

export default ACTION_IDS
