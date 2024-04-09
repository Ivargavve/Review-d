import {
    EditOutlined,
    DeleteOutlined,
    ImageOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
  } from "@mui/material";
  import FlexBetween from "components/flexBetween";
  import Dropzone from "react-dropzone";
  import WidgetWrap from "components/widgetWrap";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
  
  const MyPostWidget = () => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [course, setCourse] = useState("");
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("course", course);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setCourse("");
      setPost("");
    };
  
    return (
      <WidgetWrap
        position="sticky"
        top={118}
        zIndex={100}
      >
          <InputBase
            placeholder="TNM..."
            onChange={(e) => setCourse(e.target.value)}
            value={course}
            sx={{
              ml: "1rem",
              width: "30%",
            }}
          />
        <FlexBetween>
          <InputBase
            placeholder="my last course was..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add reaction here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Add Reaction
            </Typography>
          </FlexBetween>
  
          <Button
            disabled={!post || !course}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
            }}
          >
            Publish Review
          </Button>
        </FlexBetween>
      </WidgetWrap>
    );
  };
  
  export default MyPostWidget;