// const { ObjectId } = require('mongoose').Types;
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
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that id' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create user
    createUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // put route to update user
    updateUser(req, res){
        // User.updateOne(
            // { _id: req.params.userId },
            // { $set: { req.body}})
            // .then()
    },
    // delete a user
    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that id' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted' }))
            .catch((err) => res.status(500).json(err));
    },
    // create a friend
    addFriend(req, res){
        console.log('You are adding a friend');
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            {runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // remove a friend from user's friend list
    removeFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user   
                    ? res.status(404).json({ message: 'No user with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};