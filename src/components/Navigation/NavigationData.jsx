import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

// const iconStyle = { fontSize: "30px" };

const mobileIconStyle = { fontSize: "30px" };
const desktopIconStyle = { fontSize: "27px" };

const isMobileScreen = () => window.innerWidth <= 768;
const iconStyle = isMobileScreen() ? mobileIconStyle : desktopIconStyle;

export const NavigationData = [
    {
        title: "Home",
        path: "/",
        icon: <HomeOutlinedIcon style={iconStyle} />,
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: <NotificationsNoneOutlinedIcon style={iconStyle} />,
    },
    {
        title: "Create Post",
        path: "/",
        icon: <AddOutlinedIcon style={iconStyle} />,
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <PermIdentityOutlinedIcon style={iconStyle} />,
    },
    {
        title: "Sign In",
        path: "/signin",
        icon: <LoginIcon style={iconStyle} />,
    },
    {
        title: "Logout",
        path: "/",
        icon: <LogoutIcon style={iconStyle} />,
    },
];
