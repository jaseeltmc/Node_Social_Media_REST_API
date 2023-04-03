const express = require("express");
const posts_route = express();
const postsController = require('../controller/postsController');


// create a post
posts_route.post('/',postsController.createPosts)

//update a post
posts_route.put('/:id',postsController.updatePosts)

//delete a post
posts_route.delete('/:id',postsController.deletePosts)

//like/dislike a post
posts_route.put('/:id/like',postsController.likeOrDislikePosts)

//get a post
posts_route.get("/:id",postsController.getPost);

//get timeline
posts_route.get("/timeline/all",postsController.getTimeline)










module.exports = posts_route;