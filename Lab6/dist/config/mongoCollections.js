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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoConnection_1 = require("./mongoConnection");
let mongoConnection = new mongoConnection_1.MongoConnection();
class MongoCollection {
    getCollection(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._col) {
                let db = yield mongoConnection.getDatabase();
                this._col = db.collection(collection);
            }
            return this._col;
        });
    }
}
exports.MongoCollection = MongoCollection;
//# sourceMappingURL=mongoCollections.js.map