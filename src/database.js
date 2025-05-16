const mongoose = require('mongoose')

const {
	DB_URI_SRV,
	DB_HOST,
	DB_PORT,
	DB_NAME
} = process.env
const DB_URI = DB_URI_SRV || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

function connectDB() {
	return mongoose.connect(DB_URI, {
		serverSelectionTimeoutMS: 5000,
		socketTimeoutMS: 45000
	})
}

module.exports = {
	connectDB,
	mongoose
}
