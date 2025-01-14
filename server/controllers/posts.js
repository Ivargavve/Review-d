import Post from "../models/post.js";
import User from "../models/user.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, course, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const timestamp = new Date();
    const formattedDate = timestamp.toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'medium', 
      timeZone: 'UTC' 
    });
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      course,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      timestamp: formattedDate,
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    // Find the user who owns the post
    const postOwner = await User.findById(post.userId);

    if (isLiked) {
      post.likes.delete(userId);
      postOwner.impressions--;
    } else {
      postOwner.impressions++;
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    await postOwner.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const addCommentToPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;

    const user = await User.findById(userId);
    const name = `${user.firstName} ${user.lastName}`;
    const post = await Post.findById(id);
    post.comments.push({ name, comment });
    
    // Increment impressions count for the user whose post is commented on
    const postOwner = await User.findById(post.userId);
    postOwner.impressions++;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );

    await postOwner.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
