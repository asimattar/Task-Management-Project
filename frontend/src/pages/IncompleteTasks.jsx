import React,{useState,useEffect} from "react";
import axios from "axios";
import Cards from "../components/Home/Cards";

const IncompleteTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks/")
      .then((response) => {
        setTasks(response.data.filter(task => !task.completed));
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold m-5">Incomplete Tasks</h2>
      <Cards 
      tasks={tasks}
      setTasks={setTasks}
      refreshTasks={() => {}}
      home={false}
      />
    </div>
  );
};

export default IncompleteTasks;
