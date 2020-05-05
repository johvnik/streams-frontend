import { createPlugin } from 'fusion-core'
import { SessionToken } from 'fusion-tokens'

export default createPlugin({
	deps: {
		Session: SessionToken,
	},
	middleware({ Session }) {
		return (ctx, next) => {
			const session = Session.from(ctx)
			const access_token = session.get('access_token')
			if (access_token) {
				ctx.request.header = {
					...ctx.request.headers,
					authorization: `Bearer ${access_token}`,
				}
			}
			return next()
		}
	},
})
