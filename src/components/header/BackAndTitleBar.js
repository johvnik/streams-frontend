import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { NavLink } from 'react-router-dom'

import paths from '../../constants/paths'
import { RPC_IDS } from '../../constants/rpc'

// import BackBtn from '../buttons/BackBtn'
import LoginBtn from '../buttons/LoginBtn'
import SignupBtn from '../buttons/SignupBtn'

const BackAndTitleBar = ({ auth }) => {
	return (
		<div className="backAndTitleBar">
			<div className="barContents">
				<BackBtn />
				<div className="buttons">
					{!auth.authProfileId && <LoginBtn />}
					{!auth.authProfileId && <SignupBtn />}
				</div>
			</div>
		</div>
	)
}

const rpcs = []

const mapStateToProps = state => ({
	auth: state.auth,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

// export default hoc(BackAndTitleBar)
