import React, { useState, seEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

import Loading from '../utils/Loading'
import CancelBtn from '../buttons/CancelBtn'
import LoadingBtn from '../buttons/LoadingBtn'

const CreateStreamModal = ({ streams, createStream, cancelFn }) => {
	const [name, setName] = useState('')

	const handleModalClick = e => {
		e.stopPropagation()
	}

	const handleSubmit = () => {
		createStream({ name }).then(res => {
			if (!res.code) {
				cancelFn()
			}
		})
	}

	const canSave = () => name != ''

	return (
		<div className="modalWrapper" onClick={cancelFn}>
			<div className="modal editProfileModal" onClick={handleModalClick}>
				<div className="modalHeading">create stream</div>
				<div className="modalBody">
					<div className="formWrapper">
						<div className="form">
							<label>
								<div className="labelText">name</div>
								<input
									value={name}
									onChange={e => setName(e.target.value)}
									type="text"
									placeholder="stream name"
									name="full_name"
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
										value="create"
										onClick={handleSubmit}
										disabled={!canSave()}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.createStream)]

const mapStateToProps = state => ({
	streams: state.streams,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(CreateStreamModal)
