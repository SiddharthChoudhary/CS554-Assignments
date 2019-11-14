import * as mongodb from 'mongodb';
import {MongoCollection} from '../config/mongoCollections'; 
import {Task} from '../modals/task';
import {Comment} from '../modals/comment';
import {Collection} from 'mongodb';
export class Tasks{
    public mongoCollection: MongoCollection;

    constructor(){
        this.mongoCollection = new MongoCollection();
    }
    public async checkId(id:any):Promise<mongodb.ObjectID>{
        let valid = false;
        if (!id) throw "You must provide an id to search for";
        if(typeof id != "string" && typeof id != "object"){
            throw "Id is not a string"
        }
        if(typeof id == "string")
        {
        // console.log(id)
            if (id.length == 12 || id.length == 24) {
                valid = /^[0-9a-fA-F]+$/.test(id);
            }
            if(!valid){
                throw "Not a valid string"
            }
            else{
            id = new mongodb.ObjectID(id);
            }
        }
        return id;
    };
    public async getTasksById(id:any):Promise<Task>{
        id = await this.checkId(id);
        const tasksCollection: Collection = await this.mongoCollection.getCollection("CS554-Lab7");
        let result = await tasksCollection.findOne({_id:id});
        return result;
    };
    public async getAllTasks():Promise<Array<Task>>{
        const tasksCollection: Collection = await this.mongoCollection.getCollection("CS554-Lab7");
        let result:Array<Task>= await tasksCollection.find({}).toArray();
        return result;
    };
    public async postTasks(task:Task):Promise<Task>{
        const tasksCollection: Collection = await this.mongoCollection.getCollection("CS554-Lab7");
        const result = await tasksCollection.insertOne(task);
        let resultOut: Task = await this.getTasksById(result.insertedId);
        return resultOut;
    };
    public async updateATask(taskId:any,taskObject:Task):Promise<Task>{
        taskId = await this.checkId(taskId);
        const tasksCollection: Collection = await this.mongoCollection.getCollection("CS554-Lab7");
        const updatedTask = await tasksCollection.updateOne({ _id: taskId }, { '$set': taskObject });
        if (!updatedTask) {
            throw 'Updating a task fails!';
        }
        return await this.getTasksById(taskId);
    };
    public async patchATask(taskId:any,taskObject:Task){
        taskId = await this.checkId(taskId);
        const tasksCollection: Collection = await this.mongoCollection.getCollection("CS554-Lab7");
        const firstCheck = await tasksCollection.findOne({_id:taskId});
        if(taskObject.title){
            if(typeof taskObject.title !== "string")
                throw "Data format error";
            if(firstCheck.title===taskObject.title){
                throw  'Data is same for patch request';
        }
    }
        if(taskObject.description){
            if(firstCheck.description===taskObject.description){
                throw 'Data is same for patch request';
            }
        }
        if(taskObject.hoursEstimated){
            if(firstCheck.hoursEstimated===taskObject.hoursEstimated){
                throw 'Data is same for patch request';
            }
        }
        const updatedTask = await tasksCollection.updateOne({ _id: taskId }, {'$set':taskObject});
        if (!updatedTask){
            throw 'Patching a task fails!';
        }
        return updatedTask;
    };
    public async postAComment(comment:Comment,taskId:any):Promise<Task>{
        taskId = await this.checkId(taskId);
        const tasksCollection: Collection = await this.mongoCollection.getCollection("CS554-Lab7");
        const updatedTask = await tasksCollection.findOneAndUpdate({ _id: taskId }, { '$push': { comments: comment } }, { returnOriginal: false });
        return await this.getTasksById(taskId);
    };
    public async deleteAComment(taskId:any,commentId:any):Promise<Task>{
        commentId = await this.checkId(commentId)
        taskId = await this.checkId(taskId)
        const tasksCollection: Collection = await this.mongoCollection.getCollection("CS554-Lab7");
        let updatedTasks = await tasksCollection.findOneAndUpdate({_id:taskId},{'$pull':{comments:{ _id:commentId } }});
        if(!updatedTasks.value){
            throw "Can't delete the comment right now, quite busy. Try later";
        }
        return await this.getTasksById(taskId);
        }
}