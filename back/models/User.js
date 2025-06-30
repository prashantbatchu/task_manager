const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required : true,
        unique : true,
    },
    password:{
        type: String,
        required : true,
    },
},{
    timestamps : true,
})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next();
    }
    const sss = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}

const User = mongoose.model("User",userSchema);

module.exports = User;