import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'; // Import axios for API requests
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts'; // Import recharts components
import { deleteTask } from '../api'; // Import deleteTask from API
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({});
  const [completionRateData, setCompletionRateData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch tasks with status filter
  const fetchTasksData = async (statusFilter) => {
    try {
      const url = statusFilter
        ? `http://localhost:5000/tasks?status=${statusFilter}`
        : `http://localhost:5000/tasks`;

      const response = await axios.get(url);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Calculate task statistics
  const calculateTaskStats = (tasks) => {
    const stats = {
      total: tasks.length,
      highPriority: tasks.filter(task => task.priority === 'High').length,
      mediumPriority: tasks.filter(task => task.priority === 'Medium').length,
      lowPriority: tasks.filter(task => task.priority === 'Low').length,
      completed: tasks.filter(task => task.status === 'Completed').length,
      upcoming: tasks.filter(task => new Date(task.dueDate) > new Date()).length,
    };
    setTaskStats(stats);
  };

  // Calculate completion rate
  const calculateCompletionRate = (tasks) => {
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    setCompletionRateData([{
      name: 'Tasks', completed: completionRate, date: new Date().toLocaleDateString()
    }]);
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Filter tasks based on the search term
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowercasedSearchTerm) ||
        task.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  // Fetch tasks when the component mounts or when the filter changes
  useEffect(() => {
    fetchTasksData(statusFilter);
  }, [statusFilter]);

  // Recalculate stats and completion rate whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      calculateTaskStats(tasks);
      calculateCompletionRate(tasks);
    }
  }, [tasks]);

  // Data for pie chart (Task distribution by priority)
  const priorityData = [
    { name: 'High', value: taskStats.highPriority || 0 },
    { name: 'Medium', value: taskStats.mediumPriority || 0 },
    { name: 'Low', value: taskStats.lowPriority || 0 },
  ];

  return (
    <div className="dashboard-container">
      <h2>Task Dashboard</h2>

      <div className="task-filter">
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="task-summary">
        <h3>Task Summary</h3>
        <PieChart width={400} height={400}>
          <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
            {priorityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#ff4d4d', '#ffcc00', '#00bfff'][index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <LineChart width={400} height={200} data={completionRateData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Line type="monotone" dataKey="completed" stroke="#8884d8" />
          <RechartsTooltip />
        </LineChart>
      </div>
      <div className="create-task-container">
      <Link to="/tasks/add">
        <button className="create-task-button">Create Task</button>
      </Link>
      </div>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task._id} className="task-item">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p> {/* Display task status */}
              <Link to={`/tasks/edit/${task._id}`}>
                <button className="edit-task-button">Edit</button>
              </Link>
              <button className="delete-task-button" onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
