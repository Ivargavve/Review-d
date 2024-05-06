import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./postWidget";

const PostsWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const searchInput = useSelector((state) => state.searchInput);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    } // eslint-disable-next-line
  },  [isProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchInput.trim() === "") {
      // If searchInput is empty, fetch all posts
      if (isProfile) {
        getUserPosts();
      } else {
        getPosts();
      }
    } else {
      // Filter posts based on searchInput
      // Assuming you have a property in each post called 'description' to search from
      const filteredPosts = posts.filter(post =>
        post.description.toLowerCase().includes(searchInput.toLowerCase())
      );
      // Compare filteredPosts with current posts to avoid unnecessary dispatch
      if (JSON.stringify(filteredPosts) !== JSON.stringify(posts)) {
        // Dispatch action to update posts with filteredPosts
        dispatch(setPosts({ posts: filteredPosts }));
      }
    }
  }, [searchInput, posts, dispatch, isProfile]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      {posts.slice().reverse().map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          course,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
          timestamp,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            course={course}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            timestamp={timestamp}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;