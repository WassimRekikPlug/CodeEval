const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date },
    status: { type: String, enum: ['DONE', 'EN_COURS', 'TODO'], default: 'TODO' },
    order: { type: Number },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;