import React, { useState } from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'
import { closeLoginModal } from '../../actions/actions'

import Loading from '../utils/Loading'
import CancelBtn from '../buttons/CancelBtn'
import LoadingBtn from '../buttons/LoadingBtn'
import accounts from '../../reducers/accounts'

const LoginModal = ({ auth, login }) => {
	const dispatch = useDispatch()

	const [handle, setHandle] = useState('')
	const [password, setPassword] = useState('')

	const canSave = () => !!handle && !!password

	const handleModalClick = e => {
		e.stopPropagation()
	}

	const handleSubmit = () => {
		login({ handle, password })
	}

	const cancelFn = () => {
		dispatch(closeLoginModal())
	}

	const isLoading = () => !auth.authHandle

	return (
		<div className="modalWrapper" onClick={cancelFn}>
			<div className="modal loginModal" onClick={handleModalClick}>
				<div className="modalHeading">login</div>
				<div className="modalBody">
					<div className="formWrapper">
						<div className="form">
							<label>
								<div className="labelText">handle</div>
								<input
									value={handle}
									onChange={e => setHandle(e.target.value)}
									type="text"
									placeholder=""
									name="handle"
								/>
							</label>
							<label>
								<div className="labelText">password</div>
								<input
									value={password}
									onChange={e => setPassword(e.target.value)}
									type="password"
									placeholder=""
									name="password"
								/>
							</label>
							<br />
							<div className="buttons">
								<CancelBtn cancelFn={cancelFn} />
								{isLoading() ? (
									<LoadingBtn />
								) : (
									<input
										className={
											canSave()
												? 'button submitBtn'
												: 'button submitBtn inactiveBtn'
										}
										type="submit"
										value="login"
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

const rpcs = [withRPCRedux(RPC_IDS.login)]

const mapStateToProps = state => ({
	auth: state.auth,
	accounts: state.accounts,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(LoginModal)
