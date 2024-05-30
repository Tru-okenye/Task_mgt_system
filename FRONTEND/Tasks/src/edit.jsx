import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditForm = () => {
    const { id } = useParams(); // Get the taskId from the URL params
    const [task, setTask] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');
    const Navigate = useNavigate()

    // Fetch the task details using taskId
    const fetchTask = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTask(data);
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
                setPriority(data.priority);
                setDueDate(data.due_date);
            } else {
                console.log('Error fetching task');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    // Handle form submission to update the task
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedTask = {
            title,
            description,
            status,
            priority,
            due_date: dueDate
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/edit/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Task updated:', data);
                Navigate('/tasks'); 
            } else {
                console.log('Error updating task');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <div className='taskform'>
            <div className="task">

            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit}>
            
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
               
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
              
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
            
                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
             
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
              
                <button type="submit">Update Task</button>
            </form>
            </div>
        </div>
    );
};

export default EditForm;
