import React from 'react'

import CancelBtn from '../buttons/CancelBtn'
// import DeleteBtn from '../buttons/DeleteBtn'
// import LoadingBtn from '../buttons/LoadingBtn'

const ConfirmDeleteModal = ({ cancelFn, deleteFn }) => {
	return (
		<div className="confirmDeleteModalWrapper" onClick={cancelFn}>
			<div className="confirmDeleteModal">
				<div className="formWrapper">
					<div className="form">
						<div className="">are you sure?</div>
						<div className="buttons">
							<CancelBtn cancelFn={cancelFn} />
							<input
								className="button confirmDeleteBtn"
								type="submit"
								value="delete"
								onClick={deleteFn}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmDeleteModal
