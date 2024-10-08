import React from 'react';
import Home from './pages/Home';
import AllTasks from './pages/AllTasks'
// import axios from "axios";
// import Sidebar from "./components/Sidebar";
// import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompleteTasks from './pages/IncompleteTasks'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <div className='bg-gray-700 text-white h-screen p-1 relative'>
      <Router>       
        <Routes>
          <Route exact path='/' element={<Home/>}>
          <Route index element={<AllTasks/>}/>
          {/* <Route path='/importanttasks' element={<ImportantTasks/>}/> */}
          <Route path='/completedtasks' element={<CompletedTasks/>}/>
          <Route path='/incompletedtasks' element={<IncompleteTasks/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
