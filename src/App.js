import React from 'react';
import { Route, Routes } from 'react-router-dom';  // Import Routes and Route
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import TaskForm from './components/TaskForm';  // Add your task form for adding/editing tasks
import './App.css';  // Make sure to import the CSS
import UpcomingTasks from './pages/tasks';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div>
      {/* Include Header Component */}
      <Header />

      {/* Define Routes using <Routes> component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks/add" element={<TaskForm />} />
        <Route path="/tasks/edit/:id" element={<TaskForm />} />
        <Route path="/tasks" element={< UpcomingTasks />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Routes>
    </div>
  );
};

export default App;
