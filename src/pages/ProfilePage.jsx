/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header, Navigation, Profile } from "./index"
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scroll(0, 0);
      }, [pathname])
    

    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const { posts, setPosts } = useContext(AuthContext);

    return (
        <div>
            <Header />
            <Navigation />
            {user && <Profile />}
        </div>
    );
}

export default ProfilePage