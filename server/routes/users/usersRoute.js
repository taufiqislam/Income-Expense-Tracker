const express = require('express');
const { registerUserCtrl, loginUserCtrl, userProfileCtrl, deleteUserCtrl, updateUserCtrl , uploadImageCtrl} = require('../../controllers/users/usersCtrl');
const isLogin = require('../../middlewares/isLogin');
const upload = require('../../multer');

const usersRoute = express.Router();

usersRoute.post("/register", registerUserCtrl);

usersRoute.post("/login", loginUserCtrl);

usersRoute.get("/profile", isLogin, userProfileCtrl);

usersRoute.delete("/", isLogin, deleteUserCtrl);

usersRoute.put("/", isLogin, updateUserCtrl);

usersRoute.put('/upload',upload.single('file'), uploadImageCtrl);


module.exports = usersRoute;

