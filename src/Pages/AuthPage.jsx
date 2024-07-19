import { useRecoilState, useRecoilValue } from "recoil";
import LoginCard from "../Components/Login";
import SignupCard from "../Components/Signup";
import authScreenAtom from "../atoms/Authatom";

const AuthPage= ()=>{
    const authScreenState = useRecoilValue(authScreenAtom); 
return (
    <>
{authScreenState==="login"?<LoginCard/>:<SignupCard />};
    </>
)
}

export default AuthPage;