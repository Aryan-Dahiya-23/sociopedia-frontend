import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; 
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import UserProfile from "../components/UserProfile/UserProfile";
import { AuthContext } from "../contexts/AuthContext";

const UserProfilePage = () => {

    const { user } = useContext(AuthContext);
    const { userProfileId, setUserProfileId } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        setUserProfileId(id);
    }, [id, setUserProfileId]);

    return (
        <div>
            <Header />
            <Navigation />
            {user && userProfileId && <UserProfile />}
        </div>
    );
}

export default UserProfilePage;