const db = require("../database/models");

module.exports = {
  loginAndRegisterGoogle: async (req, res) => {
    const {
      provider,
      photos: [{ value: picture }],
      emails: [{value: email}],
      _json: { sub: googleId, given_name: name, family_name: surname },
    } = req.session.passport.user;

    try {
      const address = await db.Address.create();
      const [{ id, rolId }, isCreate] = await db.User.findOrCreate({
        where: {
          socialId: googleId,
        },
        defaults: {
          name,
          surname,
          email,
          image: picture,
          addressId: address.id,
          socialId: googleId,
          socialProvider: provider,
        },
      });

      if (!isCreate) {
        await address.destroy();
      }

      req.session.userLogin = {
        id,
        name,
        rol: rolId
      };

      res.cookie("userKitchening18", req.session.userLogin, {
        maxAge: 1000 * 60,
      });

      res.redirect("/users/profile");
    } catch (error) {
      console.log(error);
    }
  },
  loginAndRegisterFacebook: async (req, res) => {
    res.json(req.session.passport.user)
   /*  const {
      provider,
      photos: [{ value: picture }],
      emails: [{value: email}],
      _json: { sub: googleId, given_name: name, family_name: surname },
    } = req.session.passport.user;

    try {
      const address = await db.Address.create();
      const [{ id, rolId }, isCreate] = await db.User.findOrCreate({
        where: {
          socialId: googleId,
        },
        defaults: {
          name,
          surname,
          email,
          image: picture,
          addressId: address.id,
          socialId: googleId,
          socialProvider: provider,
        },
      });

      if (!isCreate) {
        await address.destroy();
      }

      req.session.userLogin = {
        id,
        name,
        rol: rolId
      };

      res.cookie("userKitchening18", req.session.userLogin, {
        maxAge: 1000 * 60,
      });

      res.redirect("/users/profile");
    } catch (error) {
      console.log(error);
    } */
  },
};
