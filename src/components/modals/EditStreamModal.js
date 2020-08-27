import React, { useState, seEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useHistory } from 'fusion-plugin-react-router'

import { closeModals } from '../../actions/actions'
import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

import Loading from '../utils/Loading'
import CancelBtn from '../buttons/CancelBtn'
import DeleteBtn from '../buttons/DeleteBtn'
import LoadingBtn from '../buttons/LoadingBtn'
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal'

const EditStreamModal = ({
	authHandle,
	streams,
	updateStream,
	deleteStream,
	streamId,
}) => {
	const history = useHistory()
	const dispatch = useDispatch()

	if (!streams.byId[streamId]) {
		console.log(streamId)
		return (
			<div className="modalWrapper" onClick={() => dispatch(closeModals())}>
				<div
					className="modal editProfileModal"
					onClick={e => e.stopPropagation()}
				>
					<div className="modalHeading">edit stream</div>
					<div className="modalBody">
						<Loading />
					</div>
				</div>
			</div>
		)
	}

	const [name, setName] = useState(streams.byId[streamId].name)
	const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)

	const handleDelete = () => {
		deleteStream({ handle: authHandle, streamId })
		dispatch(closeModals())
		history.goBack()
	}

	const handleSubmit = () => {
		updateStream({ streamId, name })
	}

	const canSave = () => name != streams.byId[streamId].name

	return (
		<div className="modalWrapper" onClick={() => dispatch(closeModals())}>
			<div
				className="modal editProfileModal"
				onClick={e => e.stopPropagation()}
			>
				<div className="modalHeading">edit stream</div>
				<div className="modalBody">
					{confirmDeleteModal ? (
						<ConfirmDeleteModal
							cancelFn={() => setConfirmDeleteModal(false)}
							deleteFn={handleDelete}
						/>
					) : (
						<></>
					)}
					<div className="formWrapper">
						<div className="form">
							<label>
								<div className="labelText">name</div>
								<input
									value={name}
									onChange={e => setName(e.target.value)}
									type="text"
									placeholder="you must enter a name"
									name="full_name"
									className={name != streams.byId[streamId].name ? 'blue' : ''}
								/>
							</label>
							<br />
							<div className="buttons">
								<CancelBtn cancelFn={() => dispatch(closeModals())} />
								{streams.isSaving ? (
									<LoadingBtn />
								) : (
									<input
										className={
											canSave()
												? 'button submitBtn'
												: 'button submitBtn inactiveBtn'
										}
										type="submit"
										value="save"
										onClick={handleSubmit}
										disabled={!canSave()}
									/>
								)}
								<DeleteBtn
									openConfirmModalFn={() => setConfirmDeleteModal(true)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.updateStream),
	withRPCRedux(RPC_IDS.deleteStream),
]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	streams: state.streams,
	streamId: state.ui.modals.editStreamModal,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(EditStreamModal)
