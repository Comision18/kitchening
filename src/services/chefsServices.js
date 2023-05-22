const db = require('../database/models');

module.exports = {
    getAllChefs : async () => {

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