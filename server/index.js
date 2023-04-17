const cors = require('cors')
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const allEmployee = require('./employees.json')

app.use(cors()) // to allow cross origin requests
app.use(bodyParser.json()) // to convert the request into JSON
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/emps', (req, res) => {
  res.json(allEmployee);
})

app.delete('/emps/:id', (req, res) => {
  const id = req.params.id;
  const index = allEmployee.findIndex(emp => emp.id == id);
  if (index === -1) {
    res.status(404).send('Resource not found');
  } else {
    allEmployee.splice(index, 1);
    res.status(204).send();
  }
})

app.put('/emps/:id', (req, res) => {
  const id = req.params.id;
  const {first_name, last_name, emailId, bio} = req.body;
  const employeeIndex = allEmployee.findIndex(e => e.id == id);
  if (employeeIndex === -1) {
    res.status(404).send('Employee not found');
  } else {
    allEmployee[employeeIndex] = { ...allEmployee[employeeIndex], first_name, last_name, emailId, bio };
    res.status(200).send('Employee updated successfully');
  }
})

app.get('/:userName', (req, res) => {
  const userName = req.params.userName;
  const employee = allEmployee.find(emp => emp.username === userName);
  if(employee)
    res.json(employee);
  else res.status(404).send('Employee not found');
})

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))