import { createPlugin } from 'fusion-core'
import { RouterToken } from 'fusion-plugin-react-router'

import paths from '../constants/paths'

export default createPlugin({
	deps: {
		Router: RouterToken,
	},
	middleware({ Router }) {
		return async (ctx, next) => {
			console.log('browser middleware start')
			await next()
			console.log('browser middleware after')

			const { history } = Router.from(ctx)

			if (ctx.redirectHome) {
				console.log('redirecting to home')
				// ctx.redirect(paths.home)
				// Router.push(paths.home)
				// history.replace(paths.home)
				console.log('history: ', history)
			}

			if (ctx.redirectLogin) {
				console.log('redirecting to login')
				// ctx.redirect(paths.login)
			}
		}
	},
})
