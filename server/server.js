import * as dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js';
import Cors from 'cors';
import helmet from "helmet";
import userSchema from "./userSchema.js";
import multer from 'multer';
import path from 'path';

// App config
const app = express();
dotenv.config(); 
const port = process.env.PORT || 8081;
const __dirname = path.resolve(); 

// Middlewares .
app.use(express.json());  
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(Cors());
app.use("/images",express.static(path.join(__dirname,"./public/images")));


// DbConfig
const CONNECTION ="mongodb+srv://tinder-user:wtiixQtKVaX4y4tR@cluster0.7vrns.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch((error) => console.log(`${error} did not connect`));
  

// Api Endpoints
app.get('/',(req,res)=>(res.status(200).send("Hello Programmers How you doing !")));

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
     cb(null,"public/images");
  },
  filename:(req,file,cb)=>{
     cb(null,req.body.name);
  }
})

const upload = multer({storage});
app.post("/upload",upload.single("file"),(req,res)=>{
  try{
     return res.status(200).json("File uploaded successfully");
  }catch(err){
     console.log(err);
  }
})


//register
app.post("/register",async(req,res)=>{
  const email = req.body.email;
  const user = await userSchema.findOne({email}); 
//   console.log(user);
  try{ 
    if(!user){
     const newUser = new userSchema({
          email:email, 
          name:req.body.name,
          profilePicture:req.body.profilePicture,
      })
     const user  = await newUser.save();
    }
    res.status(200).json(user);
  }catch(err){
     console.log(err);
  }
 
})


// get a user 
app.get("/user/:email",async (req,res)=>{
  const email =  req.params.email;
    try{
       const user =  await userSchema.findOne({email})
       res.status(200).json(user);
    }catch(err){
       res.status(500).json(err);
    }
}) 

//create a card 
app.post("/cards",async(req,res)=>{
   try{
     const newPost = new Cards(req.body);
      const savePost = await newPost.save();
      res.status(200).json(savePost);
  }catch(err){
      res.status(500).json(err);
  }
})

// get all cards
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