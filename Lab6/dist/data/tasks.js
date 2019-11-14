"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = __importStar(require("mongodb"));
const mongoCollections_1 = require("../config/mongoCollections");
class Tasks {
    constructor() {
        this.mongoCollection = new mongoCollections_1.MongoCollection();
    }
    checkId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let valid = false;
            if (!id)
                throw "You must provide an id to search for";
            if (typeof id != "string" && typeof id != "object") {
                throw "Id is not a string";
            }
            if (typeof id == "string") {
                // console.log(id)
                if (id.length == 12 || id.length == 24) {
                    valid = /^[0-9a-fA-F]+$/.test(id);
                }
                if (!valid) {
                    throw "Not a valid string";
                }
                else {
                    id = new mongodb.ObjectID(id);
                }
            }
            return id;
        });
    }
    ;
    getTasksById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            id = yield this.checkId(id);
            const tasksCollection = yield this.mongoCollection.getCollection("CS554-Lab7");
            let result = yield tasksCollection.findOne({ _id: id });
            return result;
        });
    }
    ;
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasksCollection = yield this.mongoCollection.getCollection("CS554-Lab7");
            let result = yield tasksCollection.find({}).toArray();
            return result;
        });
    }
    ;
    postTasks(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasksCollection = yield this.mongoCollection.getCollection("CS554-Lab7");
            const result = yield tasksCollection.insertOne(task);
            let resultOut = yield this.getTasksById(result.insertedId);
            return resultOut;
        });
    }
    ;
    updateATask(taskId, taskObject) {
        return __awaiter(this, void 0, void 0, function* () {
            taskId = yield this.checkId(taskId);
            const tasksCollection = yield this.mongoCollection.getCollection("CS554-Lab7");
            const updatedTask = yield tasksCollection.updateOne({ _id: taskId }, { '$set': taskObject });
            if (!updatedTask) {
                throw 'Updating a task fails!';
            }
            return yield this.getTasksById(taskId);
        });
    }
    ;
    patchATask(taskId, taskObject) {
        return __awaiter(this, void 0, void 0, function* () {
            taskId = yield this.checkId(taskId);
            const tasksCollection = yield this.mongoCollection.getCollection("CS554-Lab7");
            const firstCheck = yield tasksCollection.findOne({ _id: taskId });
            if (taskObject.title) {
                if (typeof taskObject.title !== "string")
                    throw "Data format error";
                if (firstCheck.title === taskObject.title) {
                    throw 'Data is same for patch request';
                }
            }
            if (taskObject.description) {
                if (firstCheck.description === taskObject.description) {
                    throw 'Data is same for patch request';
                }
            }
            if (taskObject.hoursEstimated) {
                if (firstCheck.hoursEstimated === taskObject.hoursEstimated) {
                    throw 'Data is same for patch request';
                }
            }
            const updatedTask = yield tasksCollection.updateOne({ _id: taskId }, { '$set': taskObject });
            if (!updatedTask) {
                throw 'Patching a task fails!';
            }
            return updatedTask;
        });
    }
    ;
    postAComment(comment, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            taskId = yield this.checkId(taskId);
            const tasksCollection = yield this.mongoCollection.getCollection("CS554-Lab7");
            const updatedTask = yield tasksCollection.findOneAndUpdate({ _id: taskId }, { '$push': { comments: comment } }, { returnOriginal: false });
            return yield this.getTasksById(taskId);
        });
    }
    ;
    deleteAComment(taskId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            commentId = yield this.checkId(commentId);
            taskId = yield this.checkId(taskId);
            const tasksCollection = yield this.mongoCollection.getCollection("CS554-Lab7");
            let updatedTasks = yield tasksCollection.findOneAndUpdate({ _id: taskId }, { '$pull': { comments: { _id: commentId } } });
            if (!updatedTasks.value) {
                throw "Can't delete the comment right now, quite busy. Try later";
            }
            return yield this.getTasksById(taskId);
        });
    }
}
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map