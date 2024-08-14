import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
// import { useParams } from "react-router-dom";
import InputData from "../components/Home/InputData";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [InputDiv, setInputDiv] = useState("hidden");
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useState("All");
  // const { view } = useParams();

  const refreshTasks = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  };

  useEffect(() => {
    refreshTasks(); 
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true; // Show all tasks for "All" filter
  });

  return (
    <>
      <div className="container mx-auto py-2">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setInputDiv("fixed")}>
            <MdAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        <div className="flex justify-between items-center px-4 py-2 border-pink-800">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-3 py-2 rounded"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
        <Cards
          home={"true"}
          setInputDiv={setInputDiv}
          setEditData={setEditData}
          setTasks={setTasks}
          refreshTasks={refreshTasks}
          // tasks={tasks}
          tasks={filteredTasks}
        />
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        setTasks={setTasks}
        editData={editData}
        setEditData={setEditData}
        refreshTasks={refreshTasks}
      />
    </>
  );
};

export default AllTasks;
