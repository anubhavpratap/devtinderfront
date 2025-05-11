import React, { useEffect } from 'react'
import BASE_URL from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import ConnectionCard from './connectionCard'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/connections",{
                withCredentials:true
            })
            //console.log(res.data.data);
            dispatch(addConnections(res.data.data));
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[]);
    if(!connections) return;
    if(connections.length == 0) return <h1 className='flex justify-center font-bold'>No connections</h1>;
    return (
        <div>
            <h1 className=' text-center font-bold text-2xl'>Connections</h1>
            {connections.map((connection)=>
                (<ConnectionCard connec= {connection}/>)
            )}
        </div>
    )
}

export default Connections