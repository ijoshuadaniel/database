const express = require('express');
const cors = require('cors');
const writeSchema = require('./dbOperations/create');
const getAllDatabase = require('./dbOperations/getAllDatabase');
const deleteDatabse = require('./dbOperations/deleteDatabase');
const insertData = require('./dbOperations/insertData');
const updateData = require('./dbOperations/updateData');
const getDataFromDatabase = require('./dbOperations/getData');
const { signUpUser, loginUser } = require('./dbOperations/internal/login');
const getAllData = require('./dbOperations/getAllData');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create', (req, res) => {
  const body = req.body;
  const isSuccess = writeSchema(body);
  res.json({
    isSuccess,
  });
});

app.post('/insert', (req, res) => {
  const body = req.body;
  insertData(body, res);
});

app.post('/database', (req, res) => {
  const body = req.body;
  getAllDatabase(body, res);
});

app.post('/', (req, res) => {
  const body = req.body;
  getDataFromDatabase(body, res);
});

app.post('/getDatabase', getAllData);

app.post('/signup', (req, res) => {
  const body = req.body;
  signUpUser(body, res);
});

app.post('/login', (req, res) => {
  const body = req.body;
  loginUser(body, res);
});

app.post('/update', (req, res) => {
  const body = req.body;
  updateData(body, res);
});

app.delete('/delete', (req, res) => {
  const body = req.body;
  deleteDatabse(body, res);
});

app.listen(80);
