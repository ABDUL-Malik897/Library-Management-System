const express = require('express');

const { books } = require('../data/books.json')

const { users } = require('../data/user.json')

const  router = express.Router()

const { UserModel , BookModel } = require('../models/index'); 
const { getAllBooks , getSingleBookByID, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById } = require('../controller/book-controller');

/**
 * Route: /books
 * Method : GET
 * Description: Get all the books in the system 
 *  Access: Public
 * Parameter: None
 */
router.get('/',getAllBooks)

/**
 * Route: /books/:id
 * Method : GET
 * Description: Get the books by their ID
 *  Access: Public
 * Parameter: id
 */
router.get('/:id',getSingleBookByID)

/**
 * Route :/books
 * Method :POST
 * Description: Create/register a new books
 * Access:Public
 * Parameter: None
 */
router.post('/', addNewBook)

/**
 * Route: /books/:id
 * Method :  PUT
 * Description: Updating a book by their ID
 * Access: Public
 * Parameter: id
 */
router.put('/:id',updateBookById)

/**
 * Route: /book/:id
 * Method : DELETE
 * Description: Deleting a book by their ID
 *  Access: Public
 * Parameter: id
 */
router.delete('/:id',deleteBookById)

/**
 * Route: /book/issued/for-users
 * Method : GET
 * Description: Get all issued books
 * Access: Public
 * Parameter: None
 */
router.get('/issued/for-users',getAllIssuedBooks)


module.exports = router;