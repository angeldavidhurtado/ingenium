const {connect} = require('mongoose')

const {DB_HOST, DB_PORT, DB_NAME} = process.env
const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

connect(DB_URI)
	.then(db => console.log('Mongo connected'))
	.catch(err => console.log(err))
