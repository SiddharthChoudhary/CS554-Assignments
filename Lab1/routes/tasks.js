const express = require("express");
const router  = express.Router();
const data = require("../data")

const tasksData = data.tasks
router.get("/", async(req,res)=>{
        try {   
            let { skip=0, take=20 } = req.query;
        if (skip) {
            if (!Number.isInteger(parseFloat(skip))) {
                return res.status(500).json({error: 'skip should be integer' });
            } else {
                skip = parseInt(skip);
            }
        }
        if (take) {
            if (!Number.isInteger(parseFloat(take))) {
                return res.status(500).json({error: 'take should be integer' });
            } else {
                take = parseInt(take) > 100 ? 100 : parseInt(take);
            }
        }
            let task = await tasksData.getAllTasks();
            return res.json(task.slice(skip, skip + take));
    }catch(e){
        return res.status(500).json({error:"Something's wrong with get query"})
    }
})
router.get("/:id",async(req,res)=>{
    try{
    const tasks = await tasksData.getTasksById(req.params.id);
    res.json(tasks);
    }catch(e){
        res.status(404).json({error:"Not found"})
    }
})
router.post('/', async (req, res) => {
    const {title,description,hoursEstimated} = req.body;
    if (!title || !description || !hoursEstimated) {
        return res.status(500).json({ status: 500, error: 'The required information is not given!' });
    }
    const tasks = {
        title,
        description,
        hoursEstimated,
        completed: false,
        comments: []
    };

    let postedTask;
    try {
        postedTask = await tasksData.postTasks(tasks);
    } catch (e) {
        return res.status(500).json({ status: 500, error: e });
    }

    return res.json(postedTask);
});
router.put("/:id",async(req,res)=>{
    try{
        const objec = req.body;
        if(!req.params.id){
            return res.status(500).json({error:"Object is not formatted"});
        }
        const {id,title,description,hoursEstimated,completed,comments} = req.body;
        if(!id || !title || !description || !hoursEstimated || !completed || !comments){
           return res.status(500).json({error:"Object is not in perfect format"});
        }
        const task = await tasksData.updateATask(req.params.id,objec);
        res.json(task.value);
    }catch(e){
        res.status(500).json({error:"Error while applying put method"})
    }
})
router.patch("/:id",async(req,res)=>{
    try{
        const objec = req.body;
        const task = await tasksData.patchATask(req.params.id,objec);
        res.json(task.value);
    }catch(e){
        res.status(500).json({error:"Patch error"})
    }
})
router.post("/:id/comments",async(req,res)=>{
    try{
        let {name,comment} = req.body;
        let commentObject = {
            name,
            comment
        }
        if(typeof comment != 'string' || typeof name != 'string'){
            return res.status(500).json({error:"Comment or name is not string"});
        }
        const task = await tasksData.postAComment(commentObject,req.params.id)
        res.json(task)
    }catch(e){
        res.status(500).json({error:e})
    }
})
router.delete("/:taskId/:commentId",async(req,res)=>{
    try{
        const task = await tasksData.deleteAComment(req.params.taskId,req.params.commentId)
        res.json(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router;