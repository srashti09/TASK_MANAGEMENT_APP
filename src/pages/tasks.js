import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UpcomingTasks = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        // Fetch tasks from the API
        const response = await axios.get('http://localhost:5000/tasks');
        const tasks = response.data;

        // Filter tasks that are upcoming (due date is in the future and not completed)
        const filteredTasks = tasks.filter(
          (task) =>
            new Date(task.dueDate) > new Date() && task.status !== 'Completed'
        );
        setUpcomingTasks(filteredTasks);
      } catch (error) {
        console.error('Error fetching upcoming tasks:', error);
      }
    };

    fetchUpcomingTasks();
  }, []);

  return (
    <div className="upcoming-tasks-container">
      <h2>Upcoming Tasks</h2>
      <div>
        {upcomingTasks.length > 0 ? (
          upcomingTasks.map((task) => (
            <div key={task._id} className="task-item">
              <h4>{task.title}</h4>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Priority: {task.priority}</p>
              <Link to={`/tasks/edit/${task._id}`}>
                <button className="btn btn-warning">Edit</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No upcoming tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;
