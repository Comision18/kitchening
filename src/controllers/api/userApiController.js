const {verifyUserByEmail} = require('../../services/usersServices');

module.exports = {
    index : (req,res) => {

    },
    detail : (req,res) => {

    },
    verifyEmail : async (req,res) => {
        try {

            let existUser = await verifyUserByEmail(req.body.email);

            return res.status(200).json({
                ok : true,
                data : {
                    existUser
                }
            })

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss, hubo un error"
                }
            })
        }
    }
}