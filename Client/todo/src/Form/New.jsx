import { useState } from "react";
import axios from "axios";

export default function New (taskAdded) {

    const [task, setTask] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:8080/tasks", {
            task :task,
            })
            setTask("");
            taskAdded.onTaskAdded();
            alert(res.data.message);
            console.log("Task Added")
        }catch(error) {
            console.error("Some error occured in adding task", error);
        }
    }   
    return (
        <>
                <form action="Post" onSubmit={handleSubmit} className="mb-4 w-full">
                    <div className="flex justify-between">
                        <div>
                            <input name="task" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter Your task" type="text" className="bg-gray-200 rounded-full py-2 px-3 w-full xl:w-64" required/>
                        </div>
                        <button type="submit" className="bg-blue-200 rounded-full py-2 px-5">
                            Add
                        </button>
                    </div>
                </form>
        </>
    )
}