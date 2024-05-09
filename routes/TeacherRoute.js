const { protect } = require('../controllers/AuthController')
const { createTeacher } = require('../controllers/TeacherController')
const { getAll, deleteAll, getOne, updateOne , deleteOne, updatePhoto} = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const upload = require('../middleware/uploadOption')
const Teacher = require('../models/TeacherModel')

const router = require('express').Router()

router.route('/')
    .post(protect,  upload.single('file'), createTeacher)
    .get(getAll(Teacher))
    .delete(protect,  deleteAll(Teacher))

router.route('/:id')
    .get(getOne(Teacher))
    .patch( protect,  updateOne(Teacher))
    .delete(protect,  deleteOne(Teacher))

router.route('/:id/img')
    .patch(protect,  upload.single('file'), updatePhoto(Teacher))

module.exports = router