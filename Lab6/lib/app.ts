import express from 'express';
import * as bodyParser from 'body-parser';
import {Request, Response} from 'express';
import {Tasks} from './data/tasks';
import {Comment} from './modals/comment';
import { Task } from './modals/task';
// import {task} from './modals/task';
// import tasks from '.tasks';

class App {
    public tasksData:Tasks = new Tasks();
    constructor() {
        this.app = express();
        this.config();
        this.routes(this.app);
    }
     
//   public taskRoute:tasks=new tasks();
  public app: express.Application;

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
  }
  private routes(router: express.Application):void{
    // const router = express.Router();
    router.get("/api/tasks/", async(req:Request,res:Response)=>{
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
            let task = await this.tasksData.getAllTasks();
            return res.json(task.slice(skip, skip + take));
    }catch(e){
        return res.status(500).json({error:"Something's wrong with get query"})
    }
    })
    router.get("/api/tasks/:id",async(req:Request,res:Response)=>{
        try{
        const tasks = await this.tasksData.getTasksById(req.params.id);
        res.json(tasks);
        }catch(e){
            res.status(404).json({error:"Not found"})
        }
    })
    router.post('/api/tasks', async (req:Request, res:Response) => {
        const {title,description,hoursEstimated} = req.body;
        if (!title || !description || !hoursEstimated) {
            return res.status(500).json({ status: 500, error: 'The required information is not given!' });
        }
        const tasks = new Task(title,description,hoursEstimated,false,[]);

        let postedTask;
        try {
            postedTask = await this.tasksData.postTasks(tasks);
        } catch (e) {
            return res.status(500).json({ status: 500, error: e });
        }

        return res.json(postedTask);
    });
    router.put("/api/tasks/:id",async(req:Request,res:Response)=>{
        try{
            const objec = req.body;
            if(!req.params.id){
                return res.status(500).json({error:"Object is not formatted"});
            }
            const {title,description,hoursEstimated,completed,comments} = req.body;
            if(!title|| typeof title !== "string" || !description || typeof description !== "string" || !hoursEstimated || isNaN(hoursEstimated) || !completed){
            return res.status(500).json({error:"Object is not in perfect format"});
            }
            const task = await this.tasksData.updateATask(req.params.id,objec);
            res.json(task);
        }catch(e){
            res.status(500).json({error:"Error while applying put method"})
        }
    })
    router.patch("/api/tasks/:id",async(req:Request,res:Response)=>{
        try{
            const objec = req.body;
            const task = await this.tasksData.patchATask(req.params.id,objec);
            res.json(task);
        }catch(e){
            res.status(500).json({error:"Patch error"})
        }
    })
    router.post("/api/tasks/:id/comments",async(req:Request,res:Response)=>{
        try{
            let {name,comment} = req.body;
            let commentObject = new Comment(name,comment);
            if(typeof comment != 'string' || typeof name != 'string'){
                return res.status(500).json({error:"Comment or name is not string"});
            }
            const task = await this.tasksData.postAComment(commentObject,req.params.id)
            res.json(task)
        }catch(e){
            res.status(500).json({error:e})
        }
    })
    router.delete("/api/tasks/:taskId/:commentId",async(req:Request,res:Response)=>{
        try{
            const task = await this.tasksData.deleteAComment(req.params.taskId,req.params.commentId)
            res.json(task)
        }catch(e){
            res.status(500).send()
        }
    })
  }
}

export default new App().app;