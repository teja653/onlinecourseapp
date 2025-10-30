import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('student');
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(`/${data.user.role}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className='auth'>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} required />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value='student'>Student</option>
          <option value='instructor'>Instructor</option>
          <option value='admin'>Admin</option>
        </select>
        <button type='submit'>Login</button>
      </form>
      <p>Don't have account? <Link to='/register'>Register</Link></p>
    </div>
  );
}
