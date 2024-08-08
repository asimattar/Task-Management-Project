import React from 'react';
import { GrNotes } from "react-icons/gr";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const data=[
    {
      title:"All Tasks",
      icon:<GrNotes />,
      link:'/'
    },
    {
      title:"Important Tasks",
      icon:<MdLabelImportantOutline />,
      link:'/importanttasks'
    },
    {
      title:"Completed Tasks",
      icon:<FaCheckDouble />,
      link:'/completedtasks'
    },
    {
      title:"Incomplete Tasks",
      icon:<TbNotebookOff />,
      link:'/incompletedtasks'
    },
  ]
  return (
    <>
      <h2 className='text-xl mb-2 font-semibold'>Task Management App</h2>
      <hr />

     <div className='my-20 mx-7'>
        {data.map((items,i)=>(
          <Link to={items.link} key={i} className='my-5 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300 cursor-pointer '>
            {items.icon}&nbsp; {items.title}</Link>
        ))}
      </div>
    </>
    
  );
}

export default Sidebar;
 