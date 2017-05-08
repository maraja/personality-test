
module.exports = {

	session_secret: "personality-test",
	mongo: {
		development: {
			environment: "development",
			db: {
				dialect: "mongodb",
				username: "dev",
				password: "P3rs0nal1tYT35T!",
				host: "localhost",
				port: "27017",
				database: "personality-test"
			}
		},
		production: {
			environment: "production",
			db: {
				dialect: "mongodb",
				username: "dev",
				password: "P3rs0nal1tYT35T!",
				host: "ds133331.mlab.com",
				port: "33331",
				database: "heroku_r2kwj163"
			}
		}
	}

}