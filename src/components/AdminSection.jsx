import React, { useEffect, useState } from 'react';
import API from '../api';

export default function AdminSection(){
  const [courses,setCourses]=useState([]);
  const fetchCourses = async ()=>{ const { data } = await API.get('/courses'); setCourses(data); };
  useEffect(()=>{ fetchCourses(); },[]);
  const approve = async (id)=>{ await API.put(`/admin/approve/${id}`); fetchCourses(); };
  const reject = async (id)=>{ await API.put(`/admin/reject/${id}`); fetchCourses(); };
  return (
    <div className='section'>
      <h2>Admin Dashboard</h2>
      <div className='grid'>
        {courses.map(c=>(
          <div className='card' key={c.id}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>Instructor: {c.instructorId}</p>
            <p>Status: {c.status}</p>
            {c.status === 'pending' && (
              <div>
                <button onClick={()=>approve(c.id)}>Approve</button>
                <button onClick={()=>reject(c.id)}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
