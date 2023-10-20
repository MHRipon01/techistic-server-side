const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { config } = require("dotenv");
//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sarjove.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db("productDB").collection("product");
    const cartedProductCollection = client.db("cartDB").collection("cartedProduct")

    app.post("/product", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    app.get("/product", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/product/:brand", async (req, res) => {
      const brandName = productCollection.find({ category: req.params.brand });
      const result = await brandName.toArray();

      res.send(result);
    });


    //carted product
    app.get('/cartedProduct/:email', async(req,res) => {
      const cursor = cartedProductCollection.find({email:req.params.email});
      const products = await cursor.toArray();
      res.send(products)
    })


    app.post('/cart' , async(req,res) => {
      const cart = req.body;
      console.log(cart);
      const result = await cartedProductCollection.insertOne(cart)
      res.send(result)
    })



    app.get("/productDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);

      // const product = productCollection.find({id:req.params._id});
      // const result = await product.toArray()
      res.send(result);
    });

    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updatedProduct = req.body;
      const product = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          category: updatedProduct.category,
          photo: updatedProduct.photo,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          
        },
      };

      const result = await productCollection.updateOne(
        filter,
        product,
        options
      );
      res.send(result);
    });

    app.get("/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    // perform actions on the collection object
    //   productCollection.find({ category: "Nokia" }).toArray(function(err, result) {

    //     console.log(result);
    //   });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//checking the server is working or not
app.get("/", (req, res) => {
  res.send("techistic server is running");
});
app.listen(port, () => {
  console.log(`techistic server is running on port ${port}`);
});
