const express = require('express');

const { books } = require('../data/books.json')

const { users } = require('../data/user.json')

const  router = express.Router()

/**
 * Route: /books
 * Method : GET
 * Description: Get all the books in the system 
 *  Access: Public
 * Parameter: None
 */

router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: books
    })
})

/**
 * Route: /books/:id
 * Method : GET
 * Description: Get the books by their ID
 *  Access: Public
 * Parameter: id
 */

router.get('/:id',(req,res)=>{
    const {id} = req.params
    const book = books.find((each)=>each.id === id)
    
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
})


/**
 * Route :/books
 * Method :POST
 * Description: Create/register a new books
 * Access:Public
 * Parameter: None
 */


router.post('/',(req,res)=>{
    // req.body should have id ,name, author , genre ,price ,publisher
    const {id ,name, author , genre ,price ,publisher} = req.body;
    
    // Validation
    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(404).json({
            success: false,
            msg : "Please provide all the required fields"
        })
    }
    
    // Check if book already exists
    const book = books.find((each)=>each.id === id)
    
    if(book){
        return res.status(404).json({
            success: false,
            msg : `Book Already Exists with ID:${id}`
        })
    }

    // Create new book
    books.push({id ,name, author , genre ,price ,publisher})
    res.status(200).json({
        success: true,
        msg:`Book Created Successfully`
    })

})



/**
 * Route: /books/:id
 * Method :  PUT
 * Description: Updating a book by their ID
 * Access: Public
 * Parameter: id
 */

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;        
    const book = books.find((each)=>each.id === id)
    if(!book){
        return res.status(404).json({
            success: false,
            msg : `No Book with ID:${id}`
        })
    }
    // if(!data || Object.keys(data).length === 0){
    //     return res.status(400).json({
    //         success: false,
    //         msg : "Please provide the data to update"
    //     })
    // }
    const updateBook = books.map((each)=>{
        if(each.id === id){
            return {...each,...data}
        }
        return each
    })
    res.status(200).json({
        success:true,
        data:updateBook,
        msg:"Book Updated Successfully"
    })
})

/**
 * Route: /book/:id
 * Method : DELETE
 * Description: Deleting a book by their ID
 *  Access: Public
 * Parameter: id
 */

router.delete('/:id',(req,res)=>{
    const {id} = req.params;        

    // Check if book exists
    const book = books.find((each)=>each.id === id)
    if(!book){
        return res.status(404).json({   
            success: false, 
            msg : `No Book with ID:${id}`   
        })
    }

    // if  book exists, filter out the book from the books array 
    const deleteBook = books.filter((each)=>each.id !== id)
    
    // Method - 2
    // const index = books.indexOf(book)
    // books.splice(index,1)

    res.status(200).json({
        success:true,  
        data:deleteBook,
        msg:"Book Deleted Successfully"
    })
})



/**
 * Route: /book/issued/for-users
 * Method : GET
 * Description: Get all issued books
 * Access: Public
 * Parameter: None
 */

router.get('/issued/for-users',(req,res)=>{

    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })

    const issuedBooks =[]
    
    userWithIssuedBooks.forEach((each) => {
        const book = books.find((book)=>book.id === each.issuedBook)
        
        book.issuedBy = each.name   
        book.issuedDate = each.issuedDate
        book.returnDate = each.returnDate

        issuedBooks.push(book)
    });

    if(!issuedBooks){
        return res.status(404).json({
            success: false,
            msg : "No Issued Books Found"
        })
    }
    res.status(200).json({
        success: true,
        data : issuedBooks
    })
})


module.exports = router;