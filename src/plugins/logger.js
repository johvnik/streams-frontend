import { createPlugin } from 'fusion-core'

export default createPlugin({
	middleware() {
		return async (ctx, next) => {
			// this happens before virtual dom rendering
			const path = ctx.path
			const start = new Date()
			// console.log('calling '.padEnd(8, ' '), path)

			await next()

			// this happens after virtual dom rendering, but
			// before the response is sent to the browser
			console.log(
				`${new Date() - start} ms `.padEnd(8, ' '),
				`${ctx.method}`.padEnd(8, ' '),
				`${ctx.status}`.padEnd(8, ' '),
				path,
			)
			// console.log(ctx)
		}
	},
})
