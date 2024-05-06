import User from "../models/user.js";
import Post from '../models/post.js';

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find({});
    // Map over the users array to extract required information
    const mappedUsers = users.map((user) => ({
      _id: user._id, // MongoDB document ID
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picturePath: user.picturePath,
    }));
    return mappedUsers;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath }) => {
        return { _id, firstName, lastName, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath }) => {
        return { _id, firstName, lastName, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateImpressions = async (req, res) => {
  try {
    const { postUserId } = req.params;
    const user = await User.findById(postUserId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Increment impressions count by 1
    user.impressions += 1;
    await user.save();

    const updatedUser = await User.findById(postUserId);

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateProfileViews = async (req, res) => {
  try {
    const { friendId } = req.params;
    const user = await User.findById(friendId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Increment profile views count by 1
    user.viewedProfile += 1;
    await user.save();

    const updatedUser = await User.findById(friendId);

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
