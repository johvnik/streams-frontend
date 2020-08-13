import ACTION_IDS from '../constants/actions'

export const resetStore = () => ({
	type: ACTION_IDS.resetStore,
	payload: null,
})

export const didPerformInitialLoad = () => ({
	type: ACTION_IDS.didPerformInitialLoad,
	payload: null,
})

export const setCurrentStream = ({ stream }) => ({
	type: ACTION_IDS.setCurrentStream,
	payload: stream,
})

export const setCurrentProfile = id => ({
	type: ACTION_IDS.setCurrentProfile,
	payload: id,
})
