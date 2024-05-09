const { protect } = require('../controllers/AuthController')
const { createOne, deleteAll, getAll, getOne, deleteOne, updateOne } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const upload = require('../middleware/uploadOption')
const GalleryType = require('../models/GalleryTypeModel')

const router = require('express').Router()

router.route('/')
    .post(protect,  upload.none() , createOne(GalleryType)) //
    .delete(protect,  deleteAll(GalleryType))
    .get(getAll(GalleryType))

router.route('/:id')
    .get(getOne(GalleryType))
    .delete(protect,  deleteOne(GalleryType))
    .put(protect,  updateOne(GalleryType))

module.exports = router