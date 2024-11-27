import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts'; // You can use any chart library
import '../styles/Dashboard.css';



const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({});

  useEffect(() => {
    // Fetch tasks from the backend API
    axios.get('/tasks')
      .then(response => {
        setTasks(response.data);
        calculateTaskStats(response.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Calculate task statistics (for analytics)
  const calculateTaskStats = (tasks) => {
    const stats = {
      total: tasks.length,
      highPriority: tasks.filter(task => task.priority === 'High').length,
      mediumPriority: tasks.filter(task => task.priority === 'Medium').length,
      lowPriority: tasks.filter(task => task.priority === 'Low').length,
      completed: tasks.filter(task => task.completed).length,
      upcoming: tasks.filter(task => new Date(task.dueDate) > new Date()).length,
    };
    setTaskStats(stats);
  };

  // Data for pie chart (Task distribution by priority)
  const priorityData = [
    { name: 'High', value: taskStats.highPriority || 0 },
    { name: 'Medium', value: taskStats.mediumPriority || 0 },
    { name: 'Low', value: taskStats.lowPriority || 0 }
  ];

  return (
    <div className="dashboard-container">
      <h2>Task Dashboard</h2>

      <div className="task-summary">
        <h3>Task Summary</h3>
        <p>Total Tasks: {taskStats.total}</p>
        <p>Completed Tasks: {taskStats.completed}</p>
        <p>Upcoming Tasks: {taskStats.upcoming}</p>
      </div>

      <div className="priority-distribution">
        <h3>Task Distribution by Priority</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={priorityData}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {priorityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#ff0000' : (index === 1 ? '#ff8000' : '#00ff00')} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Additional sections can be added for upcoming deadlines, etc. */}
    </div>
  );
};

export default Dashboard;
