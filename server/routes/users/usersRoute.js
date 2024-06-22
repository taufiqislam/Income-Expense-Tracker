const express = require('express');
const { registerUserCtrl, loginUserCtrl, userProfileCtrl, deleteUserCtrl, updateUserCtrl } = require('../../controllers/users/usersCtrl');
const isLogin = require('../../middlewares/isLogin');

const usersRoute = express.Router();

usersRoute.post("/register", registerUserCtrl);

usersRoute.post("/login", loginUserCtrl);

usersRoute.get("/profile", isLogin, userProfileCtrl);

usersRoute.delete("/", isLogin, deleteUserCtrl);

usersRoute.put("/", isLogin, updateUserCtrl);


module.exports = usersRoute;

