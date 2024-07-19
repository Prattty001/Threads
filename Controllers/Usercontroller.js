const User = require("../models/Usermodel");

const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/helpers/genTokensandsetCookie");


//signup User!..
const signupUser = async (req,res)=>{
try {
    const {name,email,username,password} = req.body;
    const user = await  User.findOne({$or:[{name},{email}]});

    if(user){
        return res.status(400).json({error : "User already exist"});
    }
    //Authentication for password is doen here!..
const salt = await bcrypt.genSalt(10);
const hashedpass = await bcrypt.hash(password,salt);
const newuser = new User({
    name,
    email,
    password:hashedpass,
    username
});
await newuser.save();

if(newuser){
    generateTokenAndSetCookie(newuser._id,res);
    res.status(201).json({
        _id : newuser._id,
        name : newuser.name,
        password  : newuser.password,
        username : newuser.username,
        email : newuser.email

    });

}
else{
    res.status(400).json({error:"Invalid username"});
}
    
} catch (error) {
    res.status(500).json({error : "error"});
    console.log("error in signup page",error);  
}
}
//login User
const loginUser=async (req,res)=>{
try {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    const ispasscorrect = await bcrypt.compare(password,user?.password || "");
    if(!user || !ispasscorrect) return res.status(400).json({error:"Invaild Crenditial"});
    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        username:user.username
    })
    
} catch (error) {
    res.status(500).json({error :error.message});
    console.log("error in log in:",error.message);
}
}

const logoutUser = (req,res)=>{
try {
    res.cookie("jwt","",{maxAge:1});
    res.status(200).json({message:"User Logout Successfully"});
    
} catch (error) {
    res.status(500).json({error :error.message});
    console.log("error in log in:",error.message);
}
}
//Follow and unfollow 
const followUnfollowUser = async(req,res)=>{
try {
    const {id} = req.params;    
    const usertomodify = await User.findById(id);
    const curruser = await User.findById(req.user._id);

    if(id==req.user._id.toString()) return res.status(400).json({error:"You cannot follow/unfollow yourself"});
if(!usertomodify || !curruser) return res.status(400).json({error:"User Not found"});
const isFollowing = curruser.following.includes(id);
if(isFollowing){
//unfollow!..we will use pull to remove the following from the 2 accounts!..
await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});
await User.findByIdAndUpdate(id,{ $pull: {following:req.user._id}});
res.status(200).json({error:"User Unfollowed Successfully"});
}
else{
//follow!>.
await User.findByIdAndUpdate(req.user._id,{$push:{following:id}});
await User.findByIdAndUpdate(id,{ $push: {following:req.user._id}});
res.status(200).json({error:"User followed Successfully"});
}

} catch (error) {
    res.status(500).json({error :error.message});
    console.log("error in follw/unfollow in:",error.message);
    
}
}

const updateUser = async(req,res)=>{
    const {name,email,username,password,profilePic,bio} = req.body;
    const userId = req.user._id;
try {
let user = await User.findById(userId);
if(!user ) return res.status(400).json({error:"User not found"});
//They should our profile only!..
if(req.param.id!==userId.toString())
    return res.status(400).json({error:"You cannot update other's Profile"});
if(password){
    const salt = bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password,salt);
    user.password=hashpass;
}
user.name = name || user.name;
user.email = email || user.email;
user.username=username || user.username;
user.profilePic = profilePic || user.profilePic;
user.bio = bio || user.bio;
user = await user.save();
res.status(200).json({error:"updated successfully",user}  )

    
} catch (error) {
    res.status(500).json({error :error.message});
    console.log("error in updatingUser in:",error.message);
    
}
}

//Viewing profiles!..
const getUserProfile = async (req,res)=>{
    const {username} = req.params;
try {
    const user =    await User.findOne({username}).select("-password");
    if(!user) return res.status(400).json({error:"User not found"});

    res.status(400).json(user);
} catch (error) {
    res.status(500).json({error :error.message});
    console.log("error in fetchinguserprofile :",error.message);
    
}
}

module.exports={
    signupUser,
    loginUser,
    logoutUser,
    followUnfollowUser,
    updateUser,
    getUserProfile
}

