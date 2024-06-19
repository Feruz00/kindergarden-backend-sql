
const { protect } = require('../controllers/AuthController')
const { getAll, updateOne , deleteOne, createOne} = require('../controllers/handleFactory')
const upload = require('../middleware/uploadOption')
const Footer = require('../models/FooterModel')

// const Terbiye = require('../models/TerbiyeModel')
// const Teacher = require('../models/TeacherModel')

const router = require('express').Router()

router.route('/')
    .post(protect, upload.none(), createOne(Footer))
    .get(getAll(Footer))

router.route('/:id')
    .patch( protect,  updateOne(Footer))
    .delete(protect,  deleteOne(Footer))


module.exports = router