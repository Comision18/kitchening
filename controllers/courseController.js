module.exports = {
    list : (req,res) => {
        return res.render('courses/list')
    },
    detail : (req,res) => {
        return res.render('courses/detail')
    },
}