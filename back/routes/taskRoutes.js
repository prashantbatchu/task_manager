const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Task = require('../models/task');

const router = express.Router();

router.post('/',protect, async(req,res)=>{
    const {title,desciption,priority,status,duedate} = req.body;
    const task = await Task.create({
        user: req.user._id,
        title,
        desciption,
        priority,
        status,
        duedate
    })
    res.status(201).json(task);
})

router.get('/',protect, async(req,res)=>{
    const tasks = await Task.find({user: req.user._id})
    res.json(tasks);
})

router.put('/:id',protect,async(req,res)=>{
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(401).json({message:'Task not found'});
    }
    if(task.user.toString() !== req.user._id.toString()){
        return res.status(401).json({message:'unauthorized user no update'});
    }
    task.title= req.body.title || task.title;
    task.desciption= req.body.desciption || task.desciption;
    task.priority= req.body.priority || task.priority;
    task.status= req.body.status || task.status;
    task.duedate= req.body.duedate|| task.duedate;

    const updateTask  = await task.save();
    res.json(updateTask);

})


router.delete('/:id',protect,async(req,res)=>{
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({message: "no task found"});
    }
    if(task.user.toString()!==req.user._id.toString()){
        return res.status(401).json({message:"not authoized to delete this task"});
    }
    await task.deleteOne();
    res.json({message:"Task removed"});

})


module.exports = router;
