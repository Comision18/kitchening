const db = require("../database/models");

module.exports = {
  loginAndRegisterGoogle: async (req, res) => {
    const {
      provider,
      photos: [{ value: picture }],
      emails: [{ value: email }],
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
        rol: rolId,
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
    const {
      provider,
      photos: [{ value: image }],
      id: socialId,
    } = req.session.passport.user;
    const [name, surname] = displayName.split(" ");
    try {
      const address = await db.Address.create();
      const [{ id, rolId }, isCreate] = await db.User.findOrCreate({
        where: {
          socialId,
        },
        defaults: {
          name,
          surname,
          email: "user@facebook.com",
          image,
          addressId: address.id,
          socialId,
          socialProvider: provider,
        },
      });

      if (!isCreate) {
        await address.destroy();
      }

      req.session.userLogin = {
        id,
        name,
        rol: rolId,
      };

      res.cookie("userKitchening18", req.session.userLogin, {
        maxAge: 1000 * 60,
      });

      res.redirect("/users/profile");
    } catch (error) {
      console.log(error);
    }
  },
};
