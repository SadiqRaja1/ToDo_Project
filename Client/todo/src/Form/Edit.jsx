import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    const {id} = useParams();

    const navigate = useNavigate();
    const [taskData, setTaskData] = useState("");

    const fetchData = async()=> {
        const data = await axios.get(`${import.meta.env.VITE_Api_URL}tasks/${id}`);
        setTaskData(data.data.task);
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        try{
            const res = await axios.put(`${import.meta.env.VITE_Api_URL}tasks/${id}`, {task: taskData});
            navigate("/");
        }catch(err) {
            console.error("Some Error occured", err);
        }
    }

    useEffect(()=> {
        fetchData();
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"name='taskEdited' value={taskData} onChange={(e)=>{setTaskData(e.target.value)}}/>
                <button className='p-4 bg-emerald-700 rounded m-4' type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default Edit