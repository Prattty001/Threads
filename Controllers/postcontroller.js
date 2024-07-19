const Post = require("../models/Postmodel");
const User = require("../models/Usermodel");


const createPost = async(req,res)=>{

    try {
        const {postedBy,text,img} = req.body;
        if(!postedBy || !text){
            return res.status(400).json({message:"postedby required"});
        }
        const user = await User.findById(postedBy);
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        //Check its posting himself only!!..
    if(user._id.toString()!==req.user._id.toString()){
        return res.status(400).json({message:"Unauthorised"});
    }

const maxi = 500;
if(text.length>maxi){
    return res.status(400).json({message:`Text must me less than ${maxi} Character`});
}
const newPost = new Post({
    postedBy,
    text,
    img
});
await newPost.save();
    res.status(201).json({message:"Post created Successfully",newPost});

    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}

//To get the posts!..
const getPosts = async(req,res)=>{
 try {
    const post = await Post.findById(req.param.id);
    if(!post){
        return res.status(400).json({message:"Post Not found"});
    }
    res.status(200).json({post});
    
 } catch (error) {
    res.status(500).json({message:error.message});
    
}
}

//Deleting the post!!..
const deletePost = async(req,res)=>{
try {
    const post = await Post.findById(req.param.id);
    if(!post){
        return res.status(400).json({message:"Not found"});
    }
    //Check its deleting his only 
    if(post.postedBy.toString()!== req.user._id.toString()){
        return res.status(400).json({message:"Unauthorised"});
    }
    await Post.findByIdAndDelete(req.param.id);
    res.status(200).json({message:"Post Deleted Successfully"})
    
} catch (error) {
    res.status(500).json({message:error.message});
    
}
}

//like /unlike
const Likeunlike = async(req,res)=>{

    try {
        const {id:posId} = req.params;
        const userId = req.user._id;
        const post = Post.findById(posId);
        if(!post){
            return res.status(400).json({message:"Post not found"});
        }
        const userliked= post.likes.includes(userId);
        if(userliked){
            //Unlike post!..
await Post.updateOne({_id:posId},{$pull:{likes:userId}});
res.status(200).json({message:"UnLike Successfully"});
        }
        else{
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message:"Like Successfully"});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}

//Replying post!..
const replyPost = async(req,res)=>{


    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;
        if(!text){
            return res.status(400).json({message:"Text Filed Required"});
        }
        const post = await  Post.findById(postId);
        if(!post){
            return res.status(400).json({message:"Post not found"});
        }

        const reply = {userId,text,userProfilePic,username};

        post.replies.push(reply);
        await post.save();
        return res.status(400).json({message:"Reply addaed",post});
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}
const getFeedPost = async(req,res)=>{

    try {
        const userId = req.user._id;
        const user = await Post.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const following = user.following;
        const feedPost = await Post.find({postedBy:{$in:following}}).sort({createdAt:-1});
         res.status(400).json({feedPost});
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}

module.exports={
    createPost,
getPosts,
deletePost,
Likeunlike,
replyPost,
getFeedPost
}