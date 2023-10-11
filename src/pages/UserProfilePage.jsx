import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; 
import {Header, Navigation, UserProfile } from "./index"
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