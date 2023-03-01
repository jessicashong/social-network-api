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
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a thought
    createThought(req, res){
        Thought.create(req.body)
            .then(newthought => {
                return User.findOneAndUpdate(
                    { where: { username: req.body.username } },
                    { $addToSet: { thoughts: newthought._id } },
                    { new: true }
                );
            })
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
            });
    },
    // update a thought by _id
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought    
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },
    // delete a thought by _id
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // add a reaction 
    addReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }, 
    // remove a reaction by _id
    removeReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};