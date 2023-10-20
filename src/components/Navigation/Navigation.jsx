/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavigationData } from "./NavigationData.jsx";
import "../../main.css";

const Navigation = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext);
    const { userEmail, setUserEmail } = useContext(AuthContext);
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { posts, setPosts } = useContext(AuthContext);
    const { newPostDiv, setNewPostDiv } = useContext(AuthContext);

    const isMobileScreen = () => window.innerWidth <= 768;

    const VITE_URL = import.meta.env.VITE_URL;

    const handleClick = () => {
        if (!loggedIn) {
            alert("Please login first!");
            navigate("/signin");
        } else {
            setNewPostDiv(true);
        }
    };

    const handleLogout = async () => {
        try {
            console.log("clicked");
            document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            await axios.post(
                VITE_URL + "/logout",
                {},
                {
                    withCredentials: true,
                }
            );

            setLoggedIn(false);
            setPosts();
            setUserEmail("");
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const loginAlert = () => {
        alert("Please login first!");
        navigate("/signin");
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        // Temporary Height for tablets would need to remove that before production -> md:h[360px]...
        // <div className="bg-white fixed w-full bottom-0 h-10 md:h-[360px] lg:h-auto lg:w-[15%] lg:bottom-auto lg:mt-[4%] lg:ml-[7.5%] lg:rounded-lg">
        // <div className="bg-white fixed w-full bottom-0 h-10 md:h-[360px] lg:relative lg:h-auto lg:w-[15%]  lg:mt-[5%] lg:ml-[7.5%] lg:rounded-lg">

        <div className="bg-white flex justify-center items-center fixed w-full h-14 px-5 border-t border-secondary-200 bottom-0 z-[9999] 
         lg:h-[260px] lg:w-[15%] lg:p-0 lg:top-40 lg:left-28 lg:rounded-lg lg:border-none lg:z-0"
        >

            {/* <div className="bg-white flex justify-center items-center fixed w-full h-14 px-5 border-t border-secondary-200 bottom-0 md:h-[360px] 
         lg:absolute lg:max-h-64 lg:w-[15%] lg:p-0 lg:top-40 lg:left-28 lg:rounded-lg lg:border-none"
             style={{ zIndex: 9999 }}> */}

            <ul className="w-full flex flex-row justify-between items-center lg:justify-start lg:items-start lg:ml-4 lg:py-2 lg:flex-col">

                {NavigationData.map((item, index) => {
                    if (
                        (loggedIn && item.path === "/signin") ||
                        (!loggedIn && item.title === "Logout")
                    ) {
                        return null;
                    }

                    if (
                        !loggedIn &&
                        (item.path === "/profile" || item.path === "/notifications")
                    ) {
                        return (
                            <li
                                key={index}
                                className="icons lg:px-1.5 lg:py-2.5 lg:rounded-xl lg:hover:bg-secondary-50"
                                onClick={loginAlert}
                            >
                                <Link to="/signin">
                                    <div className="flex flex-col space-y-1 lg:flex-row lg:space-y-0">
                                        <div className="m-auto">{item.icon}</div>
                                        <span className={`${isMobileScreen() && "text-xs"} lg:ml-3`}>{item.title}</span>
                                    </div>
                                </Link>
                            </li>
                        );
                    }

                    if (item.title === "Logout") {
                        return (
                            <li
                                key={index}
                                className="icons lg:px-1.5 lg:py-2.5 lg:rounded-xl lg:hover:bg-secondary-50"
                                onClick={handleLogout}
                            >
                                <Link to={item.path}>
                                    <div className="flex flex-col space-y-1 lg:flex-row lg:space-y-0">
                                        <div className="m-auto">{item.icon}</div>
                                        <span className={`${isMobileScreen() && "text-xs"} lg:ml-3`}>{item.title}</span>
                                    </div>
                                </Link>
                            </li>
                        );
                    }

                    if (item.title === "Create Post") {
                        return (
                            <li
                                key={index}
                                className="icons cursor-pointer lg:px-1.5 lg:py-2.5 lg:rounded-xl lg:hover:bg-secondary-50"
                                onClick={handleClick}
                            >
                                <div className="flex flex-col space-y-1 lg:flex-row lg:space-y-0">
                                    <div className="m-auto">{item.icon}</div>
                                    <span className={`${isMobileScreen() && "text-xs"} lg:ml-3`}>{item.title}</span>
                                </div>
                            </li>
                        );
                    }

                    return (
                        <li
                            key={index}
                            onClick={scrollToTop}
                            className="icons lg:px-1.5 lg:py-2.5 lg:rounded-xl lg:hover:bg-secondary-50"
                        >
                            <Link to={item.path}>
                                <div className="flex flex-col space-y-1 lg:flex-row lg:space-y-0">
                                    <div className="m-auto">{item.icon}</div>
                                    <span className={`${isMobileScreen() && "text-xs"} lg:ml-3`}>{item.title}</span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Navigation;