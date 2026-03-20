const express = require('express');
const  { users } = require('../data/user.json');
const { getAllUsers, getSingleUserById, addNewUser, getSubscriptionDetailsById, updateUserById, deleteUserById } = require('../controller/user-controller');
const router= express.Router()

/**
 * Route: /user
 * Method :GET
 * Description: Get all the Users
 * Access:Public
 * Parameter: None
 */
router.get('/',getAllUsers)

/**
 * Route: /user/:id
 * Method :GET
 * Description: Get a users by their ID
 * Access:Public
 * Parameter: id
 */
router.get('/:id',getSingleUserById)

/**
 * Route: /user
 * Method :POST
 * Description: Create/register a new user
 * Access:Public
 * Parameter: None
 */
router.post('/',addNewUser)

/**
 * Route: /user/:id
 * Method :PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameter: id
 */
router.put('/:id',updateUserById)

/**
 * Route: /user/:id
 * Method : DELETE
 * Description: Deleting a user by their ID
 *  Access: Public
 * Parameter: id
 */
router.delete('/:id',deleteUserById)

/**
 * Route: /user/subsscription-details/:id
 * Method : GET
 * Description: Getting the user's subscription-details by their ID
 *  Access: Public
 * Parameter: id
 */
router.get('/subscription-details',getSubscriptionDetailsById)


module.exports = router;