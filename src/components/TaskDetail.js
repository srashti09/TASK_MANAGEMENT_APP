// src/components/TaskDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';  // Assuming TaskForm is the form used to edit a task
import '../styles/TaskDetail.css';

const TaskDetail = () => {
    const { id } = useParams();  // Get the task ID from the URL
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  // State to toggle between viewing and editing
    const navigate = useNavigate();

    // Fetch task details from the API
    const fetchTask = async () => {
        try {
            const response = await axios.get(`/tasks/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error("Error fetching task: ", error);
        }
    };

    useEffect(() => {
        fetchTask();  // Fetch task when the component mounts or task ID changes
    }, [id]);

    // Delete task
    const deleteTask = async () => {
        try {
            await axios.delete(`/tasks/${id}`);
            navigate('/');  // Redirect to the home page after task deletion
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    // Toggle between viewing and editing the task
    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div>
            {task ? (
                <div>
                    <h2>Task Details</h2>
                    {!isEditing ? (
                        <div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <p>Priority: {task.priority}</p>
                            <button onClick={handleEditClick}>Edit</button> {/* Edit button */}
                            <button onClick={deleteTask}>Delete</button> {/* Delete button */}
                        </div>
                    ) : (
                        <TaskForm fetchTasks={() => fetchTask()} task={task} setIsEditing={setIsEditing} />
                        // Pass the task and setIsEditing to TaskForm for editing
                    )}
                </div>
            ) : (
                <p>Loading task details...</p>
            )}
        </div>
    );
};

export default TaskDetail;
