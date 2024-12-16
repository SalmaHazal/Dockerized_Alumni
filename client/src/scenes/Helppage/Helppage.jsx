import { Box, Typography, useMediaQuery, Button } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/material";
import React from "react";
import Settings from "../../scenes/settings/Settings";
import Languageselector from "../../components/language-selector";
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux"; 
import { setLogout, setMode } from "../../state/index"; 
import { FcPrivacy } from "react-icons/fc";
import { MdArrowForward } from "react-icons/md"; // Icon for the arrow on the right
import { TfiHelpAlt } from "react-icons/tfi";
import { BiError } from "react-icons/bi";
import { TbHistoryToggle } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineContactPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Helppage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = i18n.language;  // Get the current language

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "Right",
          marginTop: "50px", // Contrôle de l'espace en haut
        }}
      >
       <Settings />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginTop: "-600px",
          marginRight: "600px", // Contrôle de l'espace en haut
        }}
      >
       
        <WidgetWrapper
          width="800px"
          sx={{
            marginTop: "20px", // Contrôle de l'espace entre le texte et le widget
            marginLeft: language === "ar" ? "-10%" : "60%", // Adjust positioning based on language
          }}
        >
          <Typography color="#37B7C3" variant="h4" sx={{ marginLeft: language === "ar" ? "20%" : "39%" }}>
            {t("Help Center")}
          </Typography>

          <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "Right",
          marginTop: "30px", // Contrôle de l'espace en haut
        }}
      >
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "Right",
          marginTop: "40px", // Contrôle de l'espace en haut
        }}
      >
           <Button
          onClick={() => {
          navigate('/ContactUs');
        }}
      sx={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "70%",
        maxWidth: "97%", 
        backgroundColor: palette.background.alt,
        color: palette.text.primary,
        display: "flex",
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
        textTransform: "none",
        padding: "1rem 2rem", 
        borderRadius: "8px",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: palette.primary.light,
        },
      }}
    >
     <FaPhone  style={{ width: "40px", height: "40px", marginRight: "1rem", color:"#F95454" }}/> 
     
      <Box sx={{ flexGrow: 1 }}>
      
        <Typography
          variant="h6" // Adjust font size and weight
          color={palette.text.secondary}
          sx={{ textAlign: "left", marginBottom: "0.25rem" }} // Align text to the left
        >
          { t ("Contact Us")}
        </Typography>
        <Typography
          variant="body2"
          color="#37B7C3"  // Subdued color for the secondary text
          sx={{ textAlign: "left" }}
        >
          { t ("Give feedback about your Alumni experience")}
        </Typography>
      </Box>


      <MdArrowForward style={{ width: "24px", height: "24px", color: palette.text.secondary }} />
    </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "Right",
          marginTop: "40px", // Contrôle de l'espace en haut
        }}
      >
           <Button
          onClick={() => {
          navigate('/Planingcallpage');
        }}
      sx={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "70%",
        maxWidth: "97%", 
        backgroundColor: palette.background.alt,
        color: palette.text.primary,
        display: "flex",
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
        textTransform: "none",
        padding: "1rem 2rem", 
        borderRadius: "8px",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: palette.primary.light,
        },
      }}
    >
    
      <MdOutlineContactPhone  style={{ width: "40px", height: "40px", marginRight: "1rem" , color:"#08C2FF"}} />


      <Box sx={{ flexGrow: 1 }}>
      
        <Typography
          variant="h6" // Adjust font size and weight
          color={palette.text.secondary}
          sx={{ textAlign: "left", marginBottom: "0.25rem" }} // Align text to the left
        >
          { t ("Planning a Call with Support")}
        </Typography>
        <Typography
          variant="body2"
          color="#37B7C3"  // Subdued color for the secondary text
          sx={{ textAlign: "left" }}
        >
          { t ("Les's us know about a broken feature")}
        </Typography>
      </Box>


      <MdArrowForward style={{ width: "24px", height: "24px", color: palette.text.secondary }} />
    </Button>
      </Box>

        </WidgetWrapper>
      </Box>
    </>
  );
};

export default Helppage ;
