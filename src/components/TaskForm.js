import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, updateTask, fetchTaskById } from '../api';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'High',
  });
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const loadTask = async () => {
        try {
          const fetchedTask = await fetchTaskById(id);
          setTask(fetchedTask);
        } catch (error) {
          setError('Failed to load task');
        }
      };
      loadTask();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await updateTask(id, task);
      } else {
        await createTask(task);
      }
      navigate('/tasks');
    } catch (error) {
      setError('Failed to save task');
    }
  };

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
      {error && <div className="alert alert-danger">{error}</div>}
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
          ></textarea>
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
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
