const multer = require('multer')
const MulterError = require('multer').MulterError
const unlink = require('fs').unlink
const uuid = require('uuid').v4
const extname = require('path').extname

const helpers = {}




// Upload

helpers.upload_img = (req, res) => {
	return new Promise((resolve, reject) => {
		multer_upload_img(req, res, err => {
			let error_upload = ''

			if (err instanceof MulterError) {
				// A Multer error occurred when uploading.
				if (err.code == 'LIMIT_FILE_SIZE')
					error_upload = 'Máximo 1MB'
				else
					error_upload = 'unknown'
			} else if (err == 'bad format')
				error_upload = 'Formato no válido'
			else if (err)
				error_upload = 'Ha ocurrido un error desconocido'

			if (error_upload)
				reject(error_upload)
			else
				resolve(req.file.filename)
		})
	})
}




const storage = multer.diskStorage({
	destination: `${__dirname}/../public/uploads_img`,
	filename: (req, file, cb) => {
		cb(null,
			// Nombre aleatorio único
			uuid() + extname(file.originalname).toLocaleLowerCase()
		)
		// nombre original
		// cb(null, file.originalname)
	}
})

multer_upload_img = multer({
	storage, // storage: name
	limits: {fileSize: 1000000}, // 1Mb
	fileFilter: (req, file, cb) => {
		let ext = /\/\w+$/.exec(file.mimetype)
		if (!ext) return cb('bad format')
		ext = ext[0].substr(1)

		const valid_format = /jpeg|png|gif|webp/.test(ext)
		// heif y tiff deben convertirse de formato
		if (valid_format) return cb(null, true)
		cb('bad format')
	}
	//dest: `${__dirname}/public/uploads_img`}
}).single('img') // el name del form con el que resibirá el arcchivo




// Delete

const dir_imgs = `${__dirname}/../public/uploads_img`

helpers.delete_img = (img_name) => {
	return new Promise(res => {
		if (img_name)
			return unlink(`${dir_imgs}/${img_name}`, err => {res()})
		res()
	})
}




module.exports = helpers