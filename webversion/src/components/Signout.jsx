import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

export default function Signout(){
    const navigate=useNavigate();
    return(
        <div className="float-right">
        <CustomButton label="Sign out" onClick={()=>{
            localStorage.removeItem("username");
            navigate("/sign-in");
        }}></CustomButton>
        </div>
    )
}