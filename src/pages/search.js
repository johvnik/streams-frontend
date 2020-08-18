import React, { useState, useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import debounce from 'lodash/debounce'
import { RPC_IDS } from '../constants/rpc'

import SearchIcon from '../components/icons/SearchIcon'
import Loading from '../components/utils/Loading'
import FollowModal from '../components/modals/FollowModal'
import ProfileList from '../components/ProfileList'

const SearchBar = ({ onChange, inputText }) => {
	return (
		<div className="searchBar">
			<div className="searchField">
				<SearchIcon className="icon" />
				<input value={inputText} onChange={onChange} />
			</div>
		</div>
	)
}

export default () => {
	return (
		<div className="searchPage">
			<ProfileList />
		</div>
	)
}

// const SearchPage = ({
// 	authHandle,
// 	profiles,
// 	searchProfiles,
// 	followProfile,
// }) => {
// 	const [followModal, setFollowModal] = useState(0)

// 	const delayedQuery = useCallback(
// 		debounce(query => {
// 			if (query) {
// 				searchProfiles({ query })
// 			}
// 		}, 500),
// 	)

// 	const onChange = e => {
// 		delayedQuery(e.target.value)
// 	}

// 	const openFollowModal = (e, profileId) => {
// 		e.stopPropagation()
// 		setFollowModal(profileId)
// 	}

// 	const closeFollowModal = () => {
// 		setFollowModal(0)
// 	}

// 	return (
// 		<div className="searchPage">
// 			{followModal ? (
// 				<FollowModal
// 					authHandle={authHandle}
// 					cancelFn={closeFollowModal}
// 					handle={followModal}
// 					followProfile={followProfile}
// 				/>
// 			) : (
// 				<></>
// 			)}
// 			<SearchBar onChange={onChange} />
// 			{profiles.search.isSearching && (
// 				<div className="loading slideAnim">
// 					<Loading />
// 				</div>
// 			)}
// 			{/* {profiles.search.results && profiles.search.results.byProfile && ( */}
// 			<ProfileList
// 				authHandle={authHandle}
// 				profiles={profiles}
// 				paginationObject={profiles.search.results}
// 				openFollowModalFn={openFollowModal}
// 				emptyListMessage=""
// 			/>
// 			{/* )} */}
// 		</div>
// 	)
// }

// const rpcs = [
// 	withRPCRedux(RPC_IDS.searchProfiles),
// 	withRPCRedux(RPC_IDS.followProfile),
// ]

// const mapStateToProps = state => ({
// 	authHandle: state.auth.authHandle,
// 	profiles: state.profiles,
// })

// const hoc = compose(
// 	...rpcs,
// 	connect(mapStateToProps),
// )

// export default hoc(SearchPage)
