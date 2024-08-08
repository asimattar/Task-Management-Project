import React from 'react';
import Home from './pages/Home';
import AllTasks from './pages/AllTasks'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompleteTasks from './pages/IncompleteTasks'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <div className='bg-gray-700 text-white h-screen p-1 '>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}>
          <Route index element={<AllTasks/>}/>
          <Route path='/importanttasks' element={<ImportantTasks/>}/>
          <Route path='/completedtasks' element={<CompletedTasks/>}/>
          <Route path='/incompletedtasks' element={<IncompleteTasks/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
