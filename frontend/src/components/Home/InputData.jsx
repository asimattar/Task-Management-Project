import React, { useState,useEffect} from "react";
import axios from "axios";
import { GiTireIronCross } from "react-icons/gi";

const InputData = ({ InputDiv, setInputDiv,setTasks, refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
      setIsEditing(true);
      setEditId(editData.id);
    } else {
      setTitle("");
      setDescription("");
      setIsEditing(false);
      setEditId(null);
    }
  }, [editData]);


  const handleSubmit = () => {
    if (isEditing) {
      axios
        .put("http://localhost:8000/api/tasks/${editData.id}/", {
          title,
          description,
          completed: false,
        })
        .then((response) => {
          console.log("Task added!", response.data);
          setTasks(prevTasks => 
            prevTasks.map(task => (task.id ===response.data.id ? response.data: task))
          );
          setInputDiv("hidden");
        })
        .catch((error) => {
          console.error("There was an error updating the task!", error);
        });
       } else {
          // Add new task
          axios
            .post("http://localhost:8000/api/tasks/", {
              title,
              description,
              completed: false,
            })
            .then((response) => {
              console.log("Task added!", response.data);
              setTasks(prevTasks => [...prevTasks, response.data]);
              setInputDiv("hidden");
              refreshTasks(); 
            })
            .catch((error) => {
              console.error("There was an error adding the task!", error);
            });
        }
  };

  return (
    <>
      <div
        className={`${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-50 h-full w-full`}
      ></div>
      <div
        className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-full w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button className="text-xl" onClick={() => setInputDiv("hidden")}>
              <GiTireIronCross />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="desc"
            type="text"
            placeholder="Description"
            className="px-3 py-2 rounded my-3 w-full bg-gray-700"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="px-3 py-2 bg-blue-400 rounded-lg text-black text-xl font-semibold" onClick={handleSubmit}>
          {editData ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
