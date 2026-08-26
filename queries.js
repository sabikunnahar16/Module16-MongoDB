/**
 * queries.js
 * Practice: Basic MongoDB queries on the "students" collection.
 * Run with: node queries.js
 *
 * Each task is wrapped in its own async function so you can read them
 * top-to-bottom and see exactly what each query does and what it returns.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Student = require('./models/Student');

async function run() {
  await connectDB();

  // Start clean each run so the demo is repeatable
  await Student.deleteMany({});

  // ---------------------------------------------------------------------
  // TASK 1: Insert Queries
  // ---------------------------------------------------------------------

  // 1. Insert one student document
  const oneStudent = await Student.create({
    name: 'Rahim',
    age: 22,
    department: 'CSE',
    cgpa: 3.75,
  });
  console.log('\n[Task 1.1] Inserted one student:', oneStudent);

  // 2. Insert multiple student documents
  const manyStudents = await Student.insertMany([
    { name: 'Karim', age: 21, department: 'EEE', cgpa: 3.2 },
    { name: 'Fatema', age: 23, department: 'CSE', cgpa: 3.9 },
    { name: 'Sabina', age: 20, department: 'BBA', cgpa: 3.4 },
    { name: 'Jamal', age: 24, department: 'CSE', cgpa: 3.1 },
  ]);
  console.log('\n[Task 1.2] Inserted multiple students:', manyStudents.length);

  // ---------------------------------------------------------------------
  // TASK 2: Find Queries
  // ---------------------------------------------------------------------

  // 1. Show all students
  const allStudents = await Student.find({});
  console.log('\n[Task 2.1] All students:', allStudents);

  // 2. Show only one student by name
  const studentByName = await Student.findOne({ name: 'Rahim' });
  console.log('\n[Task 2.2] Student named Rahim:', studentByName);

  // 3. Show only name and department (Projection)
  const nameAndDept = await Student.find({}, { name: 1, department: 1, _id: 0 });
  console.log('\n[Task 2.3] Name and department only:', nameAndDept);

  // ---------------------------------------------------------------------
  // TASK 3: Filter Queries
  // ---------------------------------------------------------------------

  // 1. Students whose age is greater than 20
  const olderThan20 = await Student.find({ age: { $gt: 20 } });
  console.log('\n[Task 3.1] Age > 20:', olderThan20);

  // 2. Students whose department is CSE
  const cseStudents = await Student.find({ department: 'CSE' });
  console.log('\n[Task 3.2] Department = CSE:', cseStudents);

  // 3. Students whose CGPA is greater than or equal to 3.50
  const highCgpa = await Student.find({ cgpa: { $gte: 3.5 } });
  console.log('\n[Task 3.3] CGPA >= 3.50:', highCgpa);

  // ---------------------------------------------------------------------
  // TASK 4: Sort & Limit
  // ---------------------------------------------------------------------

  // 1. Sort students by CGPA (highest first)
  const sortedByCgpa = await Student.find({}).sort({ cgpa: -1 });
  console.log('\n[Task 4.1] Sorted by CGPA desc:', sortedByCgpa);

  // 2. Show only the first 3 students
  const firstThree = await Student.find({}).limit(3);
  console.log('\n[Task 4.2] First 3 students:', firstThree);

  // ---------------------------------------------------------------------
  // TASK 5: Update Queries
  // ---------------------------------------------------------------------

  // 1. Update one student's department
  const updatedDept = await Student.updateOne(
    { name: 'Karim' },
    { $set: { department: 'CSE' } }
  );
  console.log('\n[Task 5.1] Updated Karim department:', updatedDept);

  // 2. Increase one student's CGPA
  const updatedCgpa = await Student.updateOne(
    { name: 'Jamal' },
    { $inc: { cgpa: 0.2 } }
  );
  console.log('\n[Task 5.2] Increased Jamal CGPA:', updatedCgpa);

  // ---------------------------------------------------------------------
  // TASK 6: Delete Queries
  // ---------------------------------------------------------------------

  // 1. Delete one student by name
  const deleted = await Student.deleteOne({ name: 'Sabina' });
  console.log('\n[Task 6.1] Deleted Sabina:', deleted);

  // ---------------------------------------------------------------------
  // TASK 7: Practice Commands
  // ---------------------------------------------------------------------

  // 1. Count total number of students
  const totalCount = await Student.countDocuments({});
  console.log('\n[Task 7.1] Total student count:', totalCount);

  // 2. Show all unique departments using distinct()
  const uniqueDepartments = await Student.distinct('department');
  console.log('\n[Task 7.2] Unique departments:', uniqueDepartments);

  await mongoose.disconnect();
  console.log('\nDone. Disconnected from MongoDB.');
}

run().catch((err) => {
  console.error('Error running queries:', err);
  process.exit(1);
});
