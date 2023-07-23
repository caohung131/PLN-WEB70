// const Pi = 3.14;

// const deraemon = {
//     userName: 'Doraemon',
//     age: 5, 
//     from: 'Japan 2100'
// };

// console.log(deraemon)
// console.log(Pi)

// for (let i = 0; i < 10; i++) {
//     console.log(i)
// }

// import express from 'express'
// import crypto from 'crypto'

// let todoList = [];
// const app = express();

// app.get('/app/v1/todo-list', (req, res) => {
//     res.send( {
//         data:todoList,
//         message: "Thanh cong", 
//         sucsess: true
//     })
// })

// app.get('/app/v1/todo-list/add', (req, res) => {
//     const newToDo = {
//         id: crypto.randomUUID(),
//         nameTodo: "Hung dz",
//         createdAt: new Date()
//     }
//     todoList.push(newToDo)
//     res.send({data: 'Them thanh cong',})
// })

// app.get('/app/v1/todo-list/remove-duplicate', (req, res) => {
//     const mapFilter = todoList.filter((itemt, index) => {
//         return todoList.findIndex((itemTD) => itemTD.nameTodo === itemt.nameTodo) === index;
//         // lay name thang con so sanh thang cha lay dau so sanh voi index
//     })

//     todoList = mapFilter;
//     res.send({
//         data: todoList,
//         message: 'Thanh cong',
//         sucsess: true
//     })
// })

// app.listen(5001, () => {
//     console.log('This server is running ')
// })


// const { multiply, sum } = require ("./sum.js");
// const fs = require('fs')
// console.log("hello mindx");



// const a = 5 , b = 6;
// const result = sum(a, b);

// console.log(`sum a = ${a} + b = ${b} = ${result}`)

// fs.readFile('./text.txt','utf-8', (err, data) => {
//     if(err) {
//         console.log('Khong mo duoc file')
//     } else {
//         console.log(data)
//     }
// })

const express = require("express")

const app = express();
const PORT = 3001;
app.get("/", (req, res) => {
    res.send("this is my first web site service");
})

app.listen(PORT,  () => {
    console.log('My app running on Port' + PORT)
})