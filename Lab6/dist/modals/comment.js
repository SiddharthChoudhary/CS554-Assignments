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
class Comment {
    constructor(name, comment) {
        this._id = new mongodb.ObjectId();
        this.name = name;
        this.comment = comment;
    }
    /* getters */
    // public get_id():string{
    //     return this._id;
    // }
    get_name() {
        return this.name;
    }
    get_comment() {
        return this.comment;
    }
    /* setters */
    // public set_id(_id:string):void{
    //     this._id=_id;
    // }
    set_name(name) {
        this.name = name;
    }
    set_comment(comment) {
        this.comment = comment;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map