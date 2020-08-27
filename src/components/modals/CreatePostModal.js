import React, { useEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { closeModals } from '../../actions/actions'
import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

const CreatePostModal = () => {
	const dispatch = useDispatch()

	return (
		<div className="modalWrapper" onClick={() => dispatch(closeModals())}>
			<div className="modal createPostModal" onClick={e => e.stopPropagation()}>
				<div className="modalHeading">create post</div>
				<div className="modalBody">
					<div className="uploadPhotoContainer"></div>
				</div>
			</div>
		</div>
	)
}

const rpcs = []

const mapStateToProps = state => ({})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(CreatePostModal)
