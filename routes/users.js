const express = require('express');
const  { users } = require('../data/user.json');

const router= express.Router()

router.get('/',(req,res)=>{
    res.status(200).json({
        success : true,
        data : users
    })
})

/**
 * Route: /user/:id
 * Method :GET
 * Description: Get a users by their ID
 * Access:Public
 * Parameter: id
 */

router.get('/:id',(req,res)=>{

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
 * Route: /user
 * Method :POST
 * Description: Create/register a new user
 * Access:Public
 * Parameter: None
 */


router.post('/',(req,res)=>{
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
 * Route: /user/:id
 * Method :PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameter: id
 */

router.put('/:id',(req,res)=>{

    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success: false,
            msg : `No User with ID:${id}`
        })
    }
    // object.assign(each, data)
    const updateUser = users.map((each)=>{
        if(each.id === id){
            
            return {
                ...each,
                ...data,
            }
        }
        return each
    })
    res.status(200).json({
        success:true,
        data:updateUser,
        msg:"User Updated Successfully"
    })
})

/**
 * Route: /user/:id
 * Method : DELETE
 * Description: Deleting a user by their ID
 *  Access: Public
 * Parameter: id
 */

router.delete('/:id',(req,res)=>{

    const {id} = req.params;        
    
    // Check if user exists
    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({   
            success: false, 
            msg : `No User with ID:${id}`   
        })
    }

    // if  user exists, filter out the user from the users array 
    
    const deleteUser = users.filter((each)=>each.id !== id)
    
    // Method - 2

    // const index = users.indexOf(user)
    // users.splice(index,1)

    res.status(200).json({
        success:true,  
        data:deleteUser,
        msg:"User Deleted Successfully"
    })
})


/**
 * Route: /user/subsscription-details/:id
 * Method : GET
 * Description: Getting the user's subscription-details by their ID
 *  Access: Public
 * Parameter: id
 */

router.get('/subscription-details/:id',(req,res)=>{

    const {id} = req.params;    

    // Check if user exists
    const user = users.find((each)=>each.id === id)
    if(!user){      
        return res.status(404).json({
            success: false,
            msg : `No User with ID:${id}`
        });
    }
    const getDateinDays = (data = '')=>{
        let date;
        if(data == ''){
            date = new Date(data)
        }
        else{
            date = new Date()
        }
        let days = Math.floor(date.getTime()/(1000*60*60*24))
        return days
    }
    const subscriptionType = (date)=>{
        if(user.subscriptionType === "Basic"){
            date = date + 90
        }
        else if(user.subscriptionType === "Standard"){
            date = date + 180
        }   
        else if(user.subscriptionType === "Premium"){
            date = date + 365
        }
        return date;
    }

    // Subscription expiration Calculation

    let returnDate = getDateinDays(user.returnDate)
    let currentDate = getDateinDays()
    let subscriptionDate = getDateinDays(user.subscriptionDate)
    let subscriptionExpirationDate = subscriptionType(subscriptionDate)

    const data ={
        ...user,
        subscriptionExpirationDate: subscriptionExpirationDate< currentDate,
        subscriptionDateLeft : subscriptionExpirationDate - currentDate,
        daysleftforExpiration : returnDate - currentDate,
        returnDate : returnDate < currentDate ? "Book is overdue":returnDate,
        fine: returnDate < currentDate ? subscriptionExpirationDate <= currentDate ? 100 : 50 : 0
    }
    res.status(200).json({
        success: true,
        data : data
    })
})

module.exports = router;

