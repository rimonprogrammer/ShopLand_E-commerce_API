const UserModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');

module.exports.signup = async (req, res, next) =>{
    try {
        const {name, email, password} = req.body;
        
        const emailCheck = await UserModel.findOne({email});

        if(emailCheck){
            return res.json({msg : "Email already exist", status : 'false'});
        }
        // if(!emailCheck){
        //     return res.json({msg : "Account create successfully", status : 'true'})
        // }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password : hashPassword
        });

        delete user.password;
        return res.json({ status : 'true', user});

    } catch (error) {
        next(error);
    }
};



module.exports.login = async (req, res, next) =>{
    try {
        const { email, password} = req.body;


        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({msg : "Email does not found!!", status : 'false'})
        }

        const PasswordCheck = await bcrypt.compare(password, user.password)
        if(!PasswordCheck){
            return res.json({msg : "Password does not match!!", status : 'false'})
        }
 
        delete user.password;
        return res.json({ status : 'true', user});

    } catch (error) {
        next(error);
    }
};