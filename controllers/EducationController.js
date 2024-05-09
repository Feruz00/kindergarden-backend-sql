const Education = require("../models/EducationModel");
const catchAsync = require("../utils/catchAsync");

const createEducation = catchAsync(
    async (req,res,next)=>{
        console.log("geldim create")
        const {path} = req.file
        console.log(req.file)
        const {title, description, link} = req.body
        const data = await Education.create({
            title,
            description,
            link,
            url: path
        })
        res.send(data)
    }
)

const updatePhotoEducation = catchAsync(
    async (req,res,next)=>{
        const {path} = req.file
        await Education.update( {
            url:path
        },{
            where: req.params.id
        })

        res.send(req.file)
    }
)



module.exports = {
    createEducation,
    updatePhotoEducation,
    // updatePdfEducation
}