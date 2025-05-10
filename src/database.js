const {connect} = require('mongoose')

const {
	DB_URI_SRV,
	DB_HOST,
	DB_PORT,
	DB_NAME
} = process.env
const DB_URI = DB_URI_SRV
	? DB_URI_SRV
	: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

connect(DB_URI)
	.then(db => {
		console.log('Mongo connected')
		console.log('++++++++++++++++++++++++++++++++')
	})
	.catch(err => {
		console.log('-------------------------------')
		console.log(err)
		console.log('-------------------------------')
	})
