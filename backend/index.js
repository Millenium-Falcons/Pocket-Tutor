const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const bcryptjs = require("bcryptjs");
const multer = require("multer");
const axios=require("axios");
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const mongoose=require("mongoose");
const signup=require("./Schema/signUp");
const db_uri=process.env.DB_URI;
const port=process.env.PORT;

mongoose.connect(db_uri).then(()=>{console.log("MongoDB Connection successful")});

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders: "*",
    credentials: true,
}));
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    try {
      if (password !== confirmPassword) {
        return res.status(400).send({ message: "Passwords are not matching" });
      }
      const user = await signup.findOne({ username });
      if (user) {
        return res.status(401).json({ error: "User Already exists!!" });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedpassword = await bcryptjs.hash(password, salt);
      const sign = new signup({
        username,
        password: hashedpassword,
      });
      await sign.save();
      return res.status(201).json({ message: "User registered Successfully!!" });
    } catch {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/login",async(req,res)=>{
    try{
      const {username,password}=req.body;
      const user=await signup.findOne({username});
      if(!user){
        return res.status(401).json({error:"Invalid username or password"});
      }
      const isMatch=await bcryptjs.compare(password,user.password);
      if(!isMatch){
        return res.status(401).json({error:"Invalid username or password"});
      }else{
        return res.status(200).json({message:"Login Successful!!"});
      }
    }
    catch{
      return res.status(400).json({message:"Error while Login"});
    }
  })

  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/ask-ai/doc",upload.single("pdf"),async(req,res)=>{
    const pdfFile = req.file;
    const { query } = req.body;
  console.log(pdfFile, query);

  if (!pdfFile || !query) {
    return res.status(400).json({ error: "PDF file or query is Missing!" });
  }
    try{
      const formData = new FormData();
      formData.append('doc', pdfFile.buffer, pdfFile.originalname);
      formData.append('query', query);

    const aiResponse = await axios.post('http://localhost:8000/doc', formData, {
      headers: {
        ...formData.getHeaders(), // Merge headers from FormData
      },
    });
    console.log(aiResponse);

    const result = aiResponse.data.response;
    res.status(200).json({ response: result });
    }
    catch(error){
      console.error('Error uploading document:', error);
      return res.status(500).json({ error: "Error uploading Document" });
    }
  });

  app.post("/ask-ai/img",upload.single("image"),async(req,res)=>{
    const imageFile = req.file;
    const { query }=req.body;
    if(!imageFile || !query){
      return res.status(400).json({error:"Image file or Query is Missing!"});
    }
    try{
      const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString('base64')}`;
      
      const requestData = {
          image: base64Image,
          query: query
      };
      const aiResponse=await axios.post('http://localhost:8000/doc',requestData,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(aiResponse);
    const result=aiResponse.data;
    return res.status(200).json({response:result});
    }
    catch{
      return res.status(500).json({error:"Error while uploading image"});
    }
  });

  app.post("/ask-ai/text",async(req,res)=>{
    const { query }=req.body;
    if(!query){
      return res.status(400).json({error:"Query is Missing!"});
    };
    try{
      const aiResponse=await axios.post('http://localhost:8000/doc',query,{
        headers:{
          'Content-Type':'text/plain'
        }
      });
      console.log(aiResponse);
      const result=aiResponse.data;
      return res.status(200).json({response:result});
    }
    catch{
      return res.status(500).json({error:"Error while uploading text"});
    };
  })

app.listen(port,()=>{
    console.log("Server is Running!");
})