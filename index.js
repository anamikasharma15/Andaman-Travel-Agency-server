const express = require('express');
const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${ process.env.DB_PASS}@cluster0.wq1g6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db("andamanTravellers");
        const servicesCollection = database.collection("services");

        // GET API

        app.get('/services', async(req, res) =>{
            console.log('hit the post api', );

            const result = await servicesCollection.find({}).toArray();
            res.json(result)

        
        });

        //    Get single service
// app.get('/services/:id', async (req, res)=>
//  const id = req.params.id;
//  console.log('getting specific id',id);
//     const query = {_id: ObjectId(id)};
// const service = await servicesCollection.findOne(query);
// res.json(service);
// }


        // POST API
        app.post('/services', async(req, res) =>{
            console.log('hit the post api', );

            const result = await servicesCollection.insertOne(req.body);
            res.json(result)

            // const service = {
            //     "name":"Singapore",
            // "description":"Torisum in Singapor is a major industry and contributor to the Singpore economy.",

            // "img":"https://top10tale.com/wp-content/uploads/2016/04/singapore-tourist-attraction.png"
            // }

            // const result = await servicesCollection.insertOne(service);
            //  console.log(result);
            // res.json(result);
        });

        // Delete Api
app.delete('services/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
     const result = await servicesCollection.deleteOne(query);
     res.json(result);
})

        

     
// // post api
        // app.post('/services', async(req, res) =>{
        //     console.log('hit the post api', );

        //     const result = await servicesCollection.insertOne(req.body);
        //     res.json(result)
            
        // });


        // console.log('connected to database');

    }
    finally{
        // await client.close();
    }

}

run().catch(console.dir);



app.get('/',(req, res) => {
    res.send('Running Genius Server');
});

app.listen(port, () => {
    console.log('Running Genius Server o port', port);
})