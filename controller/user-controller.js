const { UserModel } = require('../models/index')

exports.getAllUsers = async (req,res) => {
    // router.get('/',(req,res)=>{
//     res.status(200).json({
//         success : true,
//         data : users
//     })
// })
    
    const users = await UserModel.find()
    
    if(!users || users.length === 0){
        return res.status(404).json({
            success: false,
            msg : `No Users Found`
        })
    }
    res.status(200).json({
        success : true, 
        data :  users
    })
};

exports.getSingleUserById = async (req,res) => {

    // router.get('/:id',(req,res)=>{

//     const {id} = req.params
//     const user = users.find((each)=>each.id === id)
    
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             msg : `No User with ID:${id}`
//         })
//     }
    
//     res.status(200).json({
//         success: true,
//         data : user
//     })
// })
    const {id} = req.params

    const user = await UserModel.findById(id)

    if(!user){
        res.status(404).json({
            success : false, 
            msg : `User with ID : ${id} not found`
        })
    }
    res.status(200).json({
        success : true,
        data : user
    })
};

exports.addNewUser = async (req,res) => {
    
    // router.post('/',(req,res)=>{
    //     // req.body should have id ,name, surname , email ,subscriptionType ,subscriptionDate
    //     const {id ,name, surname , email ,subscriptionType ,subscriptionDate} = req.body;
        
    //     // Validation
    //     if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
    //         return res.status(400).json({
    //             success: false,
    //             msg : "Please provide all the required fields"
    //         })
    //     }
        
    //     // Check if user already exists
    //     const user = users.find((each)=>each.id === id)
        
    //     if(user){
    //         return res.status(409).json({
    //             success: false,
    //             msg : `User Already Exists with ID:${id}`
    //         })
    //     }
    
    //     // Create new user
    //     users.push({id ,name, surname , email ,subscriptionType ,subscriptionDate})
    //     res.status(200).json({
    //         success: true,
    //         msg:`User Created Successfully`
    //     })
    
    // })

    const  {data}  = req.body
    if(!data || Object.keys(data).length === 0){
        return res.status(404).json({
            success : false,
            msg : `Please provide all the required fields`
        })
    }

    await UserModel.create(data)    
    res.status(200).json({
        success : true,
        data : data
    })
};

exports.updateUserById = async (req,res) => {
    
    // router.put('/:id',(req,res)=>{
    
    //     const {id} = req.params;
    //     const {data} = req.body;
    
    //     const user = users.find((each)=>each.id === id)
    //     if(!user){
    //         return res.status(404).json({
    //             success: false,
    //             msg : `No User with ID:${id}`
    //         })
    //     }
    //     // object.assign(each, data)
    //     const updateUser = users.map((each)=>{
    //         if(each.id === id){
                
    //             return {
    //                 ...each,
    //                 ...data,
    //             }
    //         }
    //         return each
    //     })
    //     res.status(200).json({
    //         success:true,
    //         data:updateUser,
    //         msg:"User Updated Successfully"
    //     })
    // })
    
    const { id } = req.params
    const { data } = req.body

    if(!data || Object.keys(data).length === 0){
        return res.status(404).json({
            success : false,
            msg : 'Please provide all the fields'
        })
    }
    const updateUser = await UserModel.findByIdAndUpdate(
        id,
        data,
        {new : true}
    )
    if(!updateUser){
        return res.status(404).json({
            success : false, 
            msg : `No User with ID : ${id}`
        })
    }
    res.status(200).json({
        success : true, 
        msg : 'User updated Suceessfully',
        data : updateUser
    })
};

exports.deleteUserById = async (req,res) => {
    
    // router.delete('/:id',(req,res)=>{
    
    //     const {id} = req.params;        
        
    //     // Check if user exists
    //     const user = users.find((each)=>each.id === id)
    //     if(!user){
    //         return res.status(404).json({   
    //             success: false, 
    //             msg : `No User with ID:${id}`   
    //         })
    //     }
    
    //     // if  user exists, filter out the user from the users array 
        
    //     const deleteUser = users.filter((each)=>each.id !== id)
        
    //     // Method - 2
    
    //     // const index = users.indexOf(user)
    //     // users.splice(index,1)
    
    //     res.status(200).json({
    //         success:true,  
    //         data:deleteUser,
    //         msg:"User Deleted Successfully"
    //     })
    // })
    const { id } = req.params

    const user = await UserModel.findById(id)
    if(!user){
        return res.status(404).json({
            success : false, 
            msg : `No User with ID : ${id}`
        })
    }
    await UserModel.findByIdAndDelete(id)
    res.status(200).json({
        success : true,
        msg : 'User deleted suceesfully'
    })
};

exports.getSubscriptionDetailsById = async (req,res) => {

    // router.get('/subscription-details/:id',(req,res)=>{

//     const {id} = req.params;    

//     // Check if user exists
//     const user = users.find((each)=>each.id === id)
//     if(!user){      
//         return res.status(404).json({
//             success: false,
//             msg : `No User with ID:${id}`
//         });
//     }
//     const getDateinDays = (data = '')=>{
//         let date;
//         if(data == ''){
//             date = new Date(data)
//         }
//         else{
//             date = new Date()
//         }
//         let days = Math.floor(date.getTime()/(1000*60*60*24))
//         return days
//     }
//     const subscriptionType = (date)=>{
//         if(user.subscriptionType === "Basic"){
//             date = date + 90
//         }
//         else if(user.subscriptionType === "Standard"){
//             date = date + 180
//         }   
//         else if(user.subscriptionType === "Premium"){
//             date = date + 365
//         }
//         return date;
//     }

//     // Subscription expiration Calculation

//     let returnDate = getDateinDays(user.returnDate)
//     let currentDate = getDateinDays()
//     let subscriptionDate = getDateinDays(user.subscriptionDate)
//     let subscriptionExpirationDate = subscriptionType(subscriptionDate)

//     const data ={
//         ...user,
//         subscriptionExpirationDate: subscriptionExpirationDate< currentDate,
//         subscriptionDateLeft : subscriptionExpirationDate - currentDate,
//         daysleftforExpiration : returnDate - currentDate,
//         returnDate : returnDate < currentDate ? "Book is overdue":returnDate,
//         fine: returnDate < currentDate ? subscriptionExpirationDate <= currentDate ? 100 : 50 : 0
//     }
//     res.status(200).json({
//         success: true,
//         data : data
//     })
// })

    const {id} =req.params
    const user = await UserModel.findById(id)
    if(!user){
        return res.status(404).json({
            success : false,
            msg : `User not found for id : ${id}`
        })
    }
    const getDateinDays = (date = '') =>{
        let data
        if(data){
            date = new Date(data)
        } else {
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
}