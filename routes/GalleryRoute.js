
const { protect } = require('../controllers/AuthController')
const { createGallery, updatePicture, updateGalleryPdf } = require('../controllers/GalleryConrtoller')
const { getAll, deleteAll, getOne, updateOne, deleteOne, updatePhoto } = require('../controllers/handleFactory')
const galleryOptions = require('../middleware/galleryOptions')
const { restrictTo } = require('../middleware/restrictTo')
const Gallery = require('../models/GalleryModel')
const GalleryType = require('../models/GalleryTypeModel')

const router = require('express').Router()

router.route('/')
    .get(getAll(Gallery, undefined, [GalleryType]))
    .delete(protect,  deleteAll(Gallery))
    .post( protect,  galleryOptions.fields([
        {name:'picture', maxCount: 1},
        {name: 'file', maxCount: 1}
    ]), createGallery )
    .put(protect,  updateGalleryPdf)

    router.route('/:id')
    .get(getOne(Gallery, undefined, [{model: GalleryType}]))
    .patch( protect,  updateOne(Gallery))
    .delete( protect,  deleteOne(Gallery))

router.route('/:id/file')
    .patch( protect,  galleryOptions.single("file"), updatePhoto(Gallery))

router.route('/:id/image')
    .patch(protect,  galleryOptions.single("file"), updatePicture)


module.exports = router