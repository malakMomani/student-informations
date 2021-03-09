'use strict';

let students = [];
let formEl = document.getElementById('student-form');
let tableEL = document.getElementById('result-table');
let tbodyEl = document.createElement('tbody');
tableEL.appendChild(tbodyEl);
let total = 0;
function Student(email, mobileNo, tuition) {
  this.email = email;
  this.mobileNo = mobileNo;
  this.tuition = tuition;
  this.name = '';
  this.age = 0;
  students.push(this);
}



Student.prototype.stdName = function () {
  let emailArr = this.email.split('@');
  // console.log(emailArr);
  // console.log(emailArr[0]);
  this.name = emailArr[0];
}

Student.prototype.stdAge = function () {
  this.age = Math.floor(Math.random() * (24 - 18 + 1) + 18);
}

Student.prototype.renderToTable = function () {
  tbodyEl.remove();
  tbodyEl = document.createElement('tbody');
  tableEL.appendChild(tbodyEl);
  let trEl; 
  
  let tdEl;
  for (let i = 0; i < students.length; i++) {
    trEl = document.createElement('tr');
    tbodyEl.appendChild(trEl);
    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = i;
    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = students[i].name;
    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = students[i].email;
    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = students[i].mobileNo;
    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = students[i].age;
    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = students[i].tuition;
  }
  
  let totalEl = document.getElementById('total');
  totalEl.textContent = `Total: ${total}`;

}



function saveStudent(event) {
  event.preventDefault();
  //console.log(event);
  let email = event.target.stdemail.value;
  let number = event.target.stdno.value;
  let tuition = event.target.tuition.value;
  let tuitionNum = parseInt(tuition);
  
  let student = new Student(email, number, tuition);
  student.stdName();
  student.stdAge();
  student.renderToTable();
  total =total+tuitionNum;
  let totalEl = document.getElementById('total');
  totalEl.textContent = `Total: ${total}`;
  //console.log(total);
  setLocalStorage();
}

function setLocalStorage() {
  let studentArray = JSON.stringify(students);
  localStorage.setItem('students', studentArray);

  localStorage.setItem('total',JSON.stringify(total));
}
function getLocalStorage() {
  let studentArray = JSON.parse(localStorage.getItem('students'));
  // console.log(studentArray);
  if (studentArray) {
    for (let i = 0; i < studentArray.length; i++) {
      let reStudent = new Student(studentArray[i].email, studentArray[i].mobileNo, studentArray[i].tuition);
      reStudent.stdName();
      reStudent.stdAge();
      reStudent.renderToTable();

    }
  }
  //  console.log(students);
  total = JSON.parse(localStorage.getItem('total'));
  console.log(total);
  let totalEl = document.getElementById('total');
  totalEl.textContent = `Total: ${total}`;
}


formEl.addEventListener('submit', saveStudent);
getLocalStorage();