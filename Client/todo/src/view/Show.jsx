import { useState, useEffect } from 'react';
import axios, { all } from "axios";
import "./Show.css";
import { Route, Link } from 'react-router-dom';
import New from "../Form/New.jsx"

export default function Show() {
      const [allTasks, setAllTasks] = useState([]);
    
      const fetchApi = async () => {
        const response = await axios.get("http://localhost:8080/tasks");
        setAllTasks(response.data);
      };

      const handleDelete = async (taskId) => {
        try {
          await axios.delete(`http://localhost:8080/tasks/${taskId}`);
          fetchApi();
        }catch(err) {
          console.error("Error in deleting", err);
        }
      }

      const handleClickUnderline = async (taskId, underlineClick) => {
        let a = underlineClick;
        if(a){
          a=false;
        }else{
          a=true;
        }
        try {
          await axios.patch(`http://localhost:8080/tasks/${taskId}`, {underline : a});
          fetchApi();
        } catch (err) {
          console.error("Some Error occured", error);
        }
      }

      useEffect(() => {
        fetchApi();
      }, []); 

    return (
        <>
          <div className='bg-gray-800 h-screen flex text-center'>
            <div className='flex items-center justify-center w-screen' >
              <div className='bg-white py-10 px-10 rounded md:w-1/3'>
                <h1 className='text-4xl font-bold mb-4' >ToDo List</h1>
                <New onTaskAdded={fetchApi}/>
                {allTasks.map(allTasks => (
                  <div className='flex justify-between py-2.5 px-2 bg-gray-200 my-2.5 rounded' key={allTasks._id}>
                    <h4 className={allTasks.underline == true ? 'line-through mr-1': 'mr-1'} onClick={()=> {handleClickUnderline(allTasks._id, allTasks.underline)}}>{allTasks.task}</h4>
                    <div >
                      <Link className='pr-3 text-blue-600' to={`/edit/${allTasks._id}`}>Edit</Link>                                        
                      <button className='text-red-600' onClick={()=>{handleDelete(allTasks._id)}}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
    )
}