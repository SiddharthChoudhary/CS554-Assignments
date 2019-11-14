"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = __importStar(require("mongodb"));
class Task {
    constructor(title, description, hoursEstimated, completed, comments) {
        this._id = new mongodb.ObjectId();
        this.title = title;
        this.description = description;
        this.hoursEstimated = hoursEstimated;
        this.completed = completed;
        this.comments = comments;
    }
    /*
    getters
    */
    // public getid(id:string):string{
    //     return this._id;
    // }
    gettitle(title) {
        return this.title;
    }
    getdescription(description) {
        return this.description;
    }
    gethourseEstimated(hoursEstimated) {
        return this.hoursEstimated;
    }
    getcompleted(completed) {
        return this.completed;
    }
    getcomments(comments) {
        return this.comments;
    }
    /* Setters */
    // public setid(id:string):void{
    //     this._id=id;
    // }
    settitle(title) {
        this.title = title;
    }
    setdescription(description) {
        this.description = description;
    }
    sethourseEstimated(hoursEstimated) {
        this.hoursEstimated = hoursEstimated;
    }
    setcompleted(completed) {
        this.completed = completed;
    }
    setcomments(comments) {
        this.comments = comments;
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map