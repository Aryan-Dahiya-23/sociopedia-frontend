/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const NotificationItems = (props) => {

    const { notification } = props;

    const VITE_URL = import.meta.env.VITE_URL;

    return (
        <div className="flex flex-row justify-between w-full pt-2 pb-1 space-x-2 border-b border-gray-300">

            <div className="flex flex-row space-x-1">
                <div className="cursor-pointer" onClick={props.getProfile}>
                    <img src={notification.userProfileImageUrl}
                        alt="profile image"
                        className="h-10 w-10 object-cover rounded-full" />
                </div>

                <div className="flex flex-col justify-start lg:flex-row lg:items-center lg:space-x-2.5">
                    <span className="cursor-pointer font-semibold" onClick={props.getProfile}>{notification.userName}</span>
                    <span className="text-secondary-600 ml-1">{notification.message}</span>
                </div>
            </div>

            {notification.postImageUrl &&
                <div className="cursor-pointer" onClick={props.getAccount}>
                    <img src={notification.postImageUrl}
                        alt="post image"
                        className="h-10 w-10 object-cover" />
                </div>
            }

            {notification.friendImageUrl && notification.message === "commented on your post." &&
                <div className="cursor-pointer" onClick={props.getAccount}>
                    <img src={VITE_URL + "/" + notification.friendImageUrl}
                        alt="post image"
                        className="h-10 w-10 object-cover" />
                </div>
            }
        </div>
    );
}

export default NotificationItems;





