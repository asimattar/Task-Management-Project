import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";


const Cards = ({home ,InputDiv,setInputDiv}) => {
  const data = [
    {
      title: "Task 1",
      desc: "I have to create my channel the best ever coding channel in hindi for those who do not understand english pro",
      status:'In Complete'
    },
    {
      title: "Task 2",
      desc: "I need to clear basics of Cpp. Topics: Abstracrtion, Inheritance, Polymorphism, virtual functions etc. ",
      status:'Complete'
    },
    {
      title: "Task 3",
      desc: "My assignmnet on 20 march. I have to complete it.",
      status:'In Complete'
    },
    {
      title: "Task 4",
      desc: "For Project I need to see tutorials of the code master channel",
      status:'In Complete'
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div className=" flex flex-col justify-between bg-gray-600 rounded p-4">
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button className={`${items.status=== "In Complete"? "bg-red-400":"bg-green-700"} p-2 rounded w-3/6 `}>{items.status}</button>
              <div className=" w-3/6 p-2 text-2xl flex justify-around">
                {/* <button></button> */}
                <button><FaRegEdit /></button>
                <button><MdDelete /></button>
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
