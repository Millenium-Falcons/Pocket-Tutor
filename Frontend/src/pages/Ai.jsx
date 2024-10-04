import { useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Signout from "../components/Signout";
import axios from "axios"; // Import axios for making HTTP requests

export default function Ai() {
  const [inputValue, setInputValue] = useState('');
  const username = localStorage.getItem('username'); // Retrieve username from local storage

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      console.error("Input cannot be empty");
      return; // Prevent sending empty input
    }

    try {
      const response = await axios.post("http://localhost:3001/ask-ai", {
        query: inputValue,
        username,
      }, {
        headers: {
          'Content-Type': 'application/json' // Setting the correct content type
        }
      });

      if (response.status === 200) {
        console.log("AI response:", response.data.result); // Handle the AI response here
        setInputValue(''); // Clear input after submission
      } else {
        console.error("Failed to get a response from AI");
      }
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      <Navbar />
      <Signout />
      
      <div className="rounded-lg bg-gray-800 w-1/2 h-screen p-4 flex flex-col justify-between">
        <Heading label="AI" color="text-white" />
        {/* Other content can go here */}
        <div className="flex-grow">
          {/* Empty space or other elements */}
        </div>
        <div className="flex flex-row">
          <input
            type="text"
            id="input-box"
            value={inputValue}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-full bg-inherit"
            placeholder="Ask me anything..."
          />
          <PiPaperPlaneRightFill 
            onClick={handleSubmit} // Call handleSubmit when clicked
            size={30} 
            color="white" 
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
