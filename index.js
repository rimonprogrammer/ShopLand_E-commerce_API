const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoute = require('./Routes/UserRoute')

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(('/api/auth'), UserRoute); 


app.get('/', (req, res) =>{
    res.send("Hello, I'm active in React E-commerce project")
});



// >>>>>>>> Mongoose connection starting <<<<<<<<<<
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Mongoose connected successfully")
}).catch(()=>{
    console.log("No connection with mongoose")
})
// >>>>>>>> Mongoose connection ending <<<<<<<<<< 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  await client.connect();
  console.log("You successfully connected to MongoDB!");

  const db = await client.db('test');
  const product = await db.collection('Products');

  app.get('/get-product', async(req, res)=>{
      const data = await product.find().toArray();
      res.send(data);
  }); 
 
  app.get('/get-product/:id', async(req, res)=>{
      const ids = req.params.id

      const singleProduct = await product.findOne({ id : ids});
      res.send(singleProduct);
}); 

}
run().catch(console.dir);
 

app.listen( process.env.PORT || 4010, ()=>{
    console.log("The server is running")
})