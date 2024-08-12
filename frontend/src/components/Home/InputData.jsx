import React from 'react';
import { GiTireIronCross } from "react-icons/gi";

const InputData = ({InputDiv,setInputDiv}) => {
  return (
    <>
    <div className={`${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-50 h-full w-full`}></div>
    <div className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-full w-full`}>
    <div className='w-2/6 bg-gray-900 p-4 rounded'>
    <div className='flex justify-end'>
        <button className='text-xl' onClick={()=>setInputDiv("hidden")} >
            <GiTireIronCross />
        </button>
    </div>
        <input type="text" placeholder='Title' name='title' className='px-3 py-2 rounded w-full bg-gray-700 my-3'/>
        <textarea name="desc" type="text" placeholder='Description' className='px-3 py-2 rounded my-3 w-full bg-gray-700'></textarea>
        <button className='px-3 py-2 bg-blue-400 rounded-lg text-black text-xl font-semibold'>Submit</button>
     </div>
    </div>
    </>
  );
}

export default InputData;
