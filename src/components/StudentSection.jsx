import React, { useEffect, useState } from 'react';
import API from '../api';

export default function StudentSection(){
  const [courses,setCourses]=useState([]);
  useEffect(()=>{ API.get('/courses').then(r=>setCourses(r.data)).catch(()=>{}); },[]);
  return (
    <div className='section'>
      <h2>Available Courses</h2>
      <div className='grid'>
        {courses.map(c=>(
          <div key={c.id} className='card'>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>Status: {c.status}</p>
            {c.status === 'approved' ? <button>Enroll</button> : <small>Awaiting approval</small>}
          </div>
        ))}
      </div>
    </div>
  );
}
