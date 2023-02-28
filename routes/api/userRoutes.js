const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    getFriends,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// get all users and create user
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// get single user by _id, delete single user by id
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// view user's list of friends, create friend
router
    .route('/:userId/friends')
    .get(getFriends)
    .post(addFriend);

// remove friend from user's friend list
router
    .route('/:userId/friends/:friendId')
    .delete(removeFriend);

module.exports = router;