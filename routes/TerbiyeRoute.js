
const { protect } = require('../controllers/AuthController')
const { getAll, updateOne , deleteOne, createOne} = require('../controllers/handleFactory')
const upload = require('../middleware/uploadOption')

const Terbiye = require('../models/TerbiyeModel')
// const Teacher = require('../models/TeacherModel')

const router = require('express').Router()

router.route('/')
    .post(protect, upload.none(), createOne(Terbiye))
    .get(getAll(Terbiye))

router.route('/:id')
    .patch( protect,  updateOne(Terbiye))
    .delete(protect,  deleteOne(Terbiye))


module.exports = router