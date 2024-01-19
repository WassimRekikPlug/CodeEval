import TaskCard from "./TaskCard";
// import { Task } from "../../interfaces/Task";
import { Task } from "../../interfaces/Task";
import { useRef } from "react";

const TasksList = ({ tasks, onDeleteTask, onEditTask, handleSort, onUpdateStatus }: { tasks: Task[] }) => {

    const dragTask = useRef<number>(0);
    const draggedOverTask = useRef<number>(0);

    return (
        <div className="flex flex-wrap py-4 ">
            {!tasks.length && <div className="w-full flex justify-center items-center"> <h1 className="text-4xl mt-8">No Tasks Found...</h1></div>}
            {tasks.map((task: Task, index) => (
                <div
                    key={index}
                    draggable
                    onDragStart={() => (dragTask.current = index)}
                    onDragEnter={() => (draggedOverTask.current = index)}
                    onDragEnd={() => handleSort(dragTask.current, draggedOverTask.current)}
                    onDragOver={(e) => e.preventDefault()}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4"
                >
                    <TaskCard task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} onUpdateStatus={onUpdateStatus} />
                </div>

            ))}

            {/* <AddTaskCard /> */}

        </div>
    )
}

export default TasksList