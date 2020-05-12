// @flow
import App from 'fusion-react'
import Router, { RouterToken } from 'fusion-plugin-react-router'
import Styletron from 'fusion-plugin-styletron-react'
import HelmetPlugin from 'fusion-plugin-react-helmet-async'
import UniversalEvents, {
	UniversalEventsToken,
} from 'fusion-plugin-universal-events'
import Redux, { ReduxToken, ReducerToken } from 'fusion-plugin-react-redux'
import RPC, { RPCToken, RPCHandlersToken } from 'fusion-plugin-rpc-redux-react'
import { FetchToken } from 'fusion-tokens'
import fetch from 'unfetch'
import JWTSession, {
	SessionSecretToken,
	SessionCookieNameToken,
	SessionCookieExpiresToken,
} from 'fusion-plugin-jwt'
import { SessionToken } from 'fusion-tokens'

import root from './root.js'
import reducer from './reducers/index'

export default () => {
	const app = new App(root)

	app.register(Styletron)
	app.register(HelmetPlugin)
	app.register(RouterToken, Router)

	if (__NODE__) {
		const handlers = require('./rpc/index').default
		const LoggerPlugin = require('./plugins/logger').default
		const AuthPlugin = require('./plugins/auth').default

		app.register(RPCHandlersToken, handlers)
		app.register(LoggerPlugin)
		app.register(AuthPlugin)

		app.register(SessionToken, JWTSession)
		app.register(SessionSecretToken, 'some-secret') // required, put in process.ENV
		app.register(SessionCookieNameToken, 'streams-cookie') // required
		app.register(SessionCookieExpiresToken, 86400) // optional, defaults to never?
	}

	if (__BROWSER__) {
		app.register(FetchToken, fetch)
	}

	app.register(RPCToken, RPC)
	app.register(UniversalEventsToken, UniversalEvents)
	app.register(ReduxToken, Redux)
	app.register(ReducerToken, reducer)

	return app
}
