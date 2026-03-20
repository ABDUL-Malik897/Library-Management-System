const express = require('express');
const app = express()
const port = 4000
const dotenv = require('dotenv')

// import db connection file

const Dbconnection =  require('./dbConnection')

// imorting routers
const  userRouter  = require('./routes/users')
const  booksRouter  = require('./routes/books')

dotenv.config();
Dbconnection()

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        msg: "Home Page :)"})
})

app.use('/users',userRouter)
app.use('/books',booksRouter)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);

})