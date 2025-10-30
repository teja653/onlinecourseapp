import express from 'express';
import { approveCourse, rejectCourse } from '../controllers/adminController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/approve/:id', verifyToken, requireRole('admin'), approveCourse);
router.put('/reject/:id', verifyToken, requireRole('admin'), rejectCourse);

export default router;
