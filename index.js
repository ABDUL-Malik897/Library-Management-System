const express = require('express');
const app = express()
const port = 4000
const {users} = require('./data/user.json')

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        msg: "Home Page :)"})
})

/**
 * Route /user
 * Method :GET
 * Description: Get all the list of users in the system
 * Access:Public
 * Parameter: None
 */

app.get('/users',(req,res)=>{
    res.status(200).json({
        success : true,
        data : users
    })
})

/**
 * Route /user/:id
 * Method :GET
 * Description: Get a users by their ID
 * Access:Public
 * Parameter: id
 */

app.get('/users/:id',(req,res)=>{

    const {id} = req.params
    const user = users.find((each)=>each.id === id)
    
    if(!user){
        return res.status(404).json({
            success: false,
            msg : `No User with ID:${id}`
        })
    }
    
    res.status(200).json({
        success: true,
        data : user
    })
})

/**
 * Route /user/
 * Method :POST
 * Description: Create/register a new user
 * Access:Public
 * Parameter: None
 */


app.post('/users',(req,res)=>{
    // req.body should have id ,name, surname , email ,subscriptionType ,subscriptionDate
    const {id ,name, surname , email ,subscriptionType ,subscriptionDate} = req.body;
    
    // Validation
    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
        return res.status(400).json({
            success: false,
            msg : "Please provide all the required fields"
        })
    }
    
    // Check if user already exists
    const user = users.find((each)=>each.id === id)
    
    if(user){
        return res.status(409).json({
            success: false,
            msg : `User Already Exists with ID:${id}`
        })
    }

    // Create new user
    users.push({id ,name, surname , email ,subscriptionType ,subscriptionDate})
    res.status(200).json({
        success: true,
        msg:`User Created Successfully`
    })

})

/**
 * Route /user/:id
 * Method :PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameter: id
 */

app.put('/users/:id',(req,res)=>{

    const {id} = req.params
    const {data} = req.body;

    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success: false,
            msg : `No User with ID:${id}`
        })
    }
    const updateUser = users.map((each)=>{
        if(each.id === id){
            
            return {
                ...each,
                ...data,
            }
        }
        return each
    })
})


// app.all('*',(req,res)=>{
//     res.status(500).json({
//         msg:'NOT BUILT YET'
//     })
// })
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);

})