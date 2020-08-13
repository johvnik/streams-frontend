import React from 'react'

import Loading from './utils/Loading'
import ProfileListItem from './ProfileListItem'
import InfiniteScroll from 'react-infinite-scroll-component'

const ProfileList = ({
	authProfileId,
	profiles,
	paginationObject,
	openFollowModalFn,
	emptyListMessage,
}) => {
	return (
		<div className="centeredWrapper">
			<div className="profileList">
				{!Object.keys(paginationObject.profileIds).length && emptyListMessage}
				<InfiniteScroll
					className="infiniteScroll"
					dataLength={paginationObject.count}
					next={() => console.log('fetching more profiles')}
					hasMore={paginationObject.next}
					loader={<Loading />}
				>
					{Object.keys(paginationObject.profileIds).map(id => {
						if (!paginationObject.profileIds[id]) return
						return (
							<ProfileListItem
								authProfileId={authProfileId}
								key={id}
								profiles={profiles}
								profileId={id}
								openFollowModalFn={e => openFollowModalFn(e, id)}
							/>
						)
					})}
				</InfiniteScroll>
			</div>
		</div>
	)
	// return (
	// 	<div className="resultsWrapper">
	// 		<div className="results">
	// 			{isLoading && (
	// 				<div className="loading slideAnim">
	// 					<Loading />
	// 				</div>
	// 			)}
	// 			{listObject && !Object.keys(listObject).length && emptyMessage}
	// 			{listObject && (
	// 				<InfiniteScroll
	// 					className="infiniteScroll"
	// 					dataLength={listObject.count}
	// 					next={fetchProfiles}
	// 					hasMore={listObject.next}
	// 					loader={<Loading />}
	// 				>
	// 					{Object.keys(listObject.profileIds).map(id => {
	// 						if (!listObject.profileIds[id]) return
	// 						return (
	// 							<ProfileListItem
	// 								key={id}
	// 								profiles={profiles}
	// 								profileId={id}
	// 								openFollowModalFn={e => openFollowModal(e, id)}
	// 							/>
	// 						)
	// 					})}
	// 				</InfiniteScroll>
	// 			)}
	// 		</div>
	// 	</div>
	// )
}

export default ProfileList
