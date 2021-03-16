const express = require('express');
const app = new express();

const MongoClient = require("mongodb").MongoClient;
const DB_URI = 'mongodb+srv://root:1234@cluster0.jonfs.mongodb.net/test?authSource=admin&replicaSet=atlas-5z7n9i-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';


var db;
MongoClient.connect(DB_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db("so1"); //nombre db
});
  

app.use(express.json({ limit: '5mb', extended: true }));

app.post('/', async (req, res) => {
    const data = req.body;
    try {
        let collection = db.collection("rabbitmq");  //nombre de colección
        let result = await collection.insertOne(data);
        res.json(result.ops[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

app.get('/', (req, res) => {
    res.json({message: 'OK'})
});

app.listen(5000);