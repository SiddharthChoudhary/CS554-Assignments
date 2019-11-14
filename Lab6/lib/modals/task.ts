import {Comment} from './comment';
import * as mongodb from "mongodb";
export class Task{
    public _id: mongodb.ObjectID;
    public title: string;
    public description: string;
    public hoursEstimated: number;
    public completed: boolean;
    public comments: Array<Comment>;

    constructor(title: string, description: string, hoursEstimated: number, completed: boolean, comments: Array<Comment>)
    {
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
    public gettitle(title:string):string{
        return this.title;
    }
    public getdescription(description:string):string{
        return this.description;
    }
    public gethourseEstimated(hoursEstimated:number):number{
        return this.hoursEstimated;
    }
    public getcompleted(completed:boolean):boolean{
        return this.completed;
    }
    public getcomments(comments:Array<Comment>):Array<Comment>{
        return this.comments;
    }

    /* Setters */
    // public setid(id:string):void{
    //     this._id=id;
    // }
    public settitle(title:string):void{
        this.title=title;
    }
    public setdescription(description:string):void{
        this.description= description;
    }
    public sethourseEstimated(hoursEstimated:number):void{
        this.hoursEstimated=hoursEstimated;
    }
    public setcompleted(completed:boolean):void{
        this.completed=completed;
    }
    public setcomments(comments:Array<Comment>):void{
        this.comments=comments;
    }

    

}