/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NotificationItems from "./NotificationItems";
import Pulse from "../Animations/Pulse"

const Notification = () => {

    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext);

    const getProfile = (id) => {
        navigate(`/profile/${id}`);
    }

    const getAccount = (id) => {
        navigate("/profile");
    }

    return (
        <div className={`w-[95%] max-h-[85vh] overflow-y-auto m-auto mt-4 mb-16 lg:mb-0 space-y-2.5 lg:w-2/5 lg:ml-[32.5%] lg:mt-8`}>

            {user ?
                (user.notifications.map((notification, index) => (
                    <NotificationItems key={index}
                        notification={notification}
                        getProfile={() => getProfile(notification.userId)}
                        getAccount={() => getAccount(notification.friendId)} />
                )))
                :
                <div>
                    <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />

                    <div className="lg:hidden">
                        <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                        <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    </div>
                </div>
            }
        </div>
    )
}

export default Notification;