const cors = require('cors')
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const allEmployee = require('./employees.json')

app.use(cors()) // to allow cross origin requests
app.use(bodyParser.json()) // to convert the request into JSON
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json(allEmployee);
})

app.get('/:userName', (req, res) => {
  const userName = req.params.userName;
  const employee = allEmployee.find(emp => emp.username === userName);
  if(employee)
    res.json(employee);
  else res.status(404).send('Employee not found');
})

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))