import ls from 'local-storage'

import ACTION_IDS from '../constants/actions'

export const resetStore = () => ({
	type: ACTION_IDS.resetStore,
	payload: null,
})

export const setFollows = follows => {
	return {
		type: ACTION_IDS.setFollows,
		payload: follows,
	}
}

export const clear401Error = () => {
	return {
		type: ACTION_IDS.clear401Error,
		payload: null,
	}
}

export const clearSearchResults = () => ({
	type: ACTION_IDS.clearSearchResults,
	payload: null,
})

export const setHomeStream = (streamId, streamName) => {
	ls.set('homeStream', streamId)
	streamName && ls.set('homeStreamName', streamName)
	return {
		type: ACTION_IDS.setHomeStream,
		payload: streamId,
	}
}

export const didPerformInitialLoad = () => ({
	type: ACTION_IDS.didPerformInitialLoad,
	payload: null,
})

// MODALS

export const openLoginModal = () => ({
	type: ACTION_IDS.openLoginModal,
	payload: null,
})

export const closeLoginModal = () => ({
	type: ACTION_IDS.closeLoginModal,
	payload: null,
})

export const openPostModal = postId => ({
	type: ACTION_IDS.openPostModal,
	payload: postId,
})

export const openFollowModal = handle => ({
	type: ACTION_IDS.openFollowModal,
	payload: handle,
})

export const openEditProfileModal = () => ({
	type: ACTION_IDS.openEditProfileModal,
	payload: null,
})

export const openEditStreamModal = streamId => ({
	type: ACTION_IDS.openEditStreamModal,
	payload: streamId,
})

export const openCreatePostModal = () => ({
	type: ACTION_IDS.openCreatePostModal,
	payload: null,
})

export const openCreateStreamModal = () => ({
	type: ACTION_IDS.openCreateStreamModal,
	payload: null,
})

export const closeModals = handle => ({
	type: ACTION_IDS.closeModals,
	payload: handle,
})
