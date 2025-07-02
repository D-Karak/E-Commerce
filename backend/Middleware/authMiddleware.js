// Middleware to authenticate and authorize users based on JWT tokens
// and user roles
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded; // Attach the decoded user to the request object
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) { // Check if user role is in allowed roles
        return res.status(403).json({ message: "You are not autherize to access the data!!" });
      }
      next();
    } catch (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};

const isUserExist= async(req,res)=>{

  const {email}=req.body;
  try{
   const user = await UserModel.findOne({email});
   if(user){res.status(200).json({message:'User with this email already exist'});
    return;
  }
  next();
 }catch (error) {
   res.status(500).json({ message: "Error logging in user", error });
 }
 }

module.exports = { authenticateUser, authorizeRoles,isUserExist };
