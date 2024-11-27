import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../api'; // Import the correct functions from api.js

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks(); // Fetch tasks using the API function
        setTasks(tasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id); // Delete the task using the API function
      setTasks(tasks.filter(task => task._id !== id)); // Remove deleted task from the state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/tasks/new" className="btn btn-primary">Create Task</Link>
      <ul className="list-group mt-4">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/tasks/${task._id}`}>{task.title}</Link> {/* Link to Task Detail */}
            <div>
              <Link to={`/tasks/${task._id}/edit`} className="btn btn-warning btn-sm mr-2">Edit</Link> {/* Link to Edit Task */}
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
