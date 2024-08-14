import React,{ useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks/")
      .then((response) => {
        setTasks(response.data.filter(task => task.completed));
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);


  return (
    <div>
      <h2 className="text-2xl font-semibold m-5">Completed Tasks</h2>
      <Cards 
      home={false} 
      tasks={tasks}
      setTasks={setTasks}
      refreshTasks={() => {}}
      />
    </div>
  );
};

export default CompletedTasks;
