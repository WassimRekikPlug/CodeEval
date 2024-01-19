import { useEffect, useState } from "react";
import TasksList from "../components/Tasks/TasksList"
import Filters from "../components/utils/Filters"
import Modal from "../components/utils/Modal";
import { addTask, deleteTask, editTask, getAllTasks, getTaskBySeachQuery, updateOrder, updateStatus, getTaskByDeadline } from "../apis/tasks";
import { Task, TaskStatus } from "../interfaces/Task";
const HomePage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const handleSearch = async (query: string) => {


        if (query) {

            const result = await getTaskBySeachQuery(query);
            setTasks(result.data);

        } else {
            getTasks();
        }
    };
    const handleDateFilter = async (date) => {


        if (date) {
            const result = await getTaskByDeadline(date);
            setTasks(result.data);
        } else {
            getTasks();
        }
    }
    const getTasks = async () => {
        const respo = await getAllTasks();
        setTasks(respo.data);
    }
    const onDeleteTask = async (id: string) => {
        await deleteTask(id);
        getTasks();
    }
    const onAddTask = async (task: Task) => {
        await addTask(task);
        getTasks();
    }
    const onEditTask = async (task: Task) => {
        await editTask(task);
        getTasks();
    }
    const onUpdateOrder = async (draggedTaskId: string, draggedOverTaskId: string) => {
        await updateOrder(draggedTaskId, draggedOverTaskId);

    }
    const onUpdateStatus = async (taskId: string, newStatus: TaskStatus) => {


        await updateStatus(taskId, newStatus);
        getTasks();

    };

    useEffect(() => {
        getTasks();
    }, []);
    const handleSort = (dragTaskIndex: number, draggedOverTaskIndex: number) => {

        const taskClone = [...tasks];
        const temp = taskClone[dragTaskIndex];
        taskClone[dragTaskIndex] = taskClone[draggedOverTaskIndex];
        taskClone[draggedOverTaskIndex] = temp;
        onUpdateOrder(tasks[dragTaskIndex]._id!, tasks[draggedOverTaskIndex]._id!);
        setTasks(taskClone);
    };
    return (
        <div className="py-2 px-7">
            <div className="flex justify-between items-center py-2">
                <Filters onSearch={handleSearch} onDateFilter={handleDateFilter} />
                <div>
                    <button
                        className="btn-primary "
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >
                        Add Task +
                    </button>
                </div>
            </div>
            <TasksList tasks={tasks} onDeleteTask={onDeleteTask} onEditTask={onEditTask} handleSort={handleSort} onUpdateOrder={onUpdateOrder} onUpdateStatus={onUpdateStatus} />
            {modalOpen && <Modal setOpenModal={setModalOpen} type="Add" onAddTask={onAddTask} />}

        </div>
    )
}

export default HomePage