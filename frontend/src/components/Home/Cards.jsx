import React,{ useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";


const Cards = ({home ,setInputDiv,setEditData}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks/")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const handleEdit = (task) => {
    setEditData(task); 
    setInputDiv("fixed"); 
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/tasks/${id}/`)
      .then(() => {
        console.log("Task deleted!");
        setTasks(tasks.filter(task => task.id !== id)); // Remove task from state
      })
      .catch((error) => console.error("There was an error deleting the task!", error));
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      
        {tasks.map((items) => (
          <div key={items.id} className=" flex flex-col justify-between bg-gray-600 rounded p-4">
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
            <button className={`${items.completed ? "bg-green-700" : "bg-red-400"} p-2 rounded w-3/6`}>
              {items.completed ? "Complete" : "Incomplete"}
            </button>
              <div className=" w-3/6 p-2 text-2xl flex justify-around">
                {/* <button></button> */}
                <button onClick={() => handleEdit(items)}><FaRegEdit /></button>
                <button onClick={() => handleDelete(items.id)}><MdDelete /></button>
              </div>
            </div>
          </div>
        ))}
        {home==="true" && (<button onClick={()=>setInputDiv("fixed")} className=" flex flex-col justify-center items-center bg-gray-600 rounded p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300">
          <h2 className="text-2xl mb-4">Add Task</h2>
          <MdAddCircle className="text-5xl"/>
        </button>)}
        
    </div>
  );
};

export default Cards;
