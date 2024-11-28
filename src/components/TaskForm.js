import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, updateTask, fetchTaskById } from '../api';
import '../styles/TaskForm.css';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'High',
    status: 'Pending', // Set default status
  });
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();
  const { id } = useParams();  // Get the task ID from the URL for editing

  // Fetch the task data if in edit mode (i.e., when an ID is provided)
  useEffect(() => {
    if (id) {
      const loadTask = async () => {
        try {
          const fetchedTask = await fetchTaskById(id);
          setTask(fetchedTask); // Set task data if found
        } catch (error) {
          setError('Failed to load task');
        }
      };
      loadTask();
    }
  }, [id]);

  // Handle form submission (either create or update task)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await updateTask(id, task); // Update task
      } else {
        await createTask(task); // Create new task
      }
      navigate('/tasks');  // Redirect to tasks list after successful operation
    } catch (error) {
      setError('Failed to save task'); // Show error if any
    }
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}  {/* Error message */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="form-control"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            className="form-control"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={task.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
