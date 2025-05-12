const PublicationModel = require('../models/Publication')
const UserModel = require('../models/User')
const is_the_author = require('../helpers/is_the_author.helpers')
const {
	upload_img,
	delete_img
} = require('../helpers/img.helpers')




module.exports = async (req, res) => {
	try {
		const img_name = await upload_img(req, res)
		switch (req.body.destination) {
			case 'img_author':
				img_author(req, res, img_name)
				break
			case 'img_author_cover':
				img_author_cover(req, res, img_name)
				break
			/*
			case 'post_cover_img':
				img_miniature(req, res, img_name)
				break
			*/
			default:
				await delete_img(img_name)
				res.json({})
		}
	} catch(e) { res.json({}) }
}




/*
async function img_miniature(req, res, img_name) {
	const url = req.body.url
	let publication
	try {
		publication = await PublicationModel.findById(url)
	} catch {
		await delete_img(img_name)
		return res.json({}) // Publicación inexistente
	}

	const is_author = is_the_author(req.user._id, publication)
	if (!is_author) {
		await delete_img(img_name)
		return res.redirect('/')
	}

	const was_img_saved = await save_img_to_db(
		publication, 'img_miniature', img_name
	)
	res.json(was_img_saved)
}
*/




async function img_author(req, res, img_name) {
	const db = req.user
	const was_img_saved = await save_img_to_db(
		req.user,
		'profile_img',
		req.file
	)
	res.json(was_img_saved)
}


async function img_author_cover(req, res, img_name) {
	//const User = await UserModel.findOne({name: req.user.name})
	const was_img_saved = await save_img_to_db(
		req.user,
		'cover_img',
		img_name
	)
	res.json(was_img_saved)
}




async function save_img_to_db(db, field, img) {
	console.log(db)
	const { buffer, mimetype } = img
	const base64  = buffer.toString('base64')
	const dataURI = `data:${mimetype};base64,${base64}`
	try {
		db[field] = dataURI
		db.profile_img_content_type = mimetype
		await db.save()
		return {img: db[field]}
	} catch(e) {
		return {err: 'Fallo en la base de datos'}
	}
}
