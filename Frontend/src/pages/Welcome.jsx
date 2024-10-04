import { useNavigate } from "react-router-dom";
import cards from '../images/cards.png'; // Assuming your image import stays the same
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";

const Welcome = () => {
  const [loading, setLoading] =useState(true); // Assume loading is controlled by some logic
  const [isLogged, setIsLogged] = useState(false); // Simulating login state

  const navigate = useNavigate(); // React Router hook for navigation

  // Simulate a loading timeout (you can remove this in actual implementation)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

//   if (!loading && isLogged) {
//     return <Redirect to="/home" />;
//   }

  return (
    <div className="bg-primary h-full"> {/* Using div instead of SafeAreaView */}
      {/* Inline Loader Implementation */}
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="loader"></div> {/* CSS-based loader or you can add an alternative like spinning text */}
          <style jsx>{`
            .loader {
              border: 8px solid #f3f3f3;
              border-top: 8px solid #3498db;
              border-radius: 50%;
              width: 60px;
              height: 60px;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div className="bg-gray-900 w-full flex flex-col justify-center items-center h-full px-4">
          <h1 className="text-3xl text-white font-bold text-center">
            <span className="text-secondary-200">Pocket Tutor</span>
          </h1>

          <img
            src={cards}
            className="max-w-[380px] w-full h-[298px]"
            alt="Pocket Tutor"
          />

          <div className="relative mt-5">
            <h2 className="text-3xl text-white font-bold text-center">
              When learning meets
              <br />
              AI
            </h2>
          </div>

          <p className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Embark on a Journey of Limitless Exploration with Pocket Tutor
          </p>

          {/* Button for Sign In */}
          <CustomButton
          width="96"
           label="Sign Up"
            onClick={() => navigate("/sign-up")}
          >
          </CustomButton>

          {/* Button for Sign Up */}
          <CustomButton
          width="96"
            label="Sign In"
            onClick={() => navigate("/sign-in")}
          >
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default Welcome;
