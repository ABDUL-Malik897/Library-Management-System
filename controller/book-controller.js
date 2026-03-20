const { UserModel , BookModel } = require("../models/index");
const IssuedBook = require('../dtos/book-dtos');

// const getAllBooks = () =>{


// }

// const getStringBookByID = () =>{

// }


// module.exports = {
//     getAllBooks,
//     getStringBookByID
// }





exports.getAllBooks = async (req,res) =>{

    // router.get('/',(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })


    const books = await BookModel.find()
    if(books.length === 0){
        return res.status(404).json({
            success : false,
            msg : 'No Books in the System'
        })
    }

    res.status(200).json({
        success : true,
        data : books
    })
};

exports.getSingleBookByID = async(req,res) =>{

// router.get('/:id',(req,res)=>{
//     const {id} = req.params
//     const book = books.find((each)=>each.id === id)
    
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             msg : `No Book with ID:${id}`
//         })
//     }
    
//     res.status(200).json({
//         success: true,
//         data : book
//     })
// })
    

    
    const { id } = req.params;
    const book = await BookModel.findById(id)

    if(!book){
        return res.status(404).json({
            success: false,
            msg : `No Book with ID:${id}`
        })
    }
    
    res.status(200).json({
        success: true,
        data : book
    })
};

exports.getAllIssuedBooks = async (req,res) =>{

    // router.get('/issued/for-users',(req,res)=>{
    
    //     const userWithIssuedBooks = users.filter((each)=>{
    //         if(each.issuedBook){
    //             return each;
    //         }
    //     })
    
    //     const issuedBooks =[]
    //     userWithIssuedBooks.forEach((each) => {
    //         const book = books.find((book)=>book.id === each.issuedBook)
    //         book.issuedBy = each.name   
    //         book.issuedDate = each.issuedDate
    //         book.returnDate = each.returnDate
    
    //         issuedBooks.push(book)
    //     });
    
    //     if(!issuedBooks){
    //         return res.status(404).json({
    //             success: false,
    //             msg : "No Issued Books Found"
    //         })
    //     }
    //     res.status(200).json({
    //         success: true,
    //         data : issuedBooks
    //     })
    // })
    

    const users = await UserModel.find({
        issuedBook : {$exists : true}
    }).populate('issuedBook')

    const issuedBooks = users.maps((each)=>{
        return new IssuedBook(each);
    })

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            msg : "No Issued Books Found"
        })
    }
    res.status(200).json({
        success: true,
        data : issuedBooks
    })
};

exports.addNewBook = async (req,res) =>{
    // router.post('/',(req,res)=>{
    //     // req.body should have id ,name, author , genre ,price ,publisher
    //     const {id ,name, author , genre ,price ,publisher} = req.body;
        
    //     // Validation
    //     if(!id || !name || !author || !genre || !price || !publisher){
    //         return res.status(404).json({
    //             success: false,
    //             msg : "Please provide all the required fields"
    //         })
    //     }
        
    //     // Check if book already exists
    //     const book = books.find((each)=>each.id === id)
        
    //     if(book){
    //         return res.status(404).json({
    //             success: false,
    //             msg : `Book Already Exists with ID:${id}`
    //         })
    //     }
    
    //     // Create new book
    //     books.push({id ,name, author , genre ,price ,publisher})
    //     res.status(200).json({
    //         success: true,
    //         msg:`Book Created Successfully`
    //     })
    
    // })

    const { data } = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            msg : "Please provide all the required fields"
        })
    }
    
    await BookModel.create(data);
    
    const allBooks = await BookModel.find()
    res.status(201).json({
        success : true,
        msg : 'Book added successfully',
        data : allBooks
    })
};

exports.updateBookById = async (req,res) =>{
    
    // router.put('/:id',(req,res)=>{
    //     const {id} = req.params;
    //     const {data} = req.body;        
    //     const book = books.find((each)=>each.id === id)
    //     if(!book){
    //         return res.status(404).json({
    //             success: false,
    //             msg : `No Book with ID:${id}`
    //         })
    //     }
    //     // if(!data || Object.keys(data).length === 0){
    //     //     return res.status(400).json({
    //     //         success: false,
    //     //         msg : "Please provide the data to update"
    //     //     })
    //     // }
    //     const updateBook = books.map((each)=>{
    //         if(each.id === id){
    //             return {...each,...data}
    //         }
    //         return each
    //     })
    //     res.status(200).json({
    //         success:true,
    //         data:updateBook,
    //         msg:"Book Updated Successfully"
    //     })
    // })
    const { id } = req.params
    const { data } = req.body

    if(!data || Object.keys(data).length === 0){
        return res.status(404).json({
            success : false,
            msg : `Please provide the data to update`
        })
    } 
    const updateBook = await BookModel.findOneAndUpdate(
        {_id : id},
        data,
        {new : true}
    )
    if(!updateBook){
        return res.status(404).json({
            success : false,
            msg : `No Book with ID : ${id}`
        })
    }
    res.status(200).json({
            success : true,
            msg : `Book Updated Successfully `,
            data : updateBook
        })

}; 

exports.deleteBookById = async (req ,res)=>{

// router.delete('/:id',(req,res)=>{
//     const {id} = req.params;        

//     // Check if book exists
//     const book = books.find((each)=>each.id === id)
//     if(!book){
//         return res.status(404).json({   
//             success: false, 
//             msg : `No Book with ID:${id}`   
//         })
//     }

//     // if  book exists, filter out the book from the books array 
//     const deleteBook = books.filter((each)=>each.id !== id)
    
//     // Method - 2
//     // const index = books.indexOf(book)
//     // books.splice(index,1)

//     res.status(200).json({
//         success:true,  
//         data:deleteBook,
//         msg:"Book Deleted Successfully"
//     })
// })

    const { id } = req.params
    
    const book = await BookModel.findById(id)

    if(!book){
        return res.status(404).json({
            success : false,
            msg : `No Book with ID : ${id}`
        })
    }

    await BookModel.findByIdAndDelete(id)
    res.status(200).json({
        success : true,
        msg : 'Book Deleted Successfully'
    })
};