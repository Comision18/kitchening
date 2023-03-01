const multer = require('multer');
const path = require('path');

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]

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
    },
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidationError = "Solo se permite imágenes";
            return cb(null,false,req.fileValidationError);
        }
    
        cb(null, true)
      }
});

const uploadCoursesImages =  (req,res,next) => {
        const upload = configUploadCoursesImages.array('images');

        upload(req,res, function (error) {
            if(error){
                req.fileValidationError = "No más de 3 imágenes";
            }
            next()
        })

    }

module.exports = {
    uploadCoursesImages
}