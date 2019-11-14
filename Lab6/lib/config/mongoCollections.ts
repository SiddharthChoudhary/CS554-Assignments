import {MongoConnection} from './mongoConnection'
import { Collection } from 'mongodb';
let mongoConnection = new MongoConnection();

export class MongoCollection{

    public _col!: Collection;


    public async getCollection(collection: string): Promise<Collection>{
        if (!this._col) 
        {
            let db = await mongoConnection.getDatabase();
            this._col = db.collection(collection);
        }
        return this._col;
    }

}