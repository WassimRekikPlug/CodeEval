const Task = require("../models/Task.model");
const logger = require("../utils/logger")
const createTask = async (req, res, next) => {
    try {
        const highestOrderTask = await Task.findOne().sort({ order: -1 });

        const newOrder = highestOrderTask ? highestOrderTask.order + 1 : 1;

        const task = new Task({ ...req.body, order: newOrder });

        await task.save();

        res.status(201).json(task);
    } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort('order');

        res.status(200).json(tasks);
    } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
        res.status(500).json({ error: error.message })
    }

}
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        res.status(200).json(task);
    } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
        res.status(500).json({ error: error.message })
    }

}
const updateTaskById = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json(task)
    } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
        res.status(500).json({ error: error.message })
    }

}
const deleteTaskById = async (req, res, next) => {
    try {
        await Task.findByIdAndDelete(req.params.id);


        res.status(204).end();
    } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
        res.status(500).json({ error: error.message })
    }

}
const getTasksByStatus = async (req, res, next) => {
    try {
        const tasks = await Task.find({ status: req.params.status });


        res.status(200).json(tasks);
    } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
        res.status(500).json({ error: error.message })

    }
}

const getTasksByDeadline = async (req, res, next) => {
    try {
        const dateFilter = req.params.date.split('T')[0];
        const tasks = await Task.find({
            deadline: {
                $gt: new Date(dateFilter),
                $lte: new Date(new Date(dateFilter).setDate(new Date(dateFilter).getDate() + 1)),
            },
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const searchTasks = async (req, res, next) => {
    try {
        const keyword = req.params.keyword;
        const tasks = await Task.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ],
        });


        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const updateOrder = async (req, res) => {
    try {

        const { draggedTaskId, draggedOverTaskId } = req.body;

        const [draggedTask, draggedOverTask] = await Promise.all([
            Task.findById(draggedTaskId),
            Task.findById(draggedOverTaskId),
        ]);
        if (!draggedTask || !draggedOverTask) {
            return res.status(404).json({ message: 'One or both tasks not found' });
        }

        const tempOrder = draggedTask.order;
        draggedTask.order = draggedOverTask.order;
        draggedOverTask.order = tempOrder;

        await Promise.all([draggedTask.save(), draggedOverTask.save()]);



        res.status(200).json({ message: 'Task order updated successfully' });
    } catch (error) {
        console.error('Error updating task order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const updateStatus = async (req, res) => {
    try {
        const { taskId, newStatus } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.status = newStatus;
        await task.save();
        res.status(200).json({ message: 'Status updated successfully', task });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    searchTasks,
    getTasksByDeadline,
    getTasksByStatus,
    updateOrder,
    updateStatus
}