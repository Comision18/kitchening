module.exports = (req,res,next) => {
    if(req.cookies.userKitchening18){
        req.session.userLogin = req.cookies.userKitchening18
    }

    next()
}