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
      const user = await signup.findOne({ username });
      if (user) {
        return res.status(401).json({ error: "User Already exists!!" });
      }
      if (password !== confirmPassword) {
        return res.status(400).send({ message: "Passwords are not matching" });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedpassword = await bcryptjs.hash(password, salt);
      const sign = new signup({
        username,
        password: hashedpassword,
      });
      await sign.save();
      res.status(201).json({ message: "User registered Successfully!!" });
    } catch {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/ask-ai/doc",upload.single("pdf"),async(req,res)=>{
    const pdfFile = req.file;
    const { query } = req.body;
  console.log(pdfFile, query);

  if (!pdfFile || !query) {
    return res.status(400).json({ error: "PDF file is required" });
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
  })

app.listen(port,()=>{
    console.log("Server is Running!");
})