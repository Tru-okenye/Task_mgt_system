import React, { useState, useEffect } from 'react';
import TaskForm from './taskform';
import { Link } from 'react-router-dom';

const List = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/tasks/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                console.log('Error fetching tasks');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/delete/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setTasks(tasks.filter((task) => task.id !== id));
                    console.log('Task deleted successfully');
                } else {
                    console.log('Error deleting task');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        }
    };

    return (
        <>
            <div className='lists'>
                <h1>YOUR TASKS</h1>
              
                <div className='list'>
                    <table>
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Due Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.due_date}</td>
                                    <td>
                                        <button>
                                            <Link to={`/tasks/${task.id}/edit`} className='link'>EDIT</Link>
                                        </button>
                                        <button onClick={() => handleDelete(task.id)} className='link'>DELETE</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className='btn'> 
                    <Link to={'/add'} className='add'>ADD TASK</Link>
                </button>
            </div>
        </>
    );
};

export default List;
