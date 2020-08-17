import React, { useState, seEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { useHistory } from 'fusion-plugin-react-router'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

import Loading from '../utils/Loading'
import CancelBtn from '../buttons/CancelBtn'
import DeleteBtn from '../buttons/DeleteBtn'
import LoadingBtn from '../buttons/LoadingBtn'
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal'

const EditStreamModal = ({
	authProfileId,
	streams,
	updateStream,
	deleteStream,
	streamId,
	cancelFn,
}) => {
	const history = useHistory()
	const [name, setName] = useState(streams.byId[streamId].name)
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)

	const handleModalClick = e => {
		e.stopPropagation()
	}

	const handleDelete = () => {
		deleteStream({ profileId: authProfileId, streamId })
		history.goBack()
	}

	const handleSubmit = () => {
		updateStream({ streamId, name })
	}

	const canSave = () => name != streams.byId[streamId].name

	return (
		<div className="modalWrapper" onClick={cancelFn}>
			<div className="modal editProfileModal" onClick={handleModalClick}>
				<div className="modalHeading">edit stream</div>
				<div className="modalBody">
					{showConfirmDeleteModal ? (
						<ConfirmDeleteModal cancelFn={handleDelete} />
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
									className={name == streams.byId[streamId].name ? 'green' : ''}
								/>
							</label>
							<br />
							<div className="buttons">
								<CancelBtn cancelFn={cancelFn} />
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
									openConfirmModalFn={() => setShowConfirmDeleteModal(true)}
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
	authProfileId: state.auth.authProfileId,
	streams: state.streams,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(EditStreamModal)
