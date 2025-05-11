import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [isLogin,setIsLogin] = useState(true);
  const [errmsg,setErrmsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () =>{
    try {
      const res = await axios.post("http://localhost:7777/login",{
        emailId,
        password,
      },{withCredentials:true});
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setErrmsg(error?.response?.data || "Something went wrong");
      //console.log(error);
    }
  }

  const handleSignUp = async () =>{
    try {
      const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">

          <h2 className="card-title justify-center">{isLogin ? "Login":"Sign Up"}</h2>

          {!isLogin && (<>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input type="text" value={firstName} className="input" placeholder="Type here" 
              onChange={(e)=>{setFirstName(e.target.value)}}/>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input type="text" value={lastName} className="input" placeholder="Type here" 
              onChange={(e)=>{setLastName(e.target.value)}}/>
          </fieldset>
          </>)}
          

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" value={emailId} className="input" placeholder="Type here" 
              onChange={(e)=>{setEmailId(e.target.value)}}/>
          </fieldset>

          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={password} className="input" placeholder="Type here" 
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </fieldset>

          <p className="text-red-500">{errmsg}</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? "Login":"Sign Up"}</button>
          </div>

          <p className={isLogin? "link link-info mx-auto my-4":"link link-success mx-auto my-4"} onClick={()=>setIsLogin(!isLogin)}>{isLogin ? "New user? Sign Up":"Existing user? Login"}</p>

        </div>
      </div>
    </div>
    
  );
};

export default Login;
