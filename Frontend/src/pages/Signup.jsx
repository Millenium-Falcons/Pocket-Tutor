// import { useState } from "react";
// import CustomButton from "../components/CustomButton";
// import Heading from "../components/Heading";
// import Inputbox from "../components/Inputbox";
// import SubHeading from "../components/SubHeading";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Signup(){
//     const navigate=useNavigate();
//     const[email,setemail]=useState("");
//     const[password,setpassword]=useState("");
//     const [error, setError] = useState("");
//     const [selectedCourses, setSelectedCourses] = useState([]);
//     const [courseInput, setCourseInput] = useState('');
//   const handleAddCourse = () => {
//     if (courseInput && !selectedCourses.includes(courseInput)) {
//       setSelectedCourses([...selectedCourses, courseInput]);
//       setCourseInput(''); 
//     }
//   };

//   const handleRemoveCourse = (course) => {
//     setSelectedCourses(selectedCourses.filter((c) => c !== course));
//   };
//     const handleSend=async ()=>{
//       if (!email || !password) {
//         setError("All fields are required.");
//         return;
//     }
    
//     setError("");
//       try {
//         console.log()
//         const response=await axios.post("http://localhost:3001/signup",
//           {
//             username:email,
//             password,
//             courses:selectedCourses
//         });
        
//         if(response.status === 201){
//           localStorage.setItem('username', (email));
//           navigate("/home");
//         }else if(response.status === 400){
//           setError("Incorrect email or password");
//         }
//       } catch (error) {
//         setError("Something bad happened")
//         console.error(error);
//       }
  
//     }
//     const handleClear=()=>{     
//       setemail('');
//       setpassword('');    
//       selectedCourses([]);
//     }


//     return(
    
//       <div className="bg-gray-900 h-screen flex justify-center">
//       <div className="flex flex-col justify-center">
//       <div className="rounded-lg bg-gray-800 w-80 text-center p-2 h-max px-4">
//           <Heading color="text-white" label="Sign up"></Heading>
//           <SubHeading color="text-white" label="Email"></SubHeading>
//           <Inputbox type="email" label="" placeholder="email" onChange={(e) => setemail(e.target.value)}></Inputbox>
//           <SubHeading color="text-white" label="Password"></SubHeading>
//           <Inputbox type="password" label="" placeholder="password" onChange={(e) => setpassword(e.target.value)}></Inputbox>
//           {error && <p className="text-red-500">{error}</p>}
//           <div className="p-4">
//       <label className="text-lg font-medium text-white">Add Courses</label>
//       <div className="flex flex-col items-center mt-2">
//         <input
//           type="text"
//           className="border border-gray-300 p-2 rounded-lg flex-grow mr-2"
//           value={courseInput}
//           onChange={(e) => setCourseInput(e.target.value)}
//           placeholder="Enter a course"
//         />
//         <button
//           className="bg-gray-400 text-white p-2 m-1 rounded-lg"
//           onClick={handleAddCourse}
//         >
//           Add Course
//         </button>
//       </div>

//       {selectedCourses.length > 0 && (
//         <>
//           <label className="text-lg font-medium text-white mt-4">Selected Courses:</label>
//           <div className="mt-2">
//             {selectedCourses.map((course, index) => (
//               <div key={index} className="flex items-center justify-between border-b border-gray-300 py-2">
//                 <span className="text-white">{course}</span>
//                 <button
//                   className="text-red-500"
//                   onClick={() => handleRemoveCourse(course)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//           <CustomButton width="72" label="Sign Up" onClick={handleSend}></CustomButton>
//       </div>
//       </div>
//       </div>
    
//     )

// }
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courseInput, setCourseInput] = useState('');

    const handleAddCourse = () => {
        if (courseInput && !selectedCourses.includes(courseInput)) {
            setSelectedCourses([...selectedCourses, courseInput]);
            setCourseInput('');
        }
    };

    const handleRemoveCourse = (course) => {
        setSelectedCourses(selectedCourses.filter((c) => c !== course));
    };

    const handleSend = async () => {
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        setError("");

        // First POST request to sign up
        try {
            const signupResponse = await axios.post("http://localhost:3001/signup", {
                username: email,
                password,
                courses: selectedCourses
            });

            if (signupResponse.status === 201) {
                // If signup is successful, store username
                localStorage.setItem('username', email);
                
                // Prepare data for creating profile
                const profileData = {
                    username: email,
                    total_time: "0", // Adjust accordingly
                    courses: selectedCourses,
                };

                // Second POST request to create-profile
                const profileResponse = await axios.post("http://localhost:3001/create-profile", profileData);

                if (profileResponse.status === 201) {
                    // Navigate to home after creating profile
                    navigate("/home");
                } else {
                    setError("Failed to create profile.");
                }
            } else if (signupResponse.status === 400) {
                setError("Incorrect email or password");
            }
        } catch (error) {
            setError("Something bad happened");
            console.error(error);
        }
    };

    const handleClear = () => {
        setEmail('');
        setPassword('');
        setSelectedCourses([]);
    };

    return (
        <div className="bg-gray-900 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-gray-800 w-80 text-center p-2 h-max px-4">
                    <Heading color="text-white" label="Sign up"></Heading>
                    <SubHeading color="text-white" label="Email"></SubHeading>
                    <Inputbox type="email" label="" placeholder="email" onChange={(e) => setEmail(e.target.value)}></Inputbox>
                    <SubHeading color="text-white" label="Password"></SubHeading>
                    <Inputbox type="password" label="" placeholder="password" onChange={(e) => setPassword(e.target.value)}></Inputbox>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="p-4">
                        <label className="text-lg font-medium text-white">Add Courses</label>
                        <div className="flex flex-col items-center mt-2">
                            <input
                                type="text"
                                className="border border-gray-300 p-2 rounded-lg flex-grow mr-2"
                                value={courseInput}
                                onChange={(e) => setCourseInput(e.target.value)}
                                placeholder="Enter a course"
                            />
                            <button
                                className="bg-gray-400 text-white p-2 m-1 rounded-lg"
                                onClick={handleAddCourse}
                            >
                                Add Course
                            </button>
                        </div>

                        {selectedCourses.length > 0 && (
                            <>
                                <label className="text-lg font-medium text-white mt-4">Selected Courses:</label>
                                <div className="mt-2">
                                    {selectedCourses.map((course, index) => (
                                        <div key={index} className="flex items-center justify-between border-b border-gray-300 py-2">
                                            <span className="text-white">{course}</span>
                                            <button
                                                className="text-red-500"
                                                onClick={() => handleRemoveCourse(course)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <CustomButton width="72" label="Sign Up" onClick={handleSend}></CustomButton>
                </div>
            </div>
        </div>
    );
}
