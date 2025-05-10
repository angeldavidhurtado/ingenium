const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport')

// Initialization
const app = express()
require('./config/passport')

app.use(helmet());
app.use(compression());
/*
app.use(cors({
  origin: 'https://mi-frontend.com',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));
*/

// Settings
app.set('PORT', process.env.PORT || 80)
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
	secret: 'secret_string',
	resave: true,
	saveUninitialized: true,
	cookie: {
		//secure: true,
		sameSite: true
	}
}))
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
