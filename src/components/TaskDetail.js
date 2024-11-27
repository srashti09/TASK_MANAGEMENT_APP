// src/components/TaskDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import '../styles/TaskDetail.css';


const TaskDetail = () => {
    const { id } = useParams(); // URL se task ID lete hain
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const fetchTask = async () => {
        try {
            const response = await axios.get(`/tasks/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error("Error fetching task: ", error);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    const deleteTask = async () => {
        try {
            await axios.delete(`/tasks/${id}`);
            navigate('/'); // Task delete hone ke baad home page par redirect karte hain
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

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
                            <button onClick={handleEditClick}>Edit</button>
                            <button onClick={deleteTask}>Delete</button>
                        </div>
                    ) : (
                        <TaskForm fetchTasks={() => fetchTask()} task={task} />
                    )}
                </div>
            ) : (
                <p>Loading task details...</p>
            )}
        </div>
    );
};

export default TaskDetail;
