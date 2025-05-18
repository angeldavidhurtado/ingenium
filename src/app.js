require('dotenv').config()

const express = require('express')
const session = require('express-session')
const mongoStore  = require('connect-mongo')
const flash = require('connect-flash')
const compression = require('compression');
const cors = require('cors');
const passport = require('passport')
const { connectDB, mongoose } = require('./database')

// Initialization
connectDB()
  .then(() => console.log('Mongo conectado'))
  .catch(err => {
    console.error('Error de conexión a Mongo:', err)
    process.exit(1)
  })
const app = express()
require('./config/passport')

const {
	DB_URI_SRV,
	DB_HOST,
	DB_PORT,
	DB_NAME
} = process.env
const DB_URI = DB_URI_SRV || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`


app.use(session({
  secret: process.env.SESSION_SECRET || 'un-secreto-super-fuerte',
  resave: false,
  saveUninitialized: false,
  store: mongoStore.create({
    mongoUrl: DB_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,        // <- deshabilita HTTPS
    sameSite: 'lax'       // <- permite envío en peticiones normales
  }
}))

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.use(compression())
app.use(cors({
  origin: 'https://royalexplanation.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


// Settings
app.set('PORT', process.env.PORT || 80)
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global varialbes
app.use((req, res, next) => {
	res.locals.msg_ok = req.flash('msg_ok')
	res.locals.error = req.flash('error')
	next()
})

// Routes
app.use(require('./routes/search.routes'))
app.use(require('./routes/log_in.routes'))
app.use(require('./routes/suggestions.routes'))
app.use(require('./routes/publication.routes'))
app.use(require('./routes/user_profile.routes'))
app.get('*', (req, res) => {res.redirect('/')})

const PORT = app.get('PORT')
const server = app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`)
})

module.exports = { app, server }
