import { createPlugin } from 'fusion-core'
import { SessionToken } from 'fusion-tokens'

export default createPlugin({
	deps: {
		Session: SessionToken,
	},
	middleware({ Session }) {
		return async (ctx, next) => {
			console.log('seeing call to: ', ctx.path)
			const session = Session.from(ctx)

			ctx['access_token'] = session.get('access_token')
			ctx['refresh_token'] = session.get('refresh_token')

			console.log('before next')
			await next()
			console.log('after next')

			session.set('access_token', ctx['access_token'])
			session.set('refresh_token', ctx['refresh_token'])
		}
	},
})
