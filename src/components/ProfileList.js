import React from 'react'
import { useHistory } from 'fusion-plugin-react-router'
import {
	WindowScroller,
	List,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
	AutoSizer,
} from 'react-virtualized'

import paths from '../constants/paths'
import { openFollowModal } from '../actions/actions'

import ImagePreview from './utils/ImagePreview'
import FollowBtn from './buttons/FollowBtn'
import UnfollowBtn from './buttons/UnfollowBtn'
import Loading from './utils/Loading'

/*
				<ProfileList
					authHandle={authHandle}
					profiles={profiles}
					paginationObject={profiles.byProfile[handle].following}
					openFollowModalFn={openFollowModal}
					emptyListMessage="not following"
				/>
*/

const PROFILE_LIST_ITEM_HEIGHT = 50

const GhostProfileListItem = () => (
	<div className="profileListItem">
		<div className="info">
			<div className="profileImage"></div>
			<div className="profileName"></div>
			<div className="profileHandle">loading</div>
		</div>
	</div>
)

const ProfileListItem = ({ authHandle, profile }) => {
	const history = useHistory()

	// const profile =
	// 	profiles.byHandle[Object.keys(paginationObject.results)[index]]

	if (!profile) {
		return <GhostProfileListItem />
	}

	const handleProfileClick = () => {
		if (profile.handle) {
			history.push(`${paths.profile}/${profile.handle}`)
		}
	}

	return (
		<div className="profileListItem" onClick={handleProfileClick}>
			<div className="info">
				{profile.image && (
					<div className="profileImage">
						<ImagePreview s3ObjectKey={profile.image} />
					</div>
				)}
				{/* <div className="profileImage">
					<ImagePreview s3ObjectKey={profile.image} />
				</div> */}
				{profile.full_name && (
					<div className="profileName">{profile.full_name}</div>
				)}
				<div className="profileHandle">{profile.handle}</div>
			</div>
			{/* {displayUnfollowBtn ? <UnfollowBtn /> : <CondFollowBtn />} */}
			<FollowBtn
				hidden={false}
				handle={profile.handle}
				authHandle={authHandle}
			/>
		</div>
	)
}

const ProfileList = ({
	authHandle,
	profiles,
	paginationObject,
	emptyListMessage,
	fetchMoreRowsFn,
}) => {
	const isRowLoaded = ({ index }) => {
		return (
			paginationObject &&
			paginationObject.results &&
			profiles.byHandle[Object.keys(paginationObject.results)[index]]
		)
	}

	const fetchMoreRows = ({ startIndex, stopIndex }) => {
		const limit = stopIndex - startIndex + 1
		const offset = startIndex

		console.log(`limit ${limit} - offset ${offset}`)
		const params = { limit, offset }
		fetchMoreRowsFn({ params })
	}

	const rowRenderer = ({ key, style, index }) => {
		return (
			<div key={key} style={style}>
				<ProfileListItem
					key={key}
					style={style}
					authHandle={authHandle}
					profile={
						profiles.byHandle[Object.keys(paginationObject.results)[index]]
					}
				/>
			</div>
		)
	}

	if (!(paginationObject && 'count' in paginationObject)) {
		return <Loading />
	}

	if (!Object.keys(paginationObject.results).length) {
		return <div className="emptyMessageColor">{emptyListMessage}</div>
	}

	return (
		<div className="profileListWrapper">
			<InfiniteLoader
				isRowLoaded={isRowLoaded}
				loadMoreRows={fetchMoreRows}
				rowCount={paginationObject.count}
			>
				{({ onRowsRendered, registerChild }) => (
					<WindowScroller>
						{({ height, scrollTop }) => (
							<AutoSizer disableHeight>
								{({ width }) => (
									<List
										autoHeight
										height={height}
										width={width}
										scrollTop={scrollTop}
										ref={registerChild}
										onRowsRendered={onRowsRendered}
										rowRenderer={rowRenderer}
										rowCount={paginationObject.count}
										rowHeight={PROFILE_LIST_ITEM_HEIGHT}
									/>
								)}
							</AutoSizer>
						)}
					</WindowScroller>
				)}
			</InfiniteLoader>
		</div>
	)
}

export default ProfileList

// const ProfileList = ({
// 	authHandle,
// 	profiles,
// 	paginationObject,
// 	openFollowModalFn,
// 	emptyListMessage,
// 	scrollableTargetId,
// }) => {
// 	return (
// 		<div id="profileListWrapper" className="centeredWrapper">
// 			<div className="profileList">
// 				{!Object.keys(paginationObject.byProfile).length && (
// 					<div className="emptyMessageColor">{emptyListMessage}</div>
// 				)}
// 				{/* {console.log(paginationObject)} */}
// 				<InfiniteScroll
// 					className="infiniteScroll"
// 					dataLength={paginationObject.count}
// 					next={() => console.log('fetching more profiles')}
// 					hasMore={paginationObject.next}
// 					loader={<Loading />}
// 					// scrollableTarget={scrollableTargetId}
// 				>
// 					{Object.keys(paginationObject.byProfile).map(key => {
// 						if (!paginationObject.byProfile[key]) return
// 						return (
// 							<ProfileListItem
// 								authHandle={authHandle}
// 								key={key}
// 								profiles={profiles}
// 								handle={key}
// 								openFollowModalFn={e => openFollowModalFn(e, key)}
// 								pullDownToRefresh
// 								pullDownToRefreshContent={
// 									<h3 style={{ textAlign: 'center' }}>
// 										&#8595; Pull down to refresh
// 									</h3>
// 								}
// 							/>
// 						)
// 					})}
// 				</InfiniteScroll>
// 			</div>
// 		</div>
// 	)
// }
