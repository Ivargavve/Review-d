import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  posts: [],
  searchInput: "",
  friendId: null,
  friendImages: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer functions to update state based on dispatched actions
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setImpressions: (state, action) => {
      if (state.user) {
        state.user.impressions = action.payload.impressions;
      } else {
        console.error("user impressions non-existent :(");
      }
    },
    setViews: (state, action) => {
      state.user.viewedProfile = action.payload.viewedProfile;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload.searchInput;
    },
    setFriendId: (state, action) => {
      state.friendId = action.payload;
    },
    setFriendImage: (state, action) => {
      const { friendId, imagePath } = action.payload;
      state.friendImages[friendId] = imagePath;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setImpressions, setViews, setSearchInput, setFriendId, setFriendImage } =
  authSlice.actions;
export default authSlice.reducer;