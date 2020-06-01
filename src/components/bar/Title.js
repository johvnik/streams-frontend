import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

const Title = ({ body, currentStream }) => {
	let title = ''
	Object.keys(currentStream).length
		? (title = currentStream.name)
		: (title = 'streams logo')

	return <div className="title">{title}</div>
}

const mapStateToProps = state => ({
	currentStream: state.streams.currentStream,
})

const hoc = compose(connect(mapStateToProps))

export default hoc(Title)
