import express from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// public read
router.get('/', getCourses);

// protected create/update/delete for instructors (or admins)
router.post('/', verifyToken, requireRole('instructor'), createCourse);
router.put('/:id', verifyToken, requireRole('instructor'), updateCourse);
router.delete('/:id', verifyToken, requireRole('instructor'), deleteCourse);

export default router;
