const { User, Thought } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'user',
      select: 'username'
    })
    .populate({
      path: 'reactions',
      populate: {
        path: 'userId',
        select: 'username'
      }
    })
    .select('-__v')
    .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  // create a thought
  createThought({ body }, res ) {
    Thought.create(body)
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'Error when posting thought!' });
          return;
        }
      console.log(dbThoughtData);
      User.findOneAndUpdate(
        { _id: dbThoughtData.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      )
      .then(dbUserData => {
        res.json(dbUserData)
      })
    //   res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  // get thought by id
  getThoughtById({ params }, res ) {
    Thought.findOne({ _id: params.id })
    .populate({
      path: 'user',
      select: 'username'
    })
    .populate({
        path: 'reactions',
        populate: {
          path: 'userId',
          select: 'username'
        }
      })
      .select('-__v')
    .then(dbThoughtData => {
      // If no thought is found, send 404
      if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  // update thought (but you can't edit tweets)
  updateThought({ params, body }, res ) {
    Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true })
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  // delete thought
  deleteThought({ params }, res ) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true  }
    )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  // remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: {reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
    }
};

module.exports = thoughtController;