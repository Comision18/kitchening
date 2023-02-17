const multer = require('multer');
const path = require('path');

const storageCourseImages = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null, 'public/images/courses')
    },
    filename : function (req,file,callback) {
        callback(null,`${Date.now()}_courses_${path.extname(file.originalname)}`)
    }
});

const configUploadCoursesImages = multer({
    storage : storageCourseImages,
    limits : {
        files : 3
    }
});

const uploadCoursesImages =  (req,res,next) => {
        const upload = configUploadCoursesImages.array('images');

        upload(req,res, function (error) {
            if(error){
                req.multerError = error.message
            }
            next()
        })

    }

module.exports = {
    uploadCoursesImages
}