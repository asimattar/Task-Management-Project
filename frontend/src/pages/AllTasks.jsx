import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import InputData from "../components/Home/InputData";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [InputDiv, setInputDiv] = useState("hidden");
  const [editData, setEditData] = useState(null);
  const { view } = useParams();

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

  const filteredTasks = tasks.filter(task => {
    if (view === "completedtasks") return task.completed;
    if (view === "incompletedtasks") return !task.completed;
    return true; // Show all tasks for the default view
  });


  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <MdAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        <Cards
          home={"true"}
          setInputDiv={setInputDiv}
          setEditData={setEditData}
          setTasks={setTasks}
          refreshTasks={refreshTasks}
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
