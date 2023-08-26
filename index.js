const express=require('express');
const mysql=require('mysql');
const cors = require('cors');

const app=express();
const port=5000;
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'nagaraja'
})
db.connect(err=>{
    if(err){
        console.log('Data base connection failed',err)
        return
    }
    console.log('Data base connected successfully!')
})
app.get('/',(req,res)=>{
    res.send('Hello Raja')
})
app.get('/api/employees', async (req, res) => {
    try {
      const query = 'SELECT * FROM employees';
      const results = await new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
          if (err) {
            console.error('Database query error:', err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      res.json(results);
    } catch (error) {
      res.status(500).send('Error fetching data from the database');
    }
  });

  app.post('/api/employees', (req, res) => {
    const { firstname, lastname, phone } = req.body;
    const query = 'INSERT INTO employees (firstname, lastname, phone) VALUES (?, ?, ?)';
    db.query(query, [firstname, lastname, phone], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data into the database');
      } else {
        res.status(201).json({ message: 'Employee added successfully' });
      }
    });
  });
  
  app.put('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, phone } = req.body;
  
    const query = 'UPDATE employees SET firstname = ?, lastname = ?, phone = ? WHERE id = ?';
    db.query(query, [firstname, lastname, phone, id], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Error updating data in the database');
      } else {
        res.status(200).json({ message: 'Employee updated successfully' });
      }
    });
  });

app.listen(port,()=>{
    console.log(`Server Running on Port ${port}`)
})