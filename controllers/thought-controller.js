const { User, Thought } = require("../models");



const thoughtController = {
  //get all thoughts 
  getAllThoughts(req, res) {
      Thought.find({})
      .populate({
          path: "thoughts",
          select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbthoughtData) => res.json(dbthoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
    
},


  // get one Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  
  
   // add thought 
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.json(err));
  },

    // update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No Thought found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
      },


  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedthought) => {
        if (!deletedthought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;