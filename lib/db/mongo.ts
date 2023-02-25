import mongoose from 'mongoose';
import type { Connection } from 'mongoose'

class Mongo {
    private dbUrl:string;       // 连接地址
    private connection:Connection;  // 连接示例
    
    private database:string;    // 库名
    private collection:string;  // 表名
    constructor({
        dbUrl,
        database,
        collection
    }) {
        this.dbUrl = dbUrl;
        this.connection;
        this.database = database;
        this.collection = collection;
        this.connect();
    }

    setCollection(collection:string){
        this.collection = collection;
    }

    async connect() {
        if (!this.connection) {
            this.connection = await mongoose.createConnection(this.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, authSource: 'admin', dbName: this.database })
        }
        return this.connection
    }

    async insertMany(arr:any[]){
        const connection = await this.connect();
        return await connection.collection(this.collection).insertMany(arr)
    }

    async insert(obj:Record<string,any>) {
        const connection = await this.connect();
        return await connection.collection(this.collection).insertOne(obj)
    }

    async query(condition:any, sort={date: -1}):Promise<any[]> {
        const connection = await this.connect();
        const res = connection.collection(this.collection).find(condition).sort(sort)
        return new Promise((resolve, reject) => {
            res.toArray((e, docs) => {
                e && reject(e);
                resolve(docs);
            });
        })
    }
}

export default Mongo;