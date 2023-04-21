const db = require('../database/models');
const {literalQueryUrlImage,literalQueryUrl} = require('../helpers')

module.exports = {
    getAllCourses : async (req) => {
        try {

            const {count, rows : courses} = await db.Course.findAndCountAll({
                include : [
                    {
                        association : "images",
                        attributes : {
                            exclude : ["createdAt","updatedAt","id","courseId","name"],
                            include : [
                                literalQueryUrlImage(req,'courses','name','urlImage'),
                            ]
                        }
                    }
                ],
                attributes : {
                    include : [
                        literalQueryUrl(req,'courses','Course.id')
                    ]
                }
            })
            return {
                count,
                courses
            }
            
        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    getCourseById : async (req,id) => {
        try {

            const course = await db.Course.findByPk(id,{
                include : [
                    {
                        association : "images",
                        attributes : {
                            exclude : ["createdAt","updatedAt","id","courseId","name"],
                            include : [
                                literalQueryUrlImage(req,'courses','images.name','urlImage')
                            ]
                        }
                    },
                    {
                        association : "chef",
                        attributes : {
                            exclude : ["createdAt","updatedAt","id","photo"],
                            include : [
                                literalQueryUrlImage(req,'chefs','photo','urlPhoto')
                            ]
                        }
                    }
                ]
            })
            return course
            
        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message
            }
        }
    } 
}