import * as mongodb from 'mongodb';

let mongoConfig = {
  serverUrl: "mongodb://localhost:27017/",
  database: "Choudhary-Siddharth-CS554-Lab1"
};

let mongoClient = mongodb.MongoClient;

export class MongoConnection{
    public _connection!: mongodb.MongoClient;
    public _db!: mongodb.Db;

    public async getDatabase(): Promise<mongodb.Db>
    {
        if(!this._connection)
        {
            this._connection = await mongoClient.connect(mongoConfig.serverUrl, { useNewUrlParser: true });
            this._db = await this._connection.db(mongoConfig.database);
        }
        return this._db;
    }
}