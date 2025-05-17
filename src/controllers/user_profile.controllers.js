const PostModel = require('../models/Publication')
const UserModel = require('../models/User')

const userCtrl = {}

userCtrl.user_profile = async (req, res) => {
	const req_user_id = req.params.user_id

	const user = await UserModel
		.findOne({_id: req_user_id})
		.select('name job profile_img cover_img social_networks')
	if (!user)
		return res.redirect('/')

	const auth = req.isAuthenticated()
	const my_user_id = auth ? req.user._id : null

	const match = {authors: req_user_id}
	user.is_author = false
	if (auth && my_user_id == req_user_id)
		user.is_author = true
	else
		match.public = true

	const posts = await PostModel
		.find(match)
		.sort({ createdAt: -1 })
		.select('url title description')

	const Nav = {
		new: auth ? 'new' : 'log_in',
		home: true,
		my_profile: auth ? (user.is_author ? false : req.user._id) : false,
		log_in: auth ? 'log_out' : 'log_in'
	}
	if (!user.job && user.is_author) user.job = 'Profesión'
	console.log(posts)
	res.render('user_profile', {Nav, user, posts})
}

module.exports = userCtrl
