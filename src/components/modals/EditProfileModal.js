import React, { useState, useEffect } from 'react'
import { Route, Switch, useParams, Redirect } from 'fusion-plugin-react-router'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'

import { closeModals } from '../../actions/actions'
import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

import Loading from '../utils/Loading'
import CancelBtn from '../buttons/CancelBtn'
import LoadingBtn from '../buttons/LoadingBtn'

const EditProfileModal = ({
	accounts,
	prevAccount,
	prevProfile,
	updateAccount,
}) => {
	const dispatch = useDispatch()

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => (document.body.style.overflow = '')
	}, [])

	if (!prevAccount || !prevProfile) {
		return (
			<div className="modalWrapper" onClick={() => dispatch(closeModals())}>
				<div
					className="modal editProfileModal"
					onClick={e => e.stopPropagation()}
				>
					<div className="modalHeading">edit profile</div>
					<div className="modalBody">
						<div className="formWrapper">
							<Loading />
						</div>
					</div>
				</div>
			</div>
		)
	}

	const [email, setEmail] = useState(prevAccount.email)
	const [phone, setPhone] = useState(prevAccount.phone)
	const [fullName, setFullName] = useState(prevProfile.full_name)
	const [bio, setBio] = useState(prevProfile.bio)

	const handleSubmit = () => {
		updateAccount({
			email,
			phone,
			profile: {
				full_name: fullName,
				bio,
			},
		})
	}

	const canSave = () =>
		email != prevAccount.email ||
		phone != prevAccount.phone ||
		fullName != prevProfile.full_name ||
		bio != prevProfile.bio

	return (
		<div className="modalWrapper" onClick={() => dispatch(closeModals())}>
			<div
				className="modal editProfileModal"
				onClick={e => e.stopPropagation()}
			>
				<div className="modalHeading">edit profile</div>
				<div className="modalBody">
					<div className="formWrapper">
						<div className="form">
							<label>
								<div className="labelText">name</div>
								<input
									value={fullName}
									onChange={e => setFullName(e.target.value)}
									type="text"
									placeholder="no name"
									name="full_name"
									className={fullName != prevProfile.full_name ? 'blue' : ''}
								/>
							</label>
							<label>
								<div className="labelText">email</div>
								<input
									value={email}
									onChange={e => setEmail(e.target.value)}
									type="text"
									placeholder="you must have a valid email"
									name="email"
									className={
										email != prevAccount.email ? 'blue' : !email ? 'red' : ''
									}
								/>
							</label>
							<label>
								<div className="labelText">phone</div>
								<input
									value={phone}
									onChange={e => setPhone(e.target.value)}
									type="text"
									placeholder="no number"
									name="phone"
									className={phone != prevAccount.phone ? 'blue' : ''}
								/>
							</label>
							<label className="span3">
								<div className="labelText">bio</div>
								<textarea
									value={bio}
									onChange={e => setBio(e.target.value)}
									// type="text"
									placeholder="no bio"
									className={bio != prevProfile.bio ? 'blueForTxtArea' : ''}
									maxLength="1000"
								/>
							</label>
							<br />
							<div className="buttons">
								<CancelBtn cancelFn={() => dispatch(closeModals())} />
								{accounts.loading ? (
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.updateAccount)]

const mapStateToProps = state => ({
	accounts: state.accounts,
	prevAccount: state.accounts.byHandle[state.auth.authHandle],
	prevProfile: state.profiles.byHandle[state.auth.authHandle],
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(EditProfileModal)
