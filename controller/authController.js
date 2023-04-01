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
 //register
exports.register = async (req, res) => {
  try {
    const hashedPassword = await securePassword(req.body.password);

    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};


//Login

exports.login = async(req,res)=>{

    try {
        
        const user = await userModel.findOne({email:req.body.email})

        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password,user.password);
         
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}

