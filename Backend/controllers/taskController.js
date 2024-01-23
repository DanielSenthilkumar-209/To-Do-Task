const {mongoose} = require("mongoose");
const taskmodel=require("../models/Taskmodel");


const createTask=async(req,res)=>{
    const {title,description}=req.body
    try{
        const Task=await taskmodel.create({title,description})
        res.status(200).json()
    }catch(e){
        res.status(400).json({error:e.message});
    }
};


const getTasks=async(req,res)=>{
    try{
        const tasks=await taskmodel.find({});
        res.status(200).json(tasks);
    }catch(e){
        res.status(400).json({error:e.message});
    }
}

const getOneTask=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({message:"Task not found"});
    try{
        const singletask=await taskmodel.findById(id)
        res.status(200).json(singletask);
    }catch(e){res.status(400).json({error:e.message});}
}

const findUpdate=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error:"Task not found"});
    try{
        const task = await taskmodel.findByIdAndUpdate({
            _id:id},
            {
                ...req.body,
            });
        res.status(200).json(task);
    }catch(e){
        res.status(400).json({error:e.message});
    }
}

const findAndDelete=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error:"Task not found"});
    try{
        const task = await taskmodel.findByIdAndDelete(id);
        res.status(200).json(task);
    }catch(e){
        res.status(400).json({error:e.message});
    }
}

module.exports={createTask,getTasks,getOneTask,findUpdate,findAndDelete};