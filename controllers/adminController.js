import { Course } from '../models/index.js';

export const approveCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.update({ status: 'approved' }, { where: { id } });
    res.json({ message: 'Course approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.update({ status: 'rejected' }, { where: { id } });
    res.json({ message: 'Course rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
