import "./Modal.css";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import { Task, TaskStatus } from "../../interfaces/Task";

function Modal({ setOpenModal, type, onAddTask, onEditTask, task }) {

    const isEdit = type.match('Edit') ? true : false;

    const validationSchema = yup.object({
        _id: yup.string(),
        title: yup.string().required("Add title ").min(3, 'Short Title'),
        description: yup.string().required("Add some description").min(6, "Short Description ( at least 6 letters ) "),
        deadline: yup.date(),
        status: yup.string().default(TaskStatus.TODO)
    });
    const initialValues: { title: string, description: string, deadline: Date, status: TaskStatus } = {
        title: isEdit ? task.title : "",
        description: isEdit ? task.description : "",
        deadline: isEdit ? task.deadline.split('T')[0] : new Date().toISOString().split('T')[0],
        status: isEdit ? task.status : TaskStatus.TODO,
        _id: isEdit ? task._id : ""
    }

    const { handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        clearErrors, } = useForm({
            resolver: yupResolver(validationSchema), defaultValues: initialValues
        });
    const handleAdd = (task: Task) => {
        onAddTask(task);
    };
    const handleEdit = (task: Task) => {
        onEditTask(task);
    }
    const submit = handleSubmit(async (task: Task) => {
        try {
            task.deadline.setDate(task.deadline.getDate() + 1);
            // task.deadline=formattedDate

            if (isEdit) {
                handleEdit(task);
            } else {
                handleAdd(task);
            }
            clearErrors();
            setOpenModal(false);
        } catch (error: { error: AxiosError }) {
            console.log(error);

            setError('root', { type: 'root', "message": error.response?.data });
        }
    });
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        <i className="fa-solid fa-xmark text-red-500 text-xl"></i>
                    </button>
                </div>
                <div className="title">
                    <h1 className="text-xl font-bold">{isEdit ? 'Edit' : 'Add'} Task</h1>
                </div>
                <div >
                    <form onSubmit={submit}>
                        <div className="grid mb-6     ">
                            <div className="mb-4">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                <input {...register('title')} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Task 1" required />
                            </div>
                            <div>

                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Desription</label>
                                <textarea {...register('description')} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   " placeholder="Write some description here..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 ">Deadline</label>
                                <input {...register('deadline')} type="date" id="deadline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Task 1" required />

                            </div>
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                <select {...register('status')} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                    <option value="TODO" >Todo</option>
                                    <option value="EN_COURS">En Cours</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>
                        </div>
                        <div className="footer">
                            <button
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                                id="cancelBtn"
                            >
                                Cancel
                            </button>
                            <button type="submit" disabled={isSubmitting}>{isEdit ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Modal;