/* eslint-env browser */
import React, { useState, useEffect } from 'react'

import Loading from './Loading'

const getSignedURL = (data, callback) => {
	const loadURL = `/api/getSignedURL`
	const request = new XMLHttpRequest()
	request.onload = () => {
		if (request.status === 200) {
			const response = JSON.parse(request.response)
			if (response.status === 'success') {
				callback(null, response.data.signedURL)
			} else {
				callback(response.data.error)
			}
		} else {
			console.error(request.response)
		}
	}
	request.open('POST', loadURL)
	request.setRequestHeader('Accept', '*/*')
	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	request.send(JSON.stringify(data))
}

export const ImagePreview = ({ s3ObjectKey }) => {
	const [loadError, setLoadError] = useState(false)
	const [signedURL, setSignedURL] = useState(null)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		getSignedURL({ s3ObjectKey }, (err, signedURL) => {
			if (err) {
				setLoadError(err)
			} else {
				setLoaded(true)
				setSignedURL(signedURL)
			}
		})
	}, [])

	if (loadError) {
		return <div>error loading image</div>
	}

	if (!loaded) {
		return <Loading />
	}

	return <img src={signedURL} />
}

// export class ImagePreview extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			loadError: false,
// 			signedURL: null,
// 			loaded: false,
// 		}
// 	}

// 	componentDidMount() {
// 		const { s3ObjectKey } = this.props

// 		getSignedURL({ s3ObjectKey }, (err, signedURL) => {
// 			if (err) {
// 				return this.setState({
// 					loadError: err,
// 				})
// 			}
// 			return this.setState({
// 				loaded: true,
// 				signedURL,
// 			})
// 		})
// 	}

// 	render() {
// 		const { signedURL, loaded, loadError } = this.state

// 		if (loadError) {
// 			return <div className="imagePreview">failure</div>
// 		}

// 		if (!loaded) {
// 			return <div className="imagePreview">loading</div>
// 		}

// 		return (
// 			<div className="imagePreview">
// 				<img src={signedURL} style={{ width: '100%' }} />
// 			</div>
// 		)
// 	}
// }
