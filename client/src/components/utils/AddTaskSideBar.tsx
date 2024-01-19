// // AddTaskSidebar.js

// import React, { useState } from 'react';
// import { TaskStatus } from '../../interfaces/Task';

// const AddTaskSidebar = ({ onAddTask }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [newTask, setNewTask] = useState({
//         title: '',
//         description: '',
//         status: TaskStatus.TODO,
//     });

//     const openSidebar = () => {
//         setIsSidebarOpen(true);
//     };

//     const closeSidebar = () => {
//         setIsSidebarOpen(false);
//         setNewTask({
//             title: '',
//             description: '',
//             status: TaskStatus.TODO,
//         });
//     };

//     const handleInputChange = (e) => {
//         setNewTask({
//             ...newTask,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleAddTask = () => {
//         onAddTask(newTask);
//         closeSidebar();
//     };

//     return (
//         <div className="fixed inset-0 overflow-hidden z-50">
//             {isSidebarOpen && (
//                 <div
//                     className="absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
//                     onClick={closeSidebar}
//                 ></div>
//             )}

//             <div className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white overflow-y-auto transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//                 <div className="flex items-center justify-between p-4 border-b">
//                     <h2 className="text-lg font-semibold">Add Task</h2>
//                     <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none">
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                         </svg>
//                     </button>
//                 </div>
//                 <div className="p-4 space-y-4">
//                     <div className="mb-4">
//                         <label htmlFor="title">Title:</label>
//                         <input
//                             type="text"
//                             id="title"
//                             name="title"
//                             value={newTask.title}
//                             onChange={handleInputChange}
//                             className="border border-gray-300 rounded-md p-2 w-full"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="description">Description:</label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             value={newTask.description}
//                             onChange={handleInputChange}
//                             className="border border-gray-300 rounded-md p-2 w-full"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="status">Status:</label>
//                         <select
//                             id="status"
//                             name="status"
//                             value={newTask.status}
//                             onChange={handleInputChange}
//                             className="border border-gray-300 rounded-md p-2 w-full"
//                         >
//                             {Object.values(TaskStatus).map((status) => (
//                                 <option key={status} value={status}>
//                                     {status}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <button onClick={handleAddTask} className="px-4 py-2 bg-blue-500 text-white rounded-md">
//                         Add Task
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddTaskSidebar;
