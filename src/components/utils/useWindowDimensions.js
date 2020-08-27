import { useState, useEffect } from 'react'

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window
	return {
		width,
		height,
	}
}

export default function useWindowDimensions() {
	const DEFAULT_WIDTH = 600
	const DEFAULT_HEIGHT = 600

	const [windowDimensions, setWindowDimensions] = useState(
		__BROWSER__ ? getWindowDimensions() : { DEFAULT_WIDTH, DEFAULT_HEIGHT },
	)

	useEffect(() => {
		function handleResize() {
			if (!__BROWSER__) return
			setWindowDimensions(getWindowDimensions())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowDimensions
}
