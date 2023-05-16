const passport = require("passport");
const { loginAndRegisterGoogle, loginAndRegisterFacebook } = require("../controllers/authController");

const router = require("express").Router();

passport.serializeUser((user,done) => done(null,user))
passport.deserializeUser((user,done) => done(null,user))


/* /auth */
router
  .get("/login/google", passport.authenticate("google"))
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/users/login" }),
    loginAndRegisterGoogle
  )

  .get("/login/facebook", passport.authenticate("facebook"))
  .get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/users/login" }),
    loginAndRegisterFacebook
  );

module.exports = router;