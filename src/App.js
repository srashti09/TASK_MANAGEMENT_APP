import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header component
import TaskList from './components/TaskList'; // Import TaskList component
import TaskDetail from './components/TaskDetail'; // Import TaskDetail component
import TaskForm from './components/TaskForm'; // Import TaskForm component
import Dashboard from './components/Dashboard'; // Import Dashboard component
import Home from './pages/Home'; // Import Home page component
import About from './pages/About'; // Import About page component

function App() {
  return (
    <div className="App">
      <Header /> {/* Display the header */}
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskList />} /> {/* Task list route */}
          <Route path="/tasks/:id" element={<TaskDetail />} /> {/* Task detail route */}
          <Route path="/tasks/new" element={<TaskForm />} /> {/* Task creation route */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
