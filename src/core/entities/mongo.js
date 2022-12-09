import { MongoClient, ServerApiVersion } from 'mongodb';

class MongoDB {
    #database;
    #collection;
    #client;

    constructor(database, collection, uri) {
        if(database == null) return; //boş class oluşturabilmek için

        this.#database = database;
        this.#collection = collection;
        this.#client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    }

    #error(err) {
        console.error("An error occured [%s]",err)
    }

    #connect() {
        return this.#client.db(this.#database).collection(this.#collection);
    }

    async createCollection(collection) {
        await this.#client.db(this.#database).createCollection(collection);
    }

    async insertDocument(document) {
        await this.#connect().insertOne(document).catch((err) => this.#error(err));
    }

    async insertDocuments(documents) {
        await this.#connect().insertMany(documents).catch((err) => this.#error(err));
    }

    async deleteDocument(query) {
        await this.#connect().deleteOne(query).catch((err) => this.#error(err));
    }

    async deleteDocuments(query) {
        await this.#connect().deleteMany(query).catch((err) => this.#error(err));
    } 
    
    async updateDocument(query,document) {
        await this.#connect().updateOne(query,document).catch((err) => this.#error(err));
    }

    async find(query,projection) {
        return await this.#connect().find(query).project(projection).toArray().catch((err) => this.#error(err));
    }

    async dropCollection(collection) {
        await this.#client.db(this.#database).dropCollection(collection);
    }

    async close() {
        this.#client.close()
    }

}

export default MongoDB;