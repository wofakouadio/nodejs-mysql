const express = require('express')

const mysql = require('mysql')

// create  connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})


// connect mysql environment
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('mysql connected')
})

const app = express()

const port = 3000

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// create database
app.get("/createdb", (req,res)=>{

    let sql = 'CREATE DATABASE nodemysql'

    db.query(sql, err=>{
        if (err){
            throw err
        }
        res.send('database created')
    })
}) 

// create table in nodemysql 
app.get("/createTable", (req,res)=>{

    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255),designation VARCHAR(255), address VARCHAR(255), PRIMARY KEY(id))'

    db.query(sql, err=>{
        if (err){
            throw err
        }
        res.send('table created')
    })

})

// insert data in table
app.get("/insertEmployee", (req, res)=>{

    let post = {name:'Ella Nuella', designation:'Software Engineer', address:'Accra'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, err=>{
        if (err){
            throw err
        }
        res.send('Employee inserted')
    })

})

// select employee data
app.get("/getEmployee", (req, res)=>{

    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, results)=>{
        if (err){
            throw err
        }
        console.log(results)
        res.send("Employee data fetched")
    })

})

// update employee data in table
app.get("/updateEmployee/:id", (req, res)=>{
    
    let newName = 'Kouadio Kouame'
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`
    // let sql = 'UPDATE employee SET name ='+${newName}+' WHERE id = ${req.params.id}' 
    let query = db.query(sql, err=>{
        if (err){
            throw err
        }
        res.send('Employee updated')
    })
    
})

// delete employee data from table
app.get("/deleteEmployee/:id", (req, res)=>{
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
    let query = db.query(sql, err=>{
        if(err)
            throw err
        res.send('Employee deleted')
    })
})

app.listen(port, ()=>{
    console.log('server started at port: ' + port)
})