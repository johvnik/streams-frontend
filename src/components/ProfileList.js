import React from 'react'

import Loading from './utils/Loading'
import ProfileListItem from './ProfileListItem'
import InfiniteScroll from 'react-infinite-scroll-component'

const ProfileList = ({
	authHandle,
	profiles,
	paginationObject,
	openFollowModalFn,
	emptyListMessage,
	scrollableTargetId,
}) => {
	return (
		<div id="profileListWrapper" className="centeredWrapper">
			<div className="profileList">
				{!Object.keys(paginationObject.byProfile).length && (
					<div className="emptyMessageColor">{emptyListMessage}</div>
				)}
				{/* {console.log(paginationObject)} */}
				<InfiniteScroll
					className="infiniteScroll"
					dataLength={paginationObject.count}
					next={() => console.log('fetching more profiles')}
					hasMore={paginationObject.next}
					loader={<Loading />}
					// scrollableTarget={scrollableTargetId}
				>
					{Object.keys(paginationObject.byProfile).map(key => {
						if (!paginationObject.byProfile[key]) return
						return (
							<ProfileListItem
								authHandle={authHandle}
								key={key}
								profiles={profiles}
								handle={key}
								openFollowModalFn={e => openFollowModalFn(e, key)}
								pullDownToRefresh
								pullDownToRefreshContent={
									<h3 style={{ textAlign: 'center' }}>
										&#8595; Pull down to refresh
									</h3>
								}
							/>
						)
					})}
				</InfiniteScroll>
			</div>
		</div>
	)
}

export default ProfileList
