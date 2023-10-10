/* eslint-disable no-unused-vars */
import { useContext } from "react";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Profile from "../components/Profile/Profile";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {

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