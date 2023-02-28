const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// aggregate needed? idts.

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
        .then(async(users) => {
            const userObj = {
                users,
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
    },
    // get single user
    getSingleUser(req, res) {},
    // create user
    createUser(req, res){},
    // put route to update user
    updateUser(req, res){},
    // delete a user
    deleteUser(req, res){},
    // get list of user's friends
    getFriends(req, res){},
    // create a friend
    addFriend(req, res){},
    // remove a friend from user's friend list
    removeFriend(req, res){}
}