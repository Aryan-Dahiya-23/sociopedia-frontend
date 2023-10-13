/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../contexts/AuthContext';
import SearchItem from './SearchItem.jsx';
import Pulse from '../Animations/Pulse';
import "../Search/search.css";

const Search = () => {

    const navigate = useNavigate();

    const { search, setSearch } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const { userId, setUserId } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [showAnimation, setShowAnimation] = useState(false);
    const [userUpdated, setUserUpdated] = useState(false);
    const [accounts, setAccounts] = useState();

    const VITE_URL = import.meta.env.VITE_URL;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    useEffect(() => {

        const fetchAccounts = async () => {
            try {
                const response = await axios.get(`${VITE_URL}/accounts?searchQuery=${debouncedSearchQuery}&userId=${userId}`);

                if (response.data) {
                    setShowAnimation(false);
                    setAccounts(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (debouncedSearchQuery) fetchAccounts();

    }, [debouncedSearchQuery]); 

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

    const handleSearch = (e) => {
        if (e.target.value === "") setAccounts("");

        setShowAnimation(true);
        setSearchQuery(e.target.value);
    };

    const handleClick = () => {
        setSearch(false);
    }

    const getAccount = (id) => {
        setSearch(false);

        if (userId === id) {
            navigate("/profile");
        } else {
            navigate(`/profile/${id}`);
        }
    }

    return (
        <>

            <div className="animate-slide-in fixed bg-gray-100 flex flex-col items-center space-y-2 top-0 left-0 w-full h-full z-[999]">

                <div className="w-full p-5 relative">

                    <div className="search-bar flex items-center justify-center flex-row h-24  border-b border-gray-300">

                        <form className="w-[95%] h-full mr-2.5 font-medium md:w-3/4 lg:w-2/5">
                            <input className="w-full mt-[2.5%] h-3/4 border-0 text-center text-[1.4rem] font-medium rounded-md bg-inherit focus:outline-none md:text-3xl lg:text-4xl"
                                type="text"
                                placeholder="SEARCH FOR ACCOUNTS"
                                onChange={handleSearch} />
                        </form>

                        <CloseIcon fontSize='large' className='absolute left-[90%] cursor-pointer' onClick={handleClick} />
                    </div>

                </div>

                {accounts && !showAnimation && (
                    <div className="w-11/12 max-h-[75%] flex flex-col space-y-3 overflow-y-auto lg:w-2/5">

                        {accounts.map((account) => (
                            <SearchItem
                                key={account._id}
                                id={account._id}
                                fName={account.fName}
                                lName={account.lName}
                                profileImageUrl={account.profileImageUrl}
                                getAccount={() => getAccount(account._id)}
                                addFriend={() => addFriend(account)}
                                removeFriend={() => removeFriend(account)}
                            />
                        ))}
                    </div>
                )}

                {showAnimation && searchQuery && (
                    <div className="w-11/12 flex flex-col space-y-3 lg:w-2/5 lg:space-y-1">
                        <Pulse imageHeight="h-12" imageWidth="w-12" height="h-2.5" />
                        <Pulse imageHeight="h-12" imageWidth="w-12" height="h-2.5" />
                        <Pulse imageHeight="h-12" imageWidth="w-12" height="h-2.5" />
                        <Pulse imageHeight="h-12" imageWidth="w-12" height="h-2.5" />
                        <Pulse imageHeight="h-12" imageWidth="w-12" height="h-2.5" />
                    </div>
                )}

            </div>
        </>
    );
}

export default Search;