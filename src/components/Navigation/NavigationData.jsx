// import HomeIcon from '@mui/icons-material/Home';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const NavigationData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeOutlinedIcon />,
    },
    {
        title: 'Notifications',
        path: '/notifications',
        icon: <NotificationsNoneOutlinedIcon />
    },
    {
        title: 'Create Post',
        path: '/',
        icon: <AddOutlinedIcon />
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <PermIdentityOutlinedIcon />
    },
    {
        title: 'Sign In',
        path: '/signin',
        icon: <LoginIcon />,
    },
    {
        title: 'logout',
        path: '/',
        icon: <LogoutIcon />,
    }
];