const db = require('../database/models');

module.exports = {
    getAllChefs : async () => {
      try {
        const { count, rows: chefs } = await db.Chef.findAndCountAll({
          order : [['name']]
        });
        return {
          chefs,
          count,
        };
      } catch (error) {
        console.log(error);
        throw {
          status: 500,
          message: error.message,
        };
      }
    },
    getChefById : async () => {

    },
    verifyUserByEmail : async (email) => {
    },
    getCountChefs : async () => {
        try {
    
          const totalChefs = await db.Chef.count();
    
          return totalChefs
          
        } catch (error) {
          console.log(error);
          throw {
            status: 500,
            message: error.message,
          };
        }
      }
}