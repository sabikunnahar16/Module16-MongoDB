require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// Task 2.1 - Show all students
app.get('/students', async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

// Task 2.2 - Show one student by name
app.get('/students/:name', async (req, res) => {
  const student = await Student.findOne({ name: req.params.name });
  res.json(student);
});

// Task 2.3 - Name and department only (projection)
app.get('/students-basic', async (req, res) => {
  const students = await Student.find({}, { name: 1, department: 1, _id: 0 });
  res.json(students);
});

// Task 3.2 - Filter by department
app.get('/students/department/:dept', async (req, res) => {
  const students = await Student.find({ department: req.params.dept });
  res.json(students);
});

// Task 4.1 - Sort by CGPA descending
app.get('/students-sorted', async (req, res) => {
  const students = await Student.find({}).sort({ cgpa: -1 });
  res.json(students);
});

// Task 7.1 - Count students
app.get('/students-count', async (req, res) => {
  const count = await Student.countDocuments({});
  res.json({ count });
});

// Task 7.2 - Distinct departments
app.get('/departments', async (req, res) => {
  const departments = await Student.distinct('department');
  res.json(departments);
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

startServer();
