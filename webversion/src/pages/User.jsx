// import { useEffect, useState } from "react";
// import ActivityGraph from "../components/ActivityGraph";
// import Heading from "../components/Heading";
// import Navbar from "../components/Navbar";
// import Signout from "../components/Signout";
// import SubHeading from "../components/SubHeading";
// import axios from "axios";

// export default function User(){
//     const[loginData,setData]=useState([]);

//     useEffect(() => {
//         handleSend();
//       }, []);
//     const handleSend=async ()=>{
//         try {
//           console.log()
//           const response = await axios.get(`http://localhost:3001/login/date`, {
//             params: { username: localStorage.getItem("username") }
//           });          
          
//           if(response.status === 200){
//             console.log(response.data);
//             setData(response.data);
//           }else if(response.status === 401){
//             console.log("error")
//           }
//         } catch (error) {
//           console.error(error);
//         }
        
    
//     return(
//         <div className="min-w-screen min-h-screen bg-gray-900 flex flex-col justify-center items-center">
//             <Navbar></Navbar>
//             <Signout></Signout>
//             <div className="rounded-lg bg-gray-800 w-1/2 flex flex-col justify-center items-center  p-2 h-max px-4">
//             <Heading color="text-white" label="My Profile"></Heading>
//             <img src="https://thumbs.dreamstime.com/b/goku-ultra-instinct-image-made-graphic-design-programme-not-intended-to-be-like-original-one-edited-version-267220466.jpg" className="rounded-full w-36 h-36"></img>
//             <SubHeading color="text-white" label="Course Suggestions"></SubHeading>
//             <SubHeading color="text-white" label="Enrolled Courses"></SubHeading>
//             <Heading color="text-white" label="Your Activity"></Heading>
//         <ActivityGraph loginDates={loginData}></ActivityGraph>
//         </div>
//         </div>
//     )
// }}
import { useEffect, useState } from "react";
import ActivityGraph from "../components/ActivityGraph";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Signout from "../components/Signout";
import axios from "axios";
import SubHeading from "../components/SubHeading";

export default function User() {
  const [loginData, setData] = useState([]);

  useEffect(() => {
    handleSend();
  }, []);

  const handleSend = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/login/date`, {
        params: { username: localStorage.getItem("username") }
      });

      if (response.status === 200) {
        console.log(response.data.message);
        setData(response.data.message);
      } else if (response.status === 401) {
        console.log("Unauthorized access");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      <Navbar />
      <Signout />
      <div className="rounded-lg bg-gray-800 w-1/2 flex flex-col justify-center items-center p-2 h-max px-4">
        <Heading color="text-white" label="My Profile" />
        <img
          src="https://thumbs.dreamstime.com/b/goku-ultra-instinct-image-made-graphic-design-programme-not-intended-to-be-like-original-one-edited-version-267220466.jpg"
          className="rounded-full w-36 h-36"
          alt="Profile"
        />
        <SubHeading color="text-white" label="Course Suggestions" />
        <SubHeading color="text-white" label="Enrolled Courses" />
        <Heading color="text-white" label="Your Activity" />
        {loginData.length > 0 ? (
          <ActivityGraph loginDates={loginData} />
        ) : (
          <p className="text-white">No activity data available</p>
        )}
      </div>
    </div>
  );
}
