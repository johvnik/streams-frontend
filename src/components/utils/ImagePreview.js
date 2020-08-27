/* eslint-env browser */
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react'
import { RPC_IDS } from '../../constants/rpc'

import Loading from './Loading'

const ImagePreview = ({
	images,
	s3ObjectKey,
	getSignedUrl,
	measure,
	useDefaultImage,
}) => {
	useEffect(() => {
		if (
			!(images[s3ObjectKey] && images[s3ObjectKey].signedUrl) &&
			!(images[s3ObjectKey] && images[s3ObjectKey].isLoading)
		) {
			getSignedUrl({ s3ObjectKey })
		}
	}, [])

	// const [loadError, setLoadError] = useState(false)
	// const [signedURL, setSignedURL] = useState(null)
	// const [loaded, setLoaded] = useState(false)

	// useEffect(() => {
	// 	const abortController = new AbortController()
	// 	const signal = abortController.signal

	// 	getSignedURL({ s3ObjectKey }, (err, signedURL) => {
	// 		if (err) {
	// 			setLoadError(err)
	// 		} else {
	// 			setLoaded(true)
	// 			setSignedURL(signedURL)
	// 		}
	// 	})
	// }, [])

	// if (loadError) {
	// 	return <div>error loading image</div>
	// }

	// if (!loaded) {
	// 	return <Loading />
	// }

	if (!(images[s3ObjectKey] && images[s3ObjectKey].signedUrl)) {
		if (useDefaultImage) {
			return <div className="loadingImage">loading</div>
		} else {
			return 'loading'
		}
	}

	const onLoad = () => {
		// measure
		console.log('image has loaded!!')
	}

	return <img onLoad={measure} src={images[s3ObjectKey].signedUrl} />
}

const rpcs = [withRPCRedux(RPC_IDS.getSignedUrl)]

const mapStateToProps = state => ({
	images: state.ui.images,
})

export default compose(
	...rpcs,
	connect(mapStateToProps),
)(ImagePreview)

// const getSignedURL = (data, callback) => {
// 	const loadURL = `/api/getSignedURL`
// 	const request = new XMLHttpRequest()
// 	request.onload = () => {
// 		if (request.status === 200) {
// 			const response = JSON.parse(request.response)
// 			if (response.status === 'success') {
// 				callback(null, response.data.signedURL)
// 			} else {
// 				callback(response.data.error)
// 			}
// 		} else {
// 			console.error(request.response)
// 		}
// 	}
// 	request.open('POST', loadURL)
// 	request.setRequestHeader('Accept', '*/*')
// 	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
// 	request.send(JSON.stringify(data))
// }
