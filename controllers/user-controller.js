const { User, Thought } = require('../models');

const userController = {
    // get all users complete :)
    getAllUsers(req, res) {
      User.find({})
        // .populate({
        //   path: "thoughts",
        //   select: "-__v"
        // })
        // .populate({
        //     path: "friends",
        //     select: "-__v"
        // })
        // .select('-__v')
        // .sort({ _id: -1 })

        .then((dbuserData) => res.json(dbuserData))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one user by id complete :)
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
      .populate("thoughts")
      .populate("friends")
      .select('-__v')
     
        .then((dbuserData) => {
            if(!dbuserData) {
                res.status(404).json({ message: "No user with this id 🤔"})
                return;
            }
            res.json(dbuserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
  
    // createuser complete :)
    createUser({ body }, res) {
        // console.log(body);
      User.create(body)
        .then((dbuserData) => res.json(dbuserData))
        .catch((err) => res.status(400).json(err));
    },
  
    // update user by id complete :) 
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
  
    // delete user complete :) 
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
      .then((dbuserData) => {
        if (!dbuserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbuserData);
      })
        .catch((err) => res.status(400).json(err));
    },

    addFriend({ params }, res) {
   
        User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, {new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

   deleteFriend({ params }, res) {
       User.findOneAndUpdate({ _id: params.userId}, {$pull: { friends: params.friendId}}, {new: true,  runValidators: true})
  
       .then(dbFriendData => {
           if(!dbFriendData) {
               res.status(404).json({ message: "No User with this id!"});
               return;
           }
            res.json(dbFriendData);
           })  
           .catch(err => res.json(err));
       }
      
       
   };

    

  
module.exports = userController; 