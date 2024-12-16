import * as React from "react";
import { Divider, useTheme, Button } from "@mui/material";
import { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { MdPermMedia } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";
import { PiArticleNyTimesBold } from "react-icons/pi";
import { MdWork } from "react-icons/md";
import { IoMdFootball } from "react-icons/io";
import { FaHandshakeAngle } from "react-icons/fa6";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index";

const MyPostWidget = ({ picturePath }) => {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openArticle, setOpenArticle] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const handleOpenArticle = () => setOpenArticle(true);
  const handleCloseArticle = () => setOpenArticle(false);
  const handleArticleSubmit = () => {
    handleCloseArticle();
  };

  const handlePostChange = (event) => setPostText(event.target.value);
  const handleCategorySelect = (category) => setSelectedCategory(category);

  const [openMediaDialog, setOpenMediaDialog] = useState(false);
  const handleMediaDialogOpen = () => setOpenMediaDialog(true);
  const handleMediaDialogClose = () => setOpenMediaDialog(false);

  const handleFileDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", postText);
    formData.append("posttype", selectedCategory);
    if (selectedFile) {
      formData.append("picture", selectedFile);
      formData.append("picturePath", selectedFile.name);
    }
    if (articleTitle) {
      formData.append("articleTitle", articleTitle);
    }
    if (articleContent) {
      formData.append("articleContent", articleContent);
    }
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    toast.success("Post Added successfully");
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setSelectedFile(null);
    setPostText("");
    setSelectedCategory("");
    setArticleTitle("");
    setArticleContent("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <Button
          onClick={handleOpen}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            color: palette.primary.natural,
            textAlign: "left",
          }}
        >
          {t("What's on your mind...")}
        </Button>
      </FlexBetween>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <Button
          onClick={handleMediaDialogOpen}
          sx={{
            borderRadius: "0.5rem",
            padding: "1rem 2rem",
            color: palette.primary.natural,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <MdPermMedia
            style={{
              marginRight: "8px",
              marginLeft: "8px",
              color: "#3ABEF9",
              fontSize: "20px",
            }}
          />
          {t("Media")}
        </Button>

        <Button
          sx={{
            borderRadius: "0.5rem",
            padding: "1rem 2rem",
            color: palette.primary.natural,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <RiLiveFill
            style={{
              marginRight: "8px",
              marginLeft: "8px",
              color: "#EF5A6F",
              fontSize: "20px",
            }}
          />
          {t("Live")}
        </Button>

        <Button
          onClick={handleOpenArticle}
          sx={{
            borderRadius: "0.5rem",
            padding: "1rem 2rem",
            color: palette.primary.natural,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <PiArticleNyTimesBold
            style={{
              marginRight: "8px",
              marginLeft: "8px",
              color: "#65B741",
              fontSize: "20px",
            }}
          />
          {t("Article")}
        </Button>
      </FlexBetween>

      {/* Dialog for posting a text */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{t("Create a post")}</DialogTitle>
        <DialogContent>
          {/* Text input for the post */}
          <TextField
            label={t("What's on your mind?")}
            multiline
            rows={4}
            fullWidth
            value={postText}
            onChange={handlePostChange}
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          />

          <p className={`text-md font-semibold mb-2 ${palette.mode === "dark" ? "text-white" : "text-gray-700"}`}>
            Choose a Category:
          </p>
          {/* Category selection buttons */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Professional Category Button */}
            <Button
              onClick={() => handleCategorySelect("💼Professionnel Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "💼Professionnel Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "💼Professionnel Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "💼Professionnel Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "💼Professionnel Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "💼Professionnel Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <MdWork
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "💼Professionnel Post"
                      ? "#fff"
                      : "#3ABEF9",
                  fontSize: "20px",
                }}
              />
              {t("Professional")}
            </Button>

            {/* Sport Category Button */}
            <Button
              onClick={() => handleCategorySelect("⚽Sport Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "⚽Sport Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "⚽Sport Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "⚽Sport Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "⚽Sport Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "⚽Sport Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <IoMdFootball
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "⚽Sport Post" ? "#fff" : "#65B741",
                  fontSize: "20px",
                }}
              />
              {t("Sport")}
            </Button>

            {/* Social Category Button */}
            <Button
              onClick={() => handleCategorySelect("🤝Social Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "🤝Social Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "🤝Social Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "🤝Social Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "🤝Social Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "🤝Social Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <FaHandshakeAngle
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "🤝Social Post" ? "#fff" : "#EF5A6F",
                  fontSize: "20px",
                }}
              />
              {t("Social")}
            </Button>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("Cancel")}
          </Button>
          <Button
            onClick={() => {
              handlePost();
              handleClose();
            }}
            disabled={!selectedCategory || postText.trim() === ""}
            color="primary"
            variant="contained"
          >
            {t("Post")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Media Dialog */}
      <Dialog
        open={openMediaDialog}
        onClose={handleMediaDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{t("Create a media post")}</DialogTitle>
        <DialogContent>
          {/* File Drop Area */}
          <Dropzone onDrop={handleFileDrop} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{
                  border: "2px dashed #cccccc",
                  padding: "20px",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                <input {...getInputProps()} />
                {selectedFile ? (
                  <p>{selectedFile.name}</p>
                ) : (
                  <p>{t("Drag 'n' drop an image, or click to select one")}</p>
                )}
              </div>
            )}
          </Dropzone>

          {/* Post Text Input */}
          <TextField
            label={t("Add a caption...")}
            multiline
            rows={4}
            fullWidth
            value={postText}
            onChange={handlePostChange}
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          />

          <p className={`text-md font-semibold mb-2 ${palette.mode === "dark" ? "text-white" : "text-gray-700"}`}>
            Choose a Category:
          </p>

          {/* Category selection buttons */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Professional Category Button */}
            <Button
              onClick={() => handleCategorySelect("💼Professionnel Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "💼Professionnel Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "💼Professionnel Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "💼Professionnel Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "💼Professionnel Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "💼Professionnel Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <MdWork
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "💼Professionnel Post"
                      ? "#fff"
                      : "#3ABEF9",
                  fontSize: "20px",
                }}
              />
              {t("Professional")}
            </Button>

            {/* Sport Category Button */}
            <Button
              onClick={() => handleCategorySelect("⚽Sport Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "⚽Sport Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "⚽Sport Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "⚽Sport Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "⚽Sport Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "⚽Sport Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <IoMdFootball
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "⚽Sport Post" ? "#fff" : "#65B741",
                  fontSize: "20px",
                }}
              />
              {t("Sport")}
            </Button>

            {/* Social Category Button */}
            <Button
              onClick={() => handleCategorySelect("🤝Social Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "🤝Social Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "🤝Social Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "🤝Social Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "🤝Social Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "🤝Social Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <FaHandshakeAngle
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "🤝Social Post" ? "#fff" : "#EF5A6F",
                  fontSize: "20px",
                }}
              />
              {t("Social")}
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMediaDialogClose} color="primary">
            {t("Cancel")}
          </Button>
          <Button
            onClick={() => {
              handlePost();
              handleMediaDialogClose();
            }}
            disabled={!selectedCategory || postText.trim() === "" || !selectedFile}
            color="primary"
            variant="contained"
          >
            {t("Post")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Article posting */}
      <Dialog
        open={openArticle}
        onClose={handleCloseArticle}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{t("Create an Article")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("Article Title")}
            fullWidth
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          />
          <ReactQuill
            value={articleContent}
            onChange={setArticleContent}
            placeholder={t("Write your article content here...")}
            style={{ height: "300px", marginBottom: "4rem" }}
          />

          <p className={`text-md font-semibold mb-2 ${palette.mode === "dark" ? "text-white" : "text-gray-700"}`}>
            Choose a Category:
          </p>

          {/* Category selection buttons */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Professional Category Button */}
            <Button
              onClick={() => handleCategorySelect("💼Professionnel Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "💼Professionnel Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "💼Professionnel Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "💼Professionnel Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "💼Professionnel Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "💼Professionnel Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <MdWork
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "💼Professionnel Post"
                      ? "#fff"
                      : "#3ABEF9",
                  fontSize: "20px",
                }}
              />
              {t("Professional")}
            </Button>

            {/* Sport Category Button */}
            <Button
              onClick={() => handleCategorySelect("⚽Sport Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "⚽Sport Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "⚽Sport Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "⚽Sport Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "⚽Sport Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "⚽Sport Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <IoMdFootball
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "⚽Sport Post" ? "#fff" : "#65B741",
                  fontSize: "20px",
                }}
              />
              {t("Sport")}
            </Button>

            {/* Social Category Button */}
            <Button
              onClick={() => handleCategorySelect("🤝Social Post")}
              sx={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                color:
                  selectedCategory === "🤝Social Post"
                    ? "#fff"
                    : palette.primary.natural,
                backgroundColor:
                  selectedCategory === "🤝Social Post"
                    ? "#3ABEF9"
                    : "transparent",
                boxShadow:
                  selectedCategory === "🤝Social Post"
                    ? "0px 6px 12px rgba(58, 190, 249, 0.4)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "🤝Social Post"
                      ? "#3ABEF9"
                      : "transparent",
                  color:
                    selectedCategory === "🤝Social Post"
                      ? "#fff"
                      : palette.primary.natural,
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <FaHandshakeAngle
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                  color:
                    selectedCategory === "🤝Social Post" ? "#fff" : "#EF5A6F",
                  fontSize: "20px",
                }}
              />
              {t("Social")}
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseArticle} color="primary">
            {t("Cancel")}
          </Button>
          <Button
            onClick={() => {
              handlePost();
              handleCloseArticle();
            }}
            disabled={articleTitle.trim() === "" || articleContent.trim() === "" || !selectedCategory}
            color="primary"
            variant="contained"
          >
            {t("Post")}
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
