const mongoCollections = require("../config/mongoCollections");
const tasks  = mongoCollections.tasks;
var mongodb = require('mongodb');
const uuid  = require("node-uuid");
let exportMethods={
    async checkId(id){
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
    },
    async getTasksById(id){
        id = await this.checkId(id);
        return tasks().then(taskCollection=>{
            return taskCollection.findOne({_id:id}).then(task=>{
                if(!task) throw "Task not found";
                return task;
            });
        })
    },
    async getAllTasks(){
        const tasksCollection = await tasks();
        return await tasksCollection.find({}).toArray();
    },
    async postTasks(task){
        const tasksCollection = await tasks();
        const result = await tasksCollection.insertOne(task);
        return await this.getTasksById(result.insertedId);
    },
    async updateATask(taskId,taskObject){
        taskId = await this.checkId(taskId);
        const tasksCollection = await tasks();
        const updatedTask = await tasksCollection.findOneAndUpdate({ _id: taskId }, { '$set': taskObject }, { returnOriginal: false });
        if (!updatedTask.value) {
            throw 'Updating a task fails!';
        }
        return updatedTask;
    },
    async patchATask(taskId,taskObject){
        taskId = await this.checkId(taskId);
        const tasksCollection = await tasks();
        const firstCheck = await tasksCollection.findOne({_id:taskId});
        if(taskObject.title){
            if(firstCheck.title===taskObject.title){
                return res.status(500).json({error:"Data is same for patch request"})
            }
        }
        if(taskObject.description){
            if(firstCheck.description===taskObject.description){
                return res.status(500).json({error:"Data is same for patch request"})
            }
        }
        if(taskObject.hoursEstimated){
            if(firstCheck.hoursEstimated===taskObject.hoursEstimated){
                return res.status(500).json({error:"Data is same for patch request"});
            }
        }
        if(taskObject.comment){
            if(firstCheck.comment===taskObject.comment){
                return res.status(500).json({error:"Data is same for patch request"});
            }
        }

        const updatedTask = await tasksCollection.findOneAndReplace({ _id: taskId }, taskObject, { returnOriginal: false });
        if (!updatedTask.value){
            throw 'Patching a task fails!';
        }
        return updatedTask;
    },
    async postAComment(comment,taskId){
        taskId = await this.checkId(taskId);
        comment._id= new mongodb.ObjectID();
        const tasksCollection = await tasks();
        const updatedTask = await tasksCollection.findOneAndUpdate({ _id: taskId }, { '$push': { comments: comment } }, { returnOriginal: false });
        return updatedTask;
    },
    async deleteAComment(taskId,commentId){
        commentId = await this.checkId(commentId)
        taskId = await this.checkId(taskId)
        const tasksCollection = await tasks();
        let updatedTasks = await tasksCollection.findOneAndUpdate({_id:taskId},{'$pull':{comments:{ _id:commentId } }});
        if(!updatedTasks.value){
            return "Can't delete the comment right now, quite busy. Try later";
        }
        return updatedTasks;
        }
}

module.exports = exportMethods;