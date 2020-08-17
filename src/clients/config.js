let s3Config = {}
let cloudflareConfig = {}

if (__NODE__) {
	s3Config = {
		storageBucket: 'streams-photo-storage',
		zone: 'us-east-2',
	}
}

module.exports.s3Config = s3Config
module.exports.cloudflareConfig = cloudflareConfig
