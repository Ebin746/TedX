const routes = require("express").Router();

const {signup, login,forgotPassword,resetPassword} = require("../controllers/auth");

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/forgot-password",forgotPassword);
routes.post("/reset-password/:token",resetPassword)
module.exports = routes;
