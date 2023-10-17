const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { config } = require('dotenv');
//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sarjove.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db('productDB').collection('product')

    app.post('/product' , async(req,res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct)
        res.send(result)
    })

    app.get('/product', async(req,res) => {
        const cursor = productCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })




  // perform actions on the collection object
//   productCollection.find({ category: "Nokia" }).toArray(function(err, result) {
   
//     console.log(result);
//   });




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











//checking the server is working or not
app.get('/' , (req,res) => {
    res.send('techistic server is running')
})
app.listen(port , () => {
    console.log(`techistic server is running on port ${port}`);
})