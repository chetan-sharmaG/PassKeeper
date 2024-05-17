const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');const port = 3000
require('dotenv').config()
const bodyparser = require('body-parser')
const cors = require('cors')
const { ObjectId } = require('mongodb');


app.use(bodyparser.json())
app.use(cors())
//connection to db
console.error(process.env.MONGO_URI)
const url = process.env.MONGO_URI;

let client = new MongoClient(url
    , {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

const dbName = 'PassKeeper';

async function connectToDb() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
connectToDb()

// Database Name

app.get('/', async (req, res) => {
    res.send("Hello")
})

app.post('/getUserDataDemo', async (req, res) => {
    const body = req.body
    const db = client.db(dbName);
    const collection = db.collection(body.token);
    // const insertData = await collection.insertOne(pass)
    const findResult = await collection.find({}).toArray();
    console.log(findResult.length)
    if(findResult.length>0)
        
        res.send(findResult[0].data)
    else{
        res.send([])
    }
    // console.log(findResult[0].data)
})
app.post('/sendDataDemo', async (req, res) => {
    const body = req.body
    const db = client.db(dbName);
    const collection = db.collection(body.token);
    const filter = {}; // Since you have only one document, you don't need a filter
    const update = {
        $push: {
            data: body
        }
    };
    const insertData = await collection.updateOne(filter, update, { upsert: true });
    res.send({ success: true, result: insertData })
})
app.post('/deleteDataDemo', async (req, res) => {
    
    const body = req.body
    const db = client.db(dbName);
    const collection = db.collection(body.token);
    const filter = {}; // Since you have only one document, you don't need a filter
    const update = {
        $pull: {
            data: body
        }
    };

    const DeleteDataData = await collection.updateOne(filter, update);
    res.send({ success: true, message: DeleteDataData })    // const insertData = await collection.updateOne(
    //     { _id: pass.id }, // Filter to match the document
    //     { $push: { sendData: pass } }, // Append 'pass' to the 'sendData' array
    //     { upsert: true } // If no document matches the filter, insert a new one
    // );
})
app.post('/sendData', async (req, res) => {
    const pass = req.body
    const db = client.db(dbName);
    const collection = db.collection('Users');
    const insertData = await collection.insertOne(pass)
    // const insertData = await collection.updateOne(
    //     { _id: pass.id }, // Filter to match the document
    //     { $push: { sendData: pass } }, // Append 'pass' to the 'sendData' array
    //     { upsert: true } // If no document matches the filter, insert a new one
    // );
    res.send({ success: true, result: insertData })
})
app.post('/deleteData', async (req, res) => {
    const pass = req.body
    const db = client.db(dbName);
    const collection = db.collection('Users');
    const DeleteDataData = await collection.deleteOne(pass)
    res.send({ success: true, message: DeleteDataData })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})