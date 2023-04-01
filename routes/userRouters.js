const express = require("express");
const user_route = express();

const userController = require("../controller/userController");

//updateUser
user_route.put("/:id", userController.updateUser);

//deleteUser
user_route.delete("/:id",userController.deleteUser)

//get a user
user_route.get("/:id",userController.getUser)

//follow a user
user_route.put("/:id/follow",userController.followUser)

//unfollow a user
user_route.put("/:id/unfollow",userController.unfollowUser)

//Login
// user_route.post("/login",userController.login)
module.exports = user_route;
