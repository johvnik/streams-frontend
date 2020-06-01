export const watchedEnum = (enumToWatch, enumType) =>
	new Proxy(enumToWatch, {
		get: (obj, key) => {
			if (!obj[key]) {
				console.log(`Error, missing ${enumType} ${key}`)
			}
			return obj[key]
		},
	})
