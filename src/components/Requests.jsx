import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BASE_URL from '../utils/constants';
import {addRequests, removeOneRequest, removeRequests} from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials: true,
            })
            //console.log(res?.data?.data);
            dispatch(addRequests(res?.data?.data));            
        } catch (error) {
            
        }

    }
    useEffect(()=>{
        fetchRequests()
    },[]);
    const handleRequest = async (status,_id) => {
        try {
            await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true,});
            dispatch(removeOneRequest(_id)); 
        } catch (error) {
            
        }
    }
    if(!requests) return;
    if(requests.length == 0) return <h1 className='flex justify-center font-bold'>No Requests</h1>
    return (
        <div>
            <h1 className=' text-center font-bold text-2xl'>Connections</h1>
            {requests.map((request)=>(
                <div key = {request._id} className="card card-side bg-base-300 shadow-sm h-50 mx-10 my-10 w-300">
                    <figure>
                        <img
                        src={request.fromUserId.photoUrl}
                        className='h-40 m-6'
                        alt="profile" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{request.fromUserId.firstName + " " + request.fromUserId.lastName}</h2>
                        <p>{request.fromUserId.about}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={()=>handleRequest('accepted',request._id)}>Accept</button>
                            <button className="btn btn-secondary" onClick={()=>handleRequest('rejected',request._id)}>Reject</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
          
    )
}

export default Requests