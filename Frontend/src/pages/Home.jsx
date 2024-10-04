import Heading from "../components/Heading";
import { HorizontalCard } from "../components/HorizontalCard";
import Navbar from "../components/Navbar";
import Signout from "../components/Signout";
import SubHeading from "../components/SubHeading";
import profile from '../images/profile.png';
export default function Home(){
    return(

        <div className="min-w-screen min-h-screen bg-gray-900 flex flex-col justify-center items-center">
            <Navbar></Navbar>
            <Signout></Signout>
            <div className="rounded-lg bg-gray-800 w-1/2 flex flex-col justify-center items-center  p-2 h-max px-4">
            <SubHeading color="text-white" label="Welcome Back..."></SubHeading>
            <div className="flex bg-[#1c1c2e] p-4 rounded-lg w-72 h-48 flex items-center justify-center">
          <p className="text-white"><img className="h-36 w-36" src={profile} alt="image" /></p>
            </div>
            <SubHeading color="text-white" label="Continue with..."></SubHeading>
            <div className="flex bg-[#1c1c2e] p-4 rounded-lg w-72 h-48 flex items-center justify-center">
          <p className="text-white"><img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190718150152/Java-tutorials-by-GeeksForGeeks.png" alt="java" /></p>
            </div>
            </div>
       
        </div>
    )
}