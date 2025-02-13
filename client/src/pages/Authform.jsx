import React, { useState } from 'react';
import axios from 'axios';
import "./Auth.css";

const Authform = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/${type}`, { email, password });
            setMessage(response.data.message);
            if (type === 'login' && response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">{type === 'signup' ? 'Sign Up' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        {type === 'signup' ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                {message && <p className="text-center text-red-500 mt-2">{message}</p>}
            </div>
        </div>
    );
};

export default Authform;
