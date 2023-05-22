const { getCountChefs } = require("../../services/chefsServices");
const { getCountCourses } = require("../../services/coursesServices");
const { getCountUsers } = require("../../services/usersServices");

module.exports = {
  metrics: async (req, res) => {
    try {

        const totalCourses = await getCountCourses();
        const totalChefs = await getCountChefs();
        const totalUsers = await getCountUsers();
        
        return res.status(200).json({
            ok : true,
            data : {
                totalCourses,
                totalChefs,
                totalUsers
            }
        })

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
