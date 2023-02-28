const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res){},
    // get single thought
    getSingleThought(req, res){},
    // create a thought
    createThought(req, res){},
    // update a thought by _id
    updateThought(req, res){},
    // delete a thought by _id
    deleteThought(req, res){},
    // get all reactions
    getReactions(req, res){},
    // add a reaction 
    addReaction(req, res){}, 
    // remove a reaction by _id
    removeReaction(req, res){}
}