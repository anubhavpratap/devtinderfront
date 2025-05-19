import React from "react";
import { Link } from "react-router-dom";

const ConnectionCard = ({connec}) => {
  return (
    <div className="card card-side bg-base-300 shadow-sm mx-10 my-10 w-300 h-60">
      <figure>
        <img
          src={connec.photoUrl}
          alt="profile"
          className="object-cover h-50 w-50 m-8"
          
        />
      </figure>
      <div className="card-body flex flex-col justify-between">
        <div>
          <h2 className="card-title">
            {connec.firstName + " " + connec.lastName}
          </h2>
          <p>{connec.about}</p>
        </div>
        <Link to={"/chat/" + connec._id}>
              <button className="btn btn-primary">Chat</button>
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCard;
