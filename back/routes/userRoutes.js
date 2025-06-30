const User = require('../models/User.js');
const generateToken = require('../utils/generateToken.js'); 

const {protect} = require('../middleware/authMiddleware.js');
// const { use } = require('react');
// const e = require('express');
const express = require('express');

const router = express.Router();

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User Already exists'});
        }
        const user = await User.create({name,email,password});
        if(user){
            generateToken(res,user._id),
            res.status(201).json({
                _id:user._id,
                name: user.name,
                email: user.email,
                // token: generateToken(user._id),
            });
        }
        else{
            return res.status(400).json({message: 'INVALID'});
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});



router.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id),
        res.json({
            _id:user._id,
            email : user.email,
            name: user.name,
            // token: generateToken(user._id),
        })
    }
    else{
        return res.status(401).json({message: 'INVALID EMAIL OR PASSWORD'});
    }
});


router.get('/profile',protect, async(req,res) =>{
    const user = await User.findById(req.user._id).select('-password');
    if(user){
        res.json({
            _id: user._id,
            name : user.name,
            email:user.email,
        });
    }
    else{
        res.status(404).json({message: 'user doesnt exist'});
    }
})

router.put('/profile',protect, async(req,res) =>{
    const {name , currpassword , newpassword} = req.body;
    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).json({message: 'user doesnt exist'});
    }   
    if(name){
        user.name = name;
    }

    if(currpassword && newpassword){
        if(await user.matchPassword(currpassword)){
            user.password = newpassword;
        }
        else{
            return res.status(401).json({message: 'current password is incorrect'});
        }
    }
    try{
        const updateduser = await user.save();
        res.json({
            _id: updateduser._id,
            name: updateduser.name,
            email:updateduser.email,
        })
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

});


router.post('/logout', async(req,res) =>{
    res.cookie('jwt','',{
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
    })
    // res.clearCookie
    res.status(200).json({message: 'logout successfully'});
})


module.exports = router;

