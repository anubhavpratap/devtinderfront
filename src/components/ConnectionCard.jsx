import React from "react";

const ConnectionCard = ({connec}) => {
  return (
    <div className="card card-side bg-base-300 shadow-sm mx-10 my-10 w-300 h-60">
      <figure>
        <img
          src={connec.photoUrl}
          alt="profile"
          className="h-50 w-50 m-8"
          
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{connec.firstName + " "+connec.lastName}</h2>
        <p>{connec.about}</p>
      </div>
    </div>
  );
};

export default ConnectionCard;
