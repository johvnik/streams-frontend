import ACTION_IDS from '../constants/actions'

export const setCurrentStream = ({ stream }) => ({
	type: ACTION_IDS.setCurrentStream,
	payload: stream,
})
