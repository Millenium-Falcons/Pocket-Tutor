const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const bcryptjs = require("bcryptjs");
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

app.listen(port,()=>{
    console.log("Server is Running!");
})