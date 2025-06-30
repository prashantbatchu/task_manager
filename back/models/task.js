const mongoose = require('mongoose');

const taskschema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    priority:{
        type:String,
        // required: true,
        enum: ['low' , 'medium' , 'high'],
        default: 'medium'
    },
    status:{
        type:String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    duedate:{
        type:Date,
        required: true,
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task',taskschema);
module.exports = Task;