
var mongoose=require("mongoose");
var Schema =mongoose.Schema;

var employeeSchema = new Schema({
  // id: String,
  // name: String,
  // gender: String,
  // salary: String,
  // dateOfJoin: String,
  // prevExp: String
  id: Number,
  gender: String,
  bdate: Number,
  educ: Number,
  jobcat: Number,
  salary: Number,
  salbegin: Number,
  jobtime: Number,
  prevexp: Number,
  minority: Number
});

module.exports = mongoose.model('employee',employeeSchema);
