import jwt from "jsonwebtoken";

import User from '../models/user.js';
import bcript from 'bcrypt';
export const register =  async(req,res)=>{
    try {
     /* const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json(errors.array());
     } */
 
     const password = req.body.password;
     const salt = await bcript.genSalt(10);
     const hash = await bcript.hash(password, salt);
 
     const doc = new User({
         email: req.body.email,
         fullName: req.body.fullName,
         passwordHash: hash,
         avatarUrl: req.body.avatarUrl,
     })
 
     const user = await doc.save();
 
     const token = jwt.sign({
         _id: user._id,
     }, 'sectret123',{
         expiresIn: '30d'
     });
     const {passwordHash, ...UserData} = user._doc;
 
     res.json({...UserData, token})
    } catch (error) {
     console.log(error)
     res.status(500).json(error)
    };
 }

 export const login = async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return req.status(404).json({
                message: 'Нет пользователя в базе данных'
            })
        }
        const isValidPass = await bcript.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass){
            return req.status(404).json({
                message: 'неверный логин или пароль'
            })
        }
         const token = jwt.sign({
        _id: user._id,
    }, 'sectret123',{
        expiresIn: '30d'
    });
    const {passwordHash, ...UserData} = user._doc;
    res.json({...UserData, token})
    } catch (error) {
        console.log(error)
    res.status(500).json(error)
    }
}

export const getMe = async(req, res)=> {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(404).json({
                message: 'пользователь не наеден'
            })
        }
        const {passwordHash, ...UserData} = user._doc;

        res.json(UserData)
        
    } catch (error) {
        console.log(error)
    res.status(500).json({message: error})
    }
}