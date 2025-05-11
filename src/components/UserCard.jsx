import axios from "axios";
import React from "react";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeOneFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const {firstName,lastName,photoUrl,age,gender,about,_id} = user;
  const dispatch = useDispatch();
  const handleFeedRequest = async (status,_id) => {
    try {
      await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true,});
      dispatch(removeOneFeed(_id));
    } catch (error) {
      
    }
    
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={photoUrl}
          alt="Photo"
          className="rounded-xl h-80 w-70"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName+" "+ lastName}</h2>
        {age && gender && <p>{age+ ", "+ gender}</p>}
        <p>
          {about}
        </p>
        <div className="card-actions">
          <button className="btn btn-primary" 
          onClick={()=>handleFeedRequest("interested",_id)}>Interested</button>
          <button className="btn btn-secondary" 
          onClick={()=>handleFeedRequest("ignored",_id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
