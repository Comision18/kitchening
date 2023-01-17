module.exports = {
    list : (req,res) => {
        return res.render('products/list')
    },
    detail : (req,res) => {
        return res.render('products/detail')
    },
}