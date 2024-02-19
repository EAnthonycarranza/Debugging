const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    highestGradeCompleted: String,
    yearGraduated: String,
    collegeHoursCompleted: Number,
    degree: String // e.g., BSc, BA, etc.
  });  
  const Education = mongoose.model('Education', EducationSchema);
module.exports = Education;
