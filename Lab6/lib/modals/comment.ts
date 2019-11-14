import * as mongodb from 'mongodb';
export class Comment{ 
    private _id: mongodb.ObjectId;
    private name: string;
    private comment: string;

    constructor(name: string, comment: string)
    {
        this._id = new mongodb.ObjectId();
        this.name = name;
        this.comment = comment;
    }

    /* getters */
    // public get_id():string{
    //     return this._id;
    // }
    public get_name():string{
        return this.name;
    }
    public get_comment():string{
        return this.comment;
    }

    /* setters */
    // public set_id(_id:string):void{
    //     this._id=_id;
    // }
    public set_name(name:string):void{
        this.name=name;
    }
    public set_comment(comment:string):void{
        this.comment=comment;
    }

}