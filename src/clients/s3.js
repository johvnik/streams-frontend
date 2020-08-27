const AWS = require('aws-sdk')
const { s3Config } = require('./config')

AWS.config = new AWS.Config()

AWS.config.accessKeyId = s3Config.accessKey
AWS.config.secretAccessKey = s3Config.secretKey

const s3Client = new AWS.S3({ signatureVersion: 'v4', region: 'us-east-2' })

const uploadFile = (key, buffer) => {
	const bucket = s3Config.storageBucket

	const params = {
		Body: buffer,
		Key: key,
		Bucket: bucket,
	}

	return new Promise((resolve, reject) => {
		console.log(`starting upload to s3 path ${bucket} ${key}`)
		s3Client
			.putObject(params)
			.on('httpUploadProgress', progress => {
				console.log('s3 progress ---')
				console.log(progress)
			})
			.send((err, data) => {
				if (err) {
					console.log(err)
					reject(err)
				}
				console.log(data)
				const storageKey = key
				const storageBucket = bucket
				const resp = {
					storageKey,
					storageBucket,
				}
				resolve(resp)
			})
	})
}

const getSignedObjectUrl = (storageKey, operation, expiry) => {
	console.log(
		`Getting signed url for ${s3Config.storageBucket} - ${storageKey}`,
	)
	const s3Op = operation || 'getObject'
	const expiration = expiry || 23 * 60 * 60
	console.log(`Operation is ${s3Op}`)
	console.log(`Expiration is ${expiration}`)
	const params = {
		Bucket: s3Config.storageBucket,
		Key: storageKey,
		Expires: expiration,
	}
	return s3Client.getSignedUrl(s3Op, params)
}

const client = {
	uploadFile,
	getSignedObjectUrl,
}

module.exports = client
