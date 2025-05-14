const express = require('express')
const session = require('express-session')
const mongoStore  = require('connect-mongo')
const flash = require('connect-flash')
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport')

// Initialization
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
    mongoUrl: DB_URI, // URI of Atlas o local
    collectionName: 'sessions', // name of collection-data where saved sessions
    ttl: 14 * 24 * 60 * 60 // 14 days in sec
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in ms
    // secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  }
}))

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "https://cdn.jsdelivr.net"],
    scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
    fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  }
}))
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

app.listen(app.get('PORT'), () => {
	console.log(`Server on port ${app.get('PORT')}`)
})
