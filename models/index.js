import { sequelize } from '../config/db.js';
import User from './User.js';
import Course from './Course.js';

// Relations
User.hasMany(Course, { foreignKey: 'instructorId' });
Course.belongsTo(User, { foreignKey: 'instructorId' });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL Database successfully!');
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized with MySQL.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export { connectDB, User, Course };
