import { Course } from '../models/index.js';

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, instructorId } = req.body;
    if (!title || !instructorId) return res.status(400).json({ message: 'Title and instructorId required' });
    const course = await Course.create({ title, description, price, instructorId });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    await Course.update({ title, description, price }, { where: { id } });
    res.json({ message: 'Course updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.destroy({ where: { id } });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
