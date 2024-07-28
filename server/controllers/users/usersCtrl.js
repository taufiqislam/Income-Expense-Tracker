const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const { appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");

const registerUserCtrl = async(req,res,next) => {
    const {fullname, password, email} = req.body;

    try {
        //check if email exists
        const userFound = await User.findOne({email});
        if(userFound) {
           return next( appErr("User Already Exists!!"));
        }


        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });
        res.json({
            status: "Success",
            fullname: user.fullname,
            email: user.email,
            id: user._id,
        });
    } catch (error) {
        next(appErr(error.message, 500));
    }
};

const loginUserCtrl = async(req,res,next) => {
    const {email, password} = req.body;
    try {
        //check if email exists
        const userFound = await User.findOne({email});
        if(!userFound) return next(appErr("Invalid login credentials"));

        //check for password
        const isPasswordMatch = await bcrypt.compare(password,userFound.password);
        if(!isPasswordMatch) {
            return next(appErr("Invalid login credentials"));
        }

        res.json({
            status: "success",
            fullname: userFound.fullname,
            id: userFound._id,
            token: generateToken(userFound._id),
        });
    } catch (error) {
        next(appErr(error.message, 500));
    }
};

const userProfileCtrl = async(req,res,next) => {
    
    try {
        const user = await User.findById(req.user).populate({
            path: "accounts",
            populate: {
                path: "transactions",
                "model" : "Transaction",
            }
        });
        res.json(user);
    } catch (error) {
        next(appErr(error.message, 500));
    }
};

const deleteUserCtrl = async(req,res,next) => {
    try {
        const user = await User.findById(req.user);
        await user.remove();
        res.status(200).json({
            status: "succss",
            data: null,
        });
    } catch (error) {
        next(appErr(error.message, 500));    
    }
};

const updateUserCtrl = async(req,res,next) => {
    try {
        if(req.body.email){
            const userFound = await User.findOne({email: req.body.email});
            if(userFound) return next(appErr("Email is taken or you already have this email", 400));
        }
        

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);
            const user = await User.findByIdAndUpdate(req.user, {
                password: hashedPassword,
            },{
                new: true,
                runValidators: true,
            });
            return res.status(200).json({
                status : "success",
                data: user,
            });
        }

        const user = await User.findByIdAndUpdate(req.user, req.body,{
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status : "success",
            data: user,
        });
    } catch (error) {
        next(appErr(error.message, 500));
    }
};

const uploadImageCtrl = async(req,res,next) => {
    try {

        const user = await User.findByIdAndUpdate(req.body.user, {imageUrl: req.file.filename},{
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status : "success",
            data: user,
        });
    } catch (error) {
        next(appErr(error.message, 500));
    }
};



module.exports = {
    registerUserCtrl,
    loginUserCtrl,
    userProfileCtrl,
    deleteUserCtrl,
    updateUserCtrl,
    uploadImageCtrl,
};