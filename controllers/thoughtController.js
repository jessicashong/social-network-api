const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res){
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get single thought
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => 
                !thought    
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a thought
    createThought(req, res){
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
            });
    },
    // update a thought by _id
    updateThought(req, res){},
    // delete a thought by _id
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : User.deleteMany({ _id: { $in: thought.users } })
            )
            .catch((err) => res.status)
    },
    // get all reactions
    getReactions(req, res){},
    // add a reaction 
    addReaction(req, res){}, 
    // remove a reaction by _id
    removeReaction(req, res){}
}