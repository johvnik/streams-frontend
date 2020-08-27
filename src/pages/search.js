import React, { useState, useCallback } from 'react'
import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import debounce from 'lodash/debounce'
import { RPC_IDS } from '../constants/rpc'

import SearchIcon from '../components/icons/SearchIcon'
import Loading from '../components/utils/Loading'
import ProfileList from '../components/ProfileList'
import { clearSearchResults } from '../actions/actions'

const SearchBar = ({ onChange, inputText }) => {
	return (
		<div className="searchBar">
			<div className="searchField">
				<SearchIcon className="icon" />
				<input onChange={onChange} value={inputText} />
			</div>
		</div>
	)
}

const SearchPage = ({ authHandle, profiles, searchProfiles }) => {
	const dispatch = useDispatch()
	const [lastQuery, setLastQuery] = useState('')

	const delayedQuery = useCallback(
		debounce(query => {
			if (query) {
				dispatch(clearSearchResults())
				setLastQuery(query)
				searchProfiles({ query })
			}
		}, 500),
	)

	const onChange = e => {
		delayedQuery(e.target.value)
	}

	const fetchMoreRowsFn = ({ params }) => {
		searchProfiles({ query: lastQuery, params })
	}

	return (
		<div className="searchPage">
			<SearchBar onChange={onChange} />
			{/* {profiles.search.isSearching && (
				<div className="loading slideAnim">
					<Loading />
				</div>
			)} */}
			{/* {profiles.search.results && profiles.search.results.byProfile && ( */}
			<ProfileList
				authHandle={authHandle}
				profiles={profiles}
				paginationObject={profiles.search}
				emptyListMessage=""
				fetchMoreRowsFn={fetchMoreRowsFn}
			/>
			{/* )} */}
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.searchProfiles)]

const mapStateToProps = state => ({
	authHandle: state.auth.authHandle,
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(SearchPage)
