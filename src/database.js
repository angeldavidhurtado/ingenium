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

console.log('-----------------------------------')
console.log(DB_URI)
console.log('-----------------------------------')

connect(DB_URI)
	.then(db => console.log('Mongo connected'))
	.catch(err => console.log(err))
