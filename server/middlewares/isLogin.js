const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");



const isLogin = (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);

    req.user = decodedUser.id;
    if(!decodedUser){
        return next(appErr("Invalid/Expired Token, Please login again", 401));
    }
    next();
}

module.exports = isLogin;
