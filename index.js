const express = require('express');

const app = express()

const port = 4000

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        msg: "Home Page :)"})
})

// app.all('*',(req,res)=>{
//     res.status(500).json({
//         msg:'NOT BUILT YET'
//     })
// })
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);

})