let s3Config = {}
let cloudflareConfig = {}

if (__NODE__) {
	s3Config = {
		storageBucket: 'streams-photo-storage',
		zone: 'us-east-2',
		accessKey: 'AKIAYY2TBF6MZYPGCA4U',
		secretKey: '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',
	}
}

module.exports.s3Config = s3Config
module.exports.cloudflareConfig = cloudflareConfig
