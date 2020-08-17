import ACTION_IDS from '../constants/actions'

export const resetStore = () => ({
	type: ACTION_IDS.resetStore,
	payload: null,
})

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
