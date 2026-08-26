const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    cgpa: { type: Number, required: true },
  },
  { collection: 'students' } // force collection name to "students"
);

module.exports = mongoose.model('Student', studentSchema);
