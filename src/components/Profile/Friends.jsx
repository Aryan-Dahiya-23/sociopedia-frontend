/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const Friends = () => {

    const navigate = useNavigate();

    const { userId, setUserId } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const { friends, setFriends } = useContext(AuthContext);
    const [userUpdated, setUserUpdated] = useState(false);

    const VITE_URL = import.meta.env.VITE_URL;

    useEffect(() => {

        const updateUser = async (req, res) => {
            if (userUpdated) {
                try {
                    const response = await axios.post(VITE_URL + "/updateuser", {
                        user: user
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        updateUser();
    }, [user]);

    const updateFriend = async (friendId) => {

        try {
            const response = await axios.post(`${VITE_URL}/updatefriend/${friendId}`, { userId });

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addFriend = (friend) => {

        if (user._id !== friend._id) {
            const updatedUserFriends = [...user.friends, friend._id];

            const updatedUser = { ...user, friends: updatedUserFriends };

            setUser(updatedUser);
            setUserUpdated(true);

            updateFriend(friend._id);
        }
    };

    const removeFriend = (friend) => {
        if (user._id !== friend._id) {
            const updatedUserFriends = user.friends.filter((friendId) => friendId !== friend._id);

            const updatedUser = { ...user, friends: updatedUserFriends };

            setUser(updatedUser);
            setUserUpdated(true);

            updateFriend(friend._id);
        }
    }

    const handleUserProfile = (id) => {

        if (userId === id) {
            navigate("/profile");
        } else {
            navigate(`/profile/${id}`);
        }
    }

    return (
        <div className="bg-white w-[95%] m-auto mt-7 mb-40 p-4 space-y-4 rounded-xl lg:w-2/5 lg:ml-[32.5%] lg:mt-16">

            {friends.map((friend) => (
                <div key={friend._id} className="flex flex-row justify-between">

                    <div className="flex flex-row space-x-2.5 hover:cursor-pointer" onClick={() => handleUserProfile(friend._id)}>
                        {<img src={friend.profileImageUrl} className="w-12 h-12 rounded-full object-cover" alt="" />}
                        {<span className="m-auto hover:border-b-2 hover:border-primary-300">{friend.fName + " " + friend.lName}</span>}
                    </div>

                    <div className="bg-primary-100 border rounded-full mt-auto mb-auto p-1 text-primary-500 hover:text-primary-400">
                        {user.friends.includes(friend._id) ? (
                            <PersonRemoveOutlinedIcon className="cursor-pointer" onClick={() => removeFriend(friend)} />

                        ) : (
                            <PersonAddOutlinedIcon className="cursor-pointer" onClick={() => addFriend(friend)} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Friends;

// key={post._id}