import React, { useState, useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import debounce from 'lodash/debounce'
import {
	Route,
	Switch,
	useParams,
	Redirect,
	useHistory,
} from 'fusion-plugin-react-router'
import InfiniteScroll from 'react-infinite-scroll-component'

import { RPC_IDS } from '../constants/rpc'

import paths from '../constants/paths'
import SearchIcon from '../components/icons/SearchIcon'
import Loading from '../components/utils/Loading'
import Modal from './modal'

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

const SearchPage = ({ profiles, searchProfiles }) => {
	const [inputText, setInputText] = useState('')

	const history = useHistory()

	const delayedQuery = useCallback(
		debounce(query => {
			if (query) {
				console.log(`firing: ${query}`)
				searchProfiles({ query })
			}
		}, 500),
		[],
	)

	const onChange = e => {
		delayedQuery(e.target.value)
	}

	const handleProfileClick = id => {
		history.push(`${paths.profile}/${id}`)
	}

	return (
		<div className="searchPageWrapper">
			<div className="searchPage">
				<SearchBar onChange={onChange} />
				<div className="searchResults">
					{profiles.search.loading && (
						<div className="loading slideAnim">
							<Loading />
						</div>
					)}
					{profiles.search.results.map(id => {
						return (
							<div
								key={id}
								className="result"
								onClick={() => handleProfileClick(id)}
							>
								<div className="resultProfileImage">
									<img src={profiles.byId[id].image} />
								</div>
								{profiles.byId[id].full_name && (
									<div className="resultName">
										{profiles.byId[id].full_name}
									</div>
								)}
								<div className="resultHandle">{profiles.byId[id].handle}</div>
							</div>
						)
					})}
				</div>
			</div>
			<Modal>
				<div className="modalTestDiv"></div>
			</Modal>
		</div>
	)
}

const rpcs = [withRPCRedux(RPC_IDS.searchProfiles)]

const mapStateToProps = state => ({
	profiles: state.profiles,
})

const hoc = compose(
	...rpcs,
	connect(mapStateToProps),
)

export default hoc(SearchPage)
