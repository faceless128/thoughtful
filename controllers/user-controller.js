const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
    .populate(
      {
      path: 'thoughts',
      select: '-__v'
    })
    .populate(
      {
      path: 'friends',
      select: 'username'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },
  // get user by id
  getUserById({ params }, res ) {
    User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate(
    {
      path: 'friends',
      select: '-__v'
    })
  .select('-__v')
  .then(dbUserData => {
      // If no user is found, send 404
      if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
},
  // create user
  createUser({ body }, res ) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  // update user
  updateUser({ params, body }, res ) {
    User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true })
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  // delete user
  deleteUser({ params }, res ) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      console.log(dbUserData.thoughts);
      Thought.remove({ _id: dbUserData.thoughts })
      .then(dbThoughtData => {
        if (dbThoughtData) {
          console.log(dbThoughtData);
        }
      })
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  // add friend
  addFriend({ params }, res ) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No friend found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  // delete friend
  deleteFriend({ params }, res ) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  }
};

module.exports = userController;