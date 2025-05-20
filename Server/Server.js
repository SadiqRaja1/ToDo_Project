if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./Models/task.js");
const bodyParser = require('body-parser');

const corsOptions = {
    origin:["http://localhost:5173", "https://todo-project-1-t43u.onrender.com"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log("some error", err);
    })

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

app.get("/tasks", async(req, res) => {
    try{
        const allTask = await Task.find({});
        res.json(allTask);
    }catch(error) {
        res.json({error : error.message})
    }
})

app.get("/tasks/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const data = await Task.findById(id);
        res.json(data);
    }catch(err) {
        res.status(500).json({message : "Some error occured"})
    }  
})

app.put("/tasks/:id", async(req, res) => {
    try{
        await Task.findByIdAndUpdate(req.params.id, {task: req.body.task});
        res.status(200).json({message : "Task edited"});
    }catch(err) {
        res.status(500).json({message : "Some error occunred"})
    }
})

app.patch("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, {underline : req.body.underline});
        res.status(200).json({message : "underline Updated"});
    }catch(err) {
        res.status(500).json({message :"underline not updated some error occured"});
    }
})

app.post("/tasks", async(req, res) => {
    try{
        const taskData = {
            task : req.body.task,
        };

        const newTask = new Task(taskData);
        await newTask.save();

        console.log(taskData);

        res.status(200).json({message:"Task Added"})
    }catch (error){
        console.error(error);
        res.send("Error saving Task");
    }
})

app.delete("/tasks/:id", async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Task deleted"});
        console.log("task deleted");
    }catch(err) {
        res.status(500).json({message : "deletion failed"});
    }
})

app.get("/", (req, res) => {
    res.send("Connected to root Path");
})

app.listen(8080, () => {
    console.log("Server listing at port 8080");
});