const { getAllChefs } = require("../../services/chefsServices");


module.exports = {
  index: async (req, res) => {
    try {

      const {count, chefs} = await getAllChefs()
    
      return res.status(200).json({
        ok: true,
        data : {
          count,
          chefs
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Upss, hubo un error",
        },
      });
    }
  },
  
};
