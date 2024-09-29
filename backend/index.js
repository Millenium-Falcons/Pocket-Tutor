const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const bcryptjs = require("bcryptjs");
const multer = require("multer");
const axios=require("axios");
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

  // File filter to validate MIME types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
      "application/pdf",  // PDF
      "text/plain",       // TXT
  ];
  
  console.log("Detected MIME type:", file.mimetype); // Log detected MIME type
  
  // Check if the detected MIME type is allowed
  if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
  } else {
      cb(new Error("Invalid file type! Only PDF, TXT, files are allowed."), false); // Reject file
  }
};

// Configure multer with memory storage and file filter
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: fileFilter 
});

// Endpoint to handle file upload
app.post("/ask-ai/doc", upload.single("doc"), async (req, res) => {
  const file = req.file;
  const { query } = req.body;

  // Check if file and query are provided
  if (!file || !query) {
      return res.status(400).json({ error: "File or query is missing!" });
  }

  try {
      const formData = new FormData();
      // Append the file buffer and query to FormData
      formData.append('doc', file.buffer, {
          filename: file.originalname,
          //contentType: file.mimetype
      });
      formData.append('query', query);

      // Send POST request to the AI endpoint
      const aiResponse = await axios.post('http://localhost:8000/doc', formData, {
          headers: {
              ...formData.getHeaders(), // Include headers from FormData
          },
      });

      // Extract response from the AI server
      const result = aiResponse.data.response;
      res.status(200).json({ response: result });

  } catch (error) {
      console.error('Error uploading document:', error);
      // Provide more context on the error to help debugging
      const errorMessage = error.response ? error.response.data : error.message;
      return res.status(500).json({ error: `Error uploading document: ${errorMessage}` });
  }
});
  
  // Configure multer for image uploads
  const imageUpload = multer({ 
    storage: multer.memoryStorage(),
  });

  app.post("/ask-ai/img",imageUpload.single("image"),async(req,res)=>{
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