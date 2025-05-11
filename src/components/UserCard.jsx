import React from "react";

const UserCard = ({user}) => {
  const {firstName,lastName,photoUrl,age,gender,about} = user;
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
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-secondary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
