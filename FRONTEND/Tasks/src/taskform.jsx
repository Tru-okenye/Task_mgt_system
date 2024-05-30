import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [priority, setPriority] = useState('MEDIUM');
    const [dueDate, setDueDate] = useState('');
    const Navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const task = {
            title,
            description,
            status,
            priority,
            due_date: dueDate
        };
        console.log('Submitting task:', task); // Log the task data
        try {
            const response = await fetch('http://127.0.0.1:8000/tasks/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
     
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Task added:', data);
                // Reset form fields
                setTitle('');
                setDescription('');
                setStatus('PENDING');
                setPriority('MEDIUM');
                setDueDate('');
                Navigate('/tasks'); 

            } else {
                console.log('Error adding task');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <>
        <div className='taskform'>

        <div className='task'>
<h2>ADD TASK</h2>
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
          
            <button type="submit">Add Task</button>
        </form>
        
        </div>
        </div>
        </>
    );
};

export default TaskForm;
