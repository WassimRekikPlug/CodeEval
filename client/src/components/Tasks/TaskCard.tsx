import React, { useState } from "react"
import LogoTask from "../utils/LogoTask"
import StatusSelector from "../utils/StatusSelector"
import { Task } from '../../interfaces/Task';
import Modal from "../utils/Modal";
interface TaskCardProps {
    task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task, onDeleteTask, onEditTask, onUpdateStatus }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = () => {
        onDeleteTask(task._id);
    };

    return (
        <div className="border p-5 flex flex-col space-y-8 rounded-xl shadow-2xl">
            <div className="flex justify-between">

                <div className="flex items-center justify-around">
                    <LogoTask letter={task.title[0]} />
                    <h2 className="text-2xl font-bold mx-2">{task.title}</h2>
                </div>
                <div onClick={handleDelete} className="cursor-pointer"><i className="fa-solid fa-xmark text-red-500 text-xl"></i></div>
            </div>
            <div className="text-md font-medium text-gray-500">
                {task.description}
            </div>
            <div>
                <div className="flex justify-between">
                    <StatusSelector status={task.status} onUpdateStatus={onUpdateStatus} task_id={task._id} />
                    <button

                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >
                        <i className="fa-solid fa-pen-to-square text-3xl"></i>
                    </button>
                    {modalOpen && <Modal setOpenModal={setModalOpen} type="Edit" task={task} onEditTask={onEditTask} />}
                </div>
            </div>
        </div>
    )
}

// const getStatusColorClass = (status: TaskStatus) => {
//     switch (status) {
//         case TaskStatus.TODO:
//             return 'text-red-500'; 
//         case TaskStatus.EN_COURS:
//             return 'text-yellow-500'; 
//         case TaskStatus.DONE:
//             return 'text-green-500'; 
//         default:
//             return 'text-gray-700';
//     }
// };

export default TaskCard