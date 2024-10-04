import { useState } from "react";
import CustomButton from "../components/CustomButton";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin(){
    const navigate=useNavigate();
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const [error, setError] = useState("");
    const handleSend=async ()=>{
      if (!email || !password) {
        setError("All fields are required.");
        return;
    }
    
    setError("");
      try {
        const response=await axios.post("http://localhost:3001/login",
          {
            username:email,
            password
        });
        
        if(response.status === 200){
          localStorage.setItem('username',(email));
          navigate("/home");
        }else if(response.status === 400){
          setError("Incorrect email or password");
        }
      } catch (error) {
        setError("Something bad happened")
        console.error(error);
      }
  
    }
    const handleClear=()=>{     
      setemail('');
      setpassword('');    
    }


    return(
    
      <div className="bg-gray-900 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-gray-800 w-80 text-center p-2 h-max px-4">
          <Heading color="text-white" label="Sign in"></Heading>
          <SubHeading color="text-white" label="Email"></SubHeading>
          <Inputbox type="email" label="" placeholder="email" onChange={(e) => setemail(e.target.value)}></Inputbox>
          <SubHeading color="text-white" label="Password"></SubHeading>
          <Inputbox type="password" label="" placeholder="password" onChange={(e) => setpassword(e.target.value)}></Inputbox>
          {error && <p className="text-red-500">{error}</p>}
          <CustomButton width="50" label="Sign in" onClick={handleSend}></CustomButton>
      </div>
      </div>
      </div>
    
    )

}