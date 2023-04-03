const bcrypt = require("bcrypt");
const userModel = require("../model/user");

// password hashing to store in the db
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};
//update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await securePassword(req.body.password);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json("Account has been updated");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await userModel.findOneAndDelete(req.params.id);

      res.status(200).json("Account has been deleted");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(403).json("you can delete only your account!");
  }
};

//get a user
exports.getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    console.log(error);
  }
};

//follow user

exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      const currentUser = await userModel.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

//follow user

exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      const currentUser = await userModel.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you didn't follow this user");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

