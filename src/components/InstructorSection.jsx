import React, { useEffect, useState } from 'react';
import API from '../api';

export default function InstructorSection(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [courses,setCourses]=useState([]);
  const [form,setForm]=useState({title:'',description:'',price:0});
  const fetchCourses = async ()=>{
    const { data } = await API.get('/courses');
    setCourses(data.filter(c=>c.instructorId===user.id));
  };
  useEffect(()=>{ fetchCourses(); },[]);
  const createCourse = async ()=>{
    await API.post('/courses', {...form, instructorId: user.id});
    setForm({title:'',description:'',price:0});
    fetchCourses();
  };
  const deleteCourse = async (id)=>{ await API.delete(`/courses/${id}`); fetchCourses(); };
  return (
    <div className='section'>
      <h2>Instructor Panel</h2>
      <div className='card'>
        <input placeholder='Title' value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <textarea placeholder='Description' value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input placeholder='Price' type='number' value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)})} />
        <button onClick={createCourse}>Create Course</button>
      </div>
      <h3>Your Courses</h3>
      {courses.map(c=>(
        <div className='card' key={c.id}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>Status: {c.status}</p>
          <button onClick={()=>deleteCourse(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
