import express from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js';
import Cors from 'cors';

// App config
const app = express();
const port = process.env.PORT || 8081;

// Middlewares .
app.use(express.json());  
app.use(Cors());

// DbConfig
const CONNECTION ="mongodb+srv://tinder-user:wtiixQtKVaX4y4tR@cluster0.7vrns.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch((error) => console.log(`${error} did not connect`));
  

// Api Endpoints
app.get('/',(req,res)=>(res.status(200).send("Hello Programmers How you doing !")));

app.post('/tinder/cards', async (req, res) => {
    const dbCard = req.body;
  
    Cards.create(dbCard, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });

app.get('/tinder/cards',async(req,res)=>{
    try{
    const allCards = await Cards.find();
    res.status(200).send(allCards);
    }
    catch(error){
        res.status(500).send(error);
    }
})

//Listener
app.listen(port,()=>console.log(`server is running on http://localhost:${port}`));