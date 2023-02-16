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

const uploadCoursesImages = multer({
    storage : storageCourseImages
});

module.exports = {
    uploadCoursesImages
}