/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { AuthContext } from '../../contexts/AuthContext';
import Posts from '../Posts/Posts';
import Friends from './Friends';
import About from './About';
import Pulse from '../Animations/Pulse';

const Profile = () => {

    const { userId, setUserId } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const { posts, setPosts } = useContext(AuthContext);
    const { friends, setFriends } = useContext(AuthContext);
    const [showPosts, setShowPosts] = useState(true);
    const [about, setAbout] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [likedPosts, setLikedPosts] = useState(false);
    const [savedPosts, setSavedPosts] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFriends, setIsLoadingFriends] = useState(false);

    const VITE_URL = import.meta.env.VITE_URL;

    useEffect(() => {

        const fetchData = async () => {

            if (showPosts) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`${VITE_URL}/fetchmyposts?id=${userId}`);

                    if (response.status === 200) {
                        console.log(response.data);
                        setIsLoading(false);
                        setPosts(response.data);
                    } else {
                        alert("Error in loading posts");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        fetchData();
    }, [showPosts]);

    useEffect(() => {

        const fetchData = async () => {

            if (likedPosts) {
                setIsLoading(true)
                try {
                    const response = await axios.get(`${VITE_URL}/fetchlikedposts?id=${userId}`);

                    if (response.status === 200) {
                        console.log(response.data);
                        setIsLoading(false)
                        setPosts(response.data);
                    } else {
                        alert("Error in loading posts");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        fetchData();
    }, [likedPosts]);

    useEffect(() => {

        const fetchData = async () => {

            if (savedPosts) {
                setIsLoading(true)
                try {
                    const response = await axios.get(`${VITE_URL}/fetchsavedposts?id=${userId}`);

                    if (response.status === 200) {
                        console.log(response.data);
                        setIsLoading(false)
                        setPosts(response.data);
                    } else {
                        alert("Error in loading posts");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        fetchData();
    }, [savedPosts]);

    useEffect(() => {

        const fetchData = async () => {

            if (showFriends) {
                setIsLoadingFriends(true)
                try {
                    const response = await axios.get(`${VITE_URL}/fetchfriends?id=${userId}`);

                    if (response.status === 200) {
                        setIsLoadingFriends(false)
                        setFriends(response.data);
                    } else {
                        alert("Error in loading posts");
                        setFriends();
                    }
                } catch (error) {
                    console.log(error);
                    setFriends();
                }
            }
        }

        fetchData();
    }, [showFriends]);

    const handleTabClick = (targetTab) => {

        setShowPosts(targetTab === "showPosts");
        setAbout(targetTab === "about");
        setShowFriends(targetTab === "showFriends");
        setLikedPosts(targetTab === "likedPosts");
        setSavedPosts(targetTab === "savedPosts")
    }

    return (
        <div className="lg:space-y-[400px]">
           
            <div className="bg-white w-[95%] m-auto mt-[7.5%] rounded-xl lg:absolute lg:w-2/5 lg:ml-[32.5%] lg:-top-5">

                <div className="flex flex-col">

                    <div>
                        <img src="https://wallpapers.com/images/hd/high-resolution-sunset-at-beach-uv86ogd7ebypmfo7.jpg"
                            alt="Mountain Picture"
                            className="w-full h-[175px] object-cover rounded-xl" />
                    </div>

                    <div className="flex flex-row w-[80%] ml-4 -mt-9 md:w-1/2 lg:w-7/12">
                        <img src={user.profileImageUrl}
                            alt="Profile"
                            className="object-cover rounded-full  h-36 w-36 "
                        />
                        <div className="flex flex-col m-auto ">
                            <span className="text-lg font-bold md:text-2xl md:font-extrabold">{user.fName + " " + user.lName}</span>
                            <span className="text-xs">Mumbai, India</span>
                        </div>
                    </div>

                    <div className="flex flex-row mt-5 mb-1 px-1 justify-between items-center text-xs lg:text-sm">

                        <div className={`flex flex-row space-x-1 p-1 cursor-pointer lg:space-x-1.5 lg:p-1.5 hover:text-primary-500 hover:border-b-4 hover:border-b-primary-500 ${showPosts ? 'border-b-primary-500 border-b-4 text-primary-500' : ''}`}
                            onClick={() => handleTabClick("showPosts")}>
                            <DescriptionOutlinedIcon />
                            <span className="m-auto">Posts</span>
                        </div>

                        <div className={`flex flex-row space-x-1 p-1 cursor-pointer lg:space-x-1.5 lg:p-1.5 hover:text-primary-500 hover:border-b-4 hover:border-b-primary-500 ${likedPosts ? 'border-b-primary-500 border-b-4 text-primary-500' : ''}`}
                            onClick={() => handleTabClick("likedPosts")}>
                            <FavoriteBorderOutlinedIcon />
                            <span className="m-auto inline-block lg:hidden">Liked</span>
                            <span className="hidden m-auto lg:inline-block">Liked Posts</span>                          </div>

                        <div className={`flex flex-row space-x-1 p-1 cursor-pointer lg:space-x-1.5 lg:p-1.5 hover:text-primary-500 hover:border-b-4 hover:border-b-primary-500 ${savedPosts ? 'border-b-primary-500 border-b-4 text-primary-500' : ''}`}
                            onClick={() => handleTabClick("savedPosts")}>
                            <BookmarkBorderOutlinedIcon />
                            <span className="m-auto inline-block lg:hidden">Saved</span>
                            <span className="hidden m-auto lg:inline-block">Saved Posts</span>
                        </div>

                        <div className={`flex flex-row space-x-1 p-1 cursor-pointer lg:space-x-1.5 lg:p-1.5 hover:text-primary-500 hover:border-b-4 hover:border-b-primary-500 ${showFriends ? 'border-b-primary-500 border-b-4 text-primary-500' : ''}`}
                            onClick={() => handleTabClick("showFriends")}>
                            <GroupsOutlinedIcon />
                            <span className="m-auto">Friends</span>
                        </div>

                        <div className={`flex flex-row space-x-1 p-1 cursor-pointer lg:space-x-1.5 lg:p-1.5 hover:text-primary-500 hover:border-b-4 hover:border-b-primary-500 ${about ? 'border-b-primary-500 border-b-4 text-primary-500' : ''}`}
                            onClick={() => handleTabClick("about")}>
                            <InfoOutlinedIcon />
                            <span className="m-auto">About</span>
                        </div>
                    </div>

                </div>

            </div>

            {isLoading &&
                <div className="max-h-screen w-[95%] m-auto mt-[7.5%] space-y-5 lg:w-2/5 lg:ml-[32.5%] lg:mt-44 ">
                    <Pulse imageHeight="h-14" imageWidth="w-14" height="h-4" />
                    <Pulse imageHeight="h-14" imageWidth="w-14" height="h-4" />
                </div>
            }

            {isLoadingFriends &&
                <div className="bg-white w-[95%] m-auto mt-7 mb-20 p-4 space-y-4 rounded-xl lg:w-2/5 lg:ml-[32.5%] lg:mt-16">
                    <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    <div className="hidden lg:inline-block">
                        <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                        <Pulse imageHeight="h-10" imageWidth="w-10" height="h-2.5" />
                    </div>
                </div>
            }

            {showPosts && posts && !isLoading && <Posts mt="mt-44" posts={posts} />}
            {likedPosts && posts && !isLoading && <Posts posts={posts} />}
            {savedPosts && posts && !isLoading && <Posts posts={posts} />}
            {showFriends && friends && <Friends />}
            {about && <About user={user} />}

        </div>

    );
}

export default Profile;
