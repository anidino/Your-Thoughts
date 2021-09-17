const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
      User.find({})
        .populate({
          path: "thoughts",
          select: "-__v"
        })
        .populate({
            path: "friends",
            select: "-__v"
        })
        
        
        .then((dbuserData) => res.json(dbuserData))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one user by id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({
            path: "friends",
            select: '-__v',
        })
        // .select("-__v")
        .then((dbuserData) => res.json(dbuserData))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createuser
    createUser({ body }, res) {
      User.create(body)
        .then((dbuserData) => res.json(dbuserData))
        .catch((err) => res.json(err));
    },
  
    // update user by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((dbuserData) => {
          if (!dbuserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbuserData);
        })
        .catch((err) => res.json(err));
    },
  
    // delete user
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then((dbuserData) => res.json(dbuserData))
        .catch((err) => res.json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id}, 
            { $push: { friends: params.friendId} },
            { new: true, runValidators: true}
        )
        .then(dbFriendData => {
            if (!dbFriendData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbFriendData);
          })
          .catch(err => res.json(err));
    },

   

    

  };
  

  module.exports = userController; 