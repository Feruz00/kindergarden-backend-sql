const About = require("../models/AboutUsModel")
const catchAsync = require("../utils/catchAsync")

const createAbout = catchAsync(
    async (req, res, next)=>{
        // console.log("geldim icinde:", req.body)
        // console.log("files", req.files)
        const {mainImg} = req.files
        const picturePath = mainImg[0].path
        const smallImg = req.files.smallImg ?  req.files.smallImg[0].path : undefined
        const data = await About.create({
            ...req.body,
            mainImg:picturePath, 
            smallImg
        })
        // console.log(data)
        res.send(data)

    }
)

const updateAboutImages = catchAsync(
    async (req, res, next)=>{
        // console.log("geldim")
        // console.log(req.params.id)
        // console.log(req.files)
        const mainImg = req.files.mainImg ?  req.files.mainImg[0].path : undefined
        const smallImg = req.files.smallImg ?  req.files.smallImg[0].path : undefined
        const data = await About.update({
            mainImg,
            smallImg
        },{
            where:{
                _id: req.params.id}
        })
        res.send(data)

    }
)

module.exports = {createAbout, updateAboutImages}