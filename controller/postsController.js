const postModel = require("../model/post");
const userModel = require("../model/user");

//create a post

exports.createPosts = async (req, res) => {
  const newPost = new postModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
  }
};

//update posts

exports.updatePosts = async (req, res) => {
  try {
    const post = await postModel.findOne({ userId: req.params.id });

    console.log(post);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (error) {
    console.log(error);
  }
};

//delete a posts

exports.deletePosts = async (req, res) => {
  try {
    const post = await postModel.findOne({ userId: req.params.id });

    console.log(post);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (error) {
    console.log(error);
  }
};

//like/dislike a post

exports.likeOrDislikePosts = async (req, res) => {
  try {
    const post = await postModel.findOne({ userId: req.params.id });
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    console.log(error);
  }
};

//get a post
exports.getPost = async (req, res) => {
  try {
    const post = await postModel.findOne({ userId: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

//get a post
exports.getTimeline = async (req, res) => {
  try {
    const currentUser = await userModel.findOne({_id:req.body.userId});
    const userPosts = await postModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return postModel.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    console.log(error);
  }
};
