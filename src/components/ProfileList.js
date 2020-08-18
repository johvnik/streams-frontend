import React from 'react'
import { useHistory } from 'fusion-plugin-react-router'
// import InfiniteScroll from 'react-infinite-scroll-component'
import {
	WindowScroller,
	List,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
	AutoSizer,
} from 'react-virtualized'

import paths from '../constants/paths'

import { ImagePreview } from './utils/ImagePreview'
import FollowBtn from './buttons/FollowBtn'
import UnfollowBtn from './buttons/UnfollowBtn'
import Loading from './utils/Loading'

const ProfileList = ({}) => {
	const rowRenderer = ({ key, style, index }) => {
		return (
			<div className="profileListRow" key={key} style={style}>
				{index}
			</div>
		)
	}

	return (
		<WindowScroller>
			{({ height, scrollTop }) => (
				<AutoSizer disableHeight>
					{({ width }) => (
						<List
							autoHeight
							height={height}
							width={width}
							scrollTop={scrollTop}
							rowRenderer={rowRenderer}
							rowCount={300}
							rowHeight={30}
						/>
					)}
				</AutoSizer>
			)}
		</WindowScroller>
	)
}

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

const ProfileListItem = ({
	authHandle,
	profiles,
	handle,
	openFollowModalFn,
	displayUnfollowBtn,
}) => {
	const history = useHistory()

	const handleProfileClick = () => {
		history.push(`${paths.profile}/${handle}`)
	}

	const CondFollowBtn = () => {
		if (authHandle != handle) {
			return (
				<FollowBtn
					authHandle={authHandle}
					openFollowModalFn={openFollowModalFn}
				/>
			)
		}
		return <></>
	}

	return (
		<div className="profileListItem" onClick={handleProfileClick}>
			<div className="info">
				<div className="profileImage">
					<ImagePreview s3ObjectKey={profiles.byHandle[handle].image} />
				</div>
				{profiles.byHandle[handle].full_name && (
					<div className="profileName">
						{profiles.byHandle[handle].full_name}
					</div>
				)}
				<div className="profileHandle">{profiles.byHandle[handle].handle}</div>
			</div>
			{displayUnfollowBtn ? <UnfollowBtn /> : <CondFollowBtn />}
		</div>
	)
}

export default ProfileList
