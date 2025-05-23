const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
    task:{
        type:String,
        require:true
    },
    underline:{
        type:Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;