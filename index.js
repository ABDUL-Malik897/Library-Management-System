const express = require('express');
const app = express()
const port = 4000
// const {users} = require('./data/user.json')


// imorting routers
const  userRouter  = require('./routes/users')
const  booksRouter  = require('./routes/books')


app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        msg: "Home Page :)"})
})

app.use('/users',userRouter)
app.use('/books',booksRouter)


// app.all('*',(req,res)=>{
//     res.status(500).json({
//         msg:'NOT BUILT YET'
//     })
// })
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);

})