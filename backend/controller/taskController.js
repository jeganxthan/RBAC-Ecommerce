const Task = require("../models/Task");

const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        if (status) {
            filter.status = status;//status-pending, inprogress, completed
        }

        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find(filter).populate(
                "assignedTo",//only name email and profilpic is shown in assignedTo
                "name email profileImageUrl"
            );
        } else {
            tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
                "assignedTo", 
                "name email profileImageUrl"
            )
        }

        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoChecklist.filter((item) => item.completed).length;
                return { ...task._doc, completedTodoCount: completedCount };
            })
        )

        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : { assignedTo: req.user._id }
        )
        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: "Pending",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id })
        })
        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status: "In Progress",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id })
        })
        const completedTasks = await Task.countDocuments({
            ...filter,
            status: "Completed",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id })
        })

        res.json({
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

const getTasksById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );
        if (!task) return res.status(404).json({ message: "Task not found" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist
        } = req.body
        if (!Array.isArray(assignedTo)) {
            return res.status(400).json({ message: "assignedTo must be an array of user IDs" })
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            todoChecklist,
            attachments,
        });
        res.status(201).json({ message: "Task created successfully", task })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments  || task.attachments;
        if(req.body.assignedTo){
            if(!Array.isArray(req.body.assignedTo)){
                return res.status(400).json({message:"assignedTo must be an array of user IDs"})
            }
            task.assignedTo = req.body.assignedTo;
        }
        const updatedTask = await task.save();
        res.json({message:"Task updated successfully", updatedTask});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task)return res.status(404).json({message:"Task not found"})
        await task.deleteOne()
        res.json({message:"Task deleted successfully"}) 
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({messsage:"Task not found"});
        const isAssigned = task.assignedTo.some(//.some() - if at least one item in the array satisfies the condition inside the callback.
            (userId)=>userId.toString() === req.user._id.toString()
        );
        if(!isAssigned && req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized"})
        }
        task.status = req.body.status || task.status;
        if(task.status == "Completed"){
            task.todoChecklist.forEach((item)=>(item.completed=true));
            task.progress=100;
        }
        await task.save();
        res.json({messgae:"Task status updated", task})
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
const updateTaskChecklist = async (req, res) => {
    try {
        const {todoChecklist} = req.body;
        const task = await Task.findById(req.params.id);
        if(!task)return res.status(404).json({message:"Task not found"});

        if(!task.assignedTo.includes(req.user._id) && req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized to update checklist"});
        }
        task.todoChecklist = todoChecklist;

        const completedCount = task.todoChecklist.filter((item)=>item.completed).length;
        const totalItems = task.todoChecklist.length;
        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems)*100):0;//Example: 3 items, 2 completed → (2 / 3) * 100 = 66.67 → 67%.
        if(task.progress === 100){
            task.status = "Completed"
        }else if(task.progress > 0){
            task.status = "In Progress"
        }else{
            task.status="Pending"
        }
        await task.save();
        const updatedTask = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        )
        res.json({message: "Task checklist updated", task:updatedTask});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }

}
const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({status:"Pending"});
        const completedTasks = await Task.countDocuments({status:"Completed"});

        //Count tasks that are not completed and have a due date earlier than now (i.e., overdue).
        const overdueTasks = await Task.countDocuments({
            status:{$ne: "Completed"},
            dueDate:{$lt: new Date()},
        });

        //Group tasks by their status (like "Pending", "Completed", etc.) and count them.
        const taskStatuses = ["Pending", "In Progress", "Completed"];
        const taskDistributionRaw = await Task.aggregate([
            {
                $group:{
                    _id:"$status",
                    count: {$sum: 1},
                },
            },
        ])
        const taskDistribution = taskStatuses.reduce((acc, status)=>{
            // e.g., "In Progress" → "InProgress"
            const formattedKey = status.replace(/\s+/g, "");
            acc[formattedKey] = taskDistributionRaw.find((item)=>item._id===status)?.count || 0;
            return acc;
        }, {});
        //Adds an "All" key to represent the total number of tasks.
        taskDistribution["All"] = totalTasks;

        const recentTasks = await Task.find({assignedTo: userId})
        .sort({createdAt: -1})
        .limit(10)
        .select("title status dueDate createdAt");

        res.status(200).json({
            statistics:{
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts:{
                taskDistribution,
            },
            recentTasks
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;//only fecth data for the logged-in user
        const totalTasks = await Task.countDocuments({assignedTo:userId});
        const pendingTasks = await Task.countDocuments({assignedTo: userId, status:"Pending"})
        const completedTasks = await Task.countDocuments({assignedTo: userId, status:"Completed"})
        const overdueTasks = await Task.countDocuments({
            assignedTo: userId,
            status:{$ne: "Completed"},
            dueData:{$lt: new Date()},
        });

        const taskStatuses = ["Pending", "In Progress", "Completed"]
        const taskDistributionRaw = await Task.aggregate([
            {$match: {assignedTo: userId}},
            {$group: {_id:"$status", count:{$sum:1}}},
        ]);

         const taskDistribution = taskStatuses.reduce((acc, status)=>{
            // e.g., "In Progress" → "InProgress"
            const formattedKey = status.replace(/\s+/g, "");
            acc[formattedKey] = taskDistributionRaw.find((item)=>item._id===status)?.count || 0;
            return acc;
        }, {});
        //Adds an "All" key to represent the total number of tasks.
        taskDistribution["All"] = totalTasks;

        //fetch recent 10 tasks for the logged-in user
        const recentTasks = await Task.find({assignedTo: userId})
        .sort({createdAt: -1})
        .limit(10)
        .select("title status dueDate createdAt");

        res.status(200).json({
            statistics:{
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts:{
                taskDistribution,
            },
            recentTasks
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

module.exports = {
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData
}