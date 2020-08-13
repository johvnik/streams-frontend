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

const SearchPage = ({
	authProfileId,
	profiles,
	searchProfiles,
	followProfile,
}) => {
	const [followModal, setFollowModal] = useState(0)

	const delayedQuery = useCallback(
		debounce(query => {
			if (query) {
				searchProfiles({ query })
			}
		}, 500),
	)

	const onChange = e => {
		delayedQuery(e.target.value)
	}

	const openFollowModal = (e, profileId) => {
		e.stopPropagation()
		setFollowModal(profileId)
	}

	const closeFollowModal = () => {
		setFollowModal(0)
	}

	return (
		<div className="searchPageWrapper">
			<div className="searchPage">
				{followModal ? (
					<FollowModal
						myProfileId={authProfileId}
						cancelFn={closeFollowModal}
						profileId={followModal}
						followProfile={followProfile}
					/>
				) : (
					<></>
				)}
				<SearchBar onChange={onChange} />
				<div className="searchResults">
					{profiles.search.loading && (
						<div className="loading slideAnim">
							<Loading />
						</div>
					)}
					{profiles.search.results && profiles.search.results.profileIds && (
						<ProfileList
							authProfileId={authProfileId}
							profiles={profiles}
							paginationObject={profiles.search.results}
							openFollowModalFn={openFollowModal}
							emptyListMessage=""
						/>
					)}
				</div>
			</div>
		</div>
	)
}

const rpcs = [
	withRPCRedux(RPC_IDS.searchProfiles),
	withRPCRedux(RPC_IDS.followProfile),
]

const mapStateToProps = state => ({
	authProfileId: state.auth.authProfileId,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(SearchPage)
