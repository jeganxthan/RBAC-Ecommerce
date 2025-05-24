import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import UserProvider from './context/UserContext'
import Dashboard from './components/pages/Admin/Dashboard'
import ManageTasks from './components/pages/Admin/ManageTasks'
import CreateTasks from './components/pages/Admin/CreateTasks'
import ManageUsers from './components/pages/Admin/ManageUsers'

import Userdashboard from './components/pages/Users/Userdashboard'
import MyTasks from './components/pages/Users/MyTasks'
import ViewTaskDetails from './components/pages/Users/ViewTaskDetails'
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <UserProvider>
    <div className='dark:bg-black dark:text-white dark:border-white'>
      <Router>
        <Routes>
          <Route path='/' element={<Hero/>} />

          {/*Admin Routes */}
          <Route>
            <Route element={<PrivateRoute allowedRoles={["admin"]}/>}/>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/tasks" element={<ManageTasks/>}/>
            <Route path="/admin/create-task" element={<CreateTasks/>}/>
            <Route path="/admin/users" element={<ManageUsers/>}/>
          </Route>

          {/*User Routes */}
          <Route>
            <Route element={<PrivateRoute allowedRoles={["admin"]}/>}/>
            <Route path="/admin/dashboard" element={<Userdashboard/>}/>
            <Route path="/user/my-tasks" element={<MyTasks/>}/>
            <Route path="/user/task-details/:id" element={<ViewTaskDetails/>}/>
          </Route>

        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App