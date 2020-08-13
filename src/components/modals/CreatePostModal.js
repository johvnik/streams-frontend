import React, { useEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

const CreatePostModal = ({ cancelFn }) => {
	// const dispatch = useDispatch()

	// useEffect(() => {}, [])

	const handleModalClick = e => {
		e.stopPropagation()
	}

	return (
		<div className="modalWrapper" onClick={cancelFn}>
			<div className="modal createPostModal" onClick={handleModalClick}>
				<div className="modalHeading">{'create post'}</div>
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
