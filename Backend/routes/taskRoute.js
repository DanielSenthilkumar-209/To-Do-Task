const express=require('express');

const router=express.Router()

const {createTask,getTasks, getOneTask,findUpdate,findAndDelete} =require('../controllers/taskController');

router.post('/create',createTask);
router.get('/',getTasks);
router.get("/find/:id",getOneTask);
router.put("/update/:id",findUpdate);
router.delete("/delete/:id",findAndDelete)

module.exports=router;