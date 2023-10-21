/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { AuthContext } from '../../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
const Posts = ({ posts: propPosts, mt }) => {

    const navigate = useNavigate();

    const { userId, setUserId } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const { posts, setPosts } = useContext(AuthContext);
    const [currentPost, setCurrentPost] = useState();
    const [comment, setComment] = useState("");
    const [updatedPost, setUpdatedPost] = useState();
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

    useEffect(() => {
        const updatePost = async () => {
            if (updatedPost) {
                try {
                    const response = await axios.post(VITE_URL + "/updatepost", {
                        post: updatedPost
                    });
                } catch (error) {
                    console.log(error.response.status);
                }
            }
        }

        updatePost();
    }, [updatedPost]);

    const toggleLiked = (post) => {

        const id = post._id;

        if (user.likedPosts.includes(id)) {
            const updatedLikedUsers = post.likedByUserIds.filter((userId) => userId !== user._id);
            setUpdatedPost({ ...post, likedByUserIds: updatedLikedUsers });

            const updatedPosts = posts.map((p) => (p._id === id ? { ...p, likedByUserIds: updatedLikedUsers } : p));
            setPosts(updatedPosts);

            const updatedLikedPosts = user.likedPosts.filter((postId) => postId !== id);
            setUser({ ...user, likedPosts: updatedLikedPosts });

            toast.info("You've unliked the post.");

        } else {
            const updatedLikedUsers = [...post.likedByUserIds, user._id];
            setUpdatedPost({ ...post, likedByUserIds: updatedLikedUsers });

            const updatedPosts = posts.map((p) => (p._id === id ? { ...p, likedByUserIds: updatedLikedUsers } : p));
            setPosts(updatedPosts);

            const updatedLikedPosts = [...user.likedPosts, id];
            setUser({ ...user, likedPosts: updatedLikedPosts });

            const notificationMessage = {
                userId: user._id,
                userName: user.fName + " " + user.lName,
                userProfileImageUrl: user.profileImageUrl,
                message: "liked your post.",
                postId: id,
                postImageUrl: post.imageUrl,
                read: false
            }

            if (!user.posts.includes(post)) addNotification(post.createdBy.id, notificationMessage);

            toast.success("You've liked the post.");
        }

        setUserUpdated(true);
    };

    const updateFriend = async (friendId) => {

        try {
            const response = await axios.post(`${VITE_URL}/updatefriend/${friendId}`, { userId });

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addFriend = (post) => {

        if (user._id !== post.createdBy.id) {
            const updatedUserFriends = [...user.friends, post.createdBy.id];

            const updatedUser = { ...user, friends: updatedUserFriends };

            setUser(updatedUser);
            setUserUpdated(true);

            toast.success("You've added " + post.createdBy.name + " as a friend.");

            updateFriend(post.createdBy.id);

            const notificationMessage = {
                userId: user._id,
                userName: user.fName + " " + user.lName,
                userProfileImageUrl: user.profileImageUrl,
                message: "added you as their friend.",
                friendId: post.createdBy.id,
                friendName: post.createdBy.name,
                friendImageUrl: post.createdBy.profileImageUrl,
                read: false
            }

            addNotification(post.createdBy.id, notificationMessage);
        }
    };

    const removeFriend = (post) => {
        if (user._id !== post.createdBy.id) {
            const updatedUserFriends = user.friends.filter((friendId) => friendId !== post.createdBy.id);

            const updatedUser = { ...user, friends: updatedUserFriends };

            setUser(updatedUser);
            setUserUpdated(true);

            toast.info("You've removed " + post.createdBy.name + " from your friends list.");

            updateFriend(post.createdBy.id);
        }
    }

    const handleCommentContent = (e) => {
        setComment(e.target.value);
    }

    const handleComment = (post) => {

        if (comment.length < 1)
            return toast.error("Please enter a comment before submitting.");

        const commentByUser = {
            id: user._id,
            name: user.fName + " " + user.lName,
            profileImageUrl: user.profileImageUrl,
            comment: comment,
        };

        const updatedComments = [...post.comments, commentByUser];
        const updatePost = { ...post, comments: updatedComments };

        const commentUser = {
            postId: post._id,
            commentText: comment
        };

        const updatedUserComments = [...user.comments, commentUser];

        setUpdatedPost(updatePost);

        const updatedPosts = posts.map((p) => (p._id === post._id ? updatePost : p));
        setPosts(updatedPosts);

        setUser({ ...user, comments: updatedUserComments });
        setUserUpdated(true);

        setCurrentPost(post._id);
        setComment("");

        const notificationMessage = {
            userId: user._id,
            userName: user.fName + " " + user.lName,
            userProfileImageUrl: user.profileImageUrl,
            message: "commented on your post.",
            friendId: post.createdBy.id,
            friendName: post.createdBy.name,
            friendImageUrl: post.imageUrl,
            read: false
        }

        addNotification(post.createdBy.id, notificationMessage);

        toast.success("Your comment has been added.");
    };

    const savePost = (post) => {
        const updateSavedPosts = [...user.savedPosts, post._id];

        const updatedUser = { ...user, savedPosts: updateSavedPosts };

        setUser(updatedUser);
        setUserUpdated(true);

        toast.success("You've saved the post.");
    }

    const unsavePost = (post) => {
        const updateSavedPosts = user.savedPosts.filter((postId) => postId !== post._id);

        const updatedUser = { ...user, savedPosts: updateSavedPosts };

        setUser(updatedUser);
        setUserUpdated(true);

        toast.info("You've unsaved the post.");
    }

    const handleUserProfile = (id) => {

        if (!user) {
            toast.error("Please login first!");
            navigate("/signin");
        }
        else if (user._id !== id) {
            navigate(`/profile/${id}`);
        }
    }

    const handleComments = (id) => {
        id === currentPost ? setCurrentPost() : setCurrentPost(id);
    }

    const addNotification = async (id, notificationMessage) => {
        console.log(id);
        console.log(notificationMessage);

        try {
            const response = await axios.post(`${VITE_URL}/addnotification/${id}`, { notificationMessage });

            if (response.status === 200) {
                console.log("Notification Sent");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loginAlert = () => {
        toast.error("Please login first!");
        navigate("/signin");
    }

    const calculateDaysAgo = (createdAt) => {

        const createdAtDate = new Date(createdAt);
        const currentDate = new Date();

        const createdAtTimestamp = createdAtDate.getDate() + createdAtDate.getMonth() + createdAtDate.getFullYear();
        const currentTimestamp = currentDate.getDate() + currentDate.getMonth() + currentDate.getFullYear();

        const daysAgo = currentTimestamp - createdAtTimestamp

        if (daysAgo === 0) {
            return "Today"
        } else if (daysAgo === 1) {
            return "Yesterday"
        } else {
            return `${daysAgo} days ago`;
        }
    }

    function copyLinkToClipboard() {
        const linkToCopy = "https://sociopedia-aryan.vercel.app";

        const tempInput = document.createElement('input');
        tempInput.value = linkToCopy;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand('copy');

        document.body.removeChild(tempInput);

        toast.success("Link copied to clipboard");
    }

    return (

        <div className={`w-[95%] m-auto mt-[7.5%] mb-12 space-y-5 lg:w-2/5 lg:ml-[32.5%] lg:${mt} lg:mt-44`}>


            {posts.map((post) => (
                <div key={post._id} className="bg-white space-y-5 p-5 rounded-lg">

                    <div className="flex flex-row justify-between">

                        <div className="flex flex-row space-x-2.5 hover:cursor-pointer" onClick={() => handleUserProfile(post.createdBy.id)}>
                            <img src={post.createdBy.profileImageUrl} className="w-12 h-12 rounded-full object-cover" alt="" />
                            <div className="flex flex-col hover:text-secondary-700">
                                <span>{post.createdBy.name}</span>
                                <span className="text-xs lg:text-sm">{calculateDaysAgo(post.createdAt)}</span>
                            </div>
                        </div>

                        <div className="bg-primary-100 border rounded-full mt-auto mb-auto p-1 text-primary-500 hover:text-primary-400">

                            {user && (
                                user.friends.includes(post.createdBy.id) ? (
                                    <PersonRemoveOutlinedIcon className="cursor-pointer" onClick={() => removeFriend(post)} />

                                ) : (
                                    <PersonAddOutlinedIcon className="cursor-pointer" onClick={() => addFriend(post)} />
                                )
                            )}

                            {!user && <PersonAddOutlinedIcon className="cursor-pointer" onClick={loginAlert} />}
                        </div>
                    </div>

                    <div className="text-base">{post.caption}</div>


                    {post.imageUrl ?
                        <div className="w-full">
                            <img src={post.imageUrl} className="h-full w-full object-cover rounded-xl" />
                        </div> :
                        <></>
                    }

                    <div className="w-full flex flex-row justify-between m-auto px-1 space-x-2.5 lg:px-1.5">

                        <div className="w-2/12 lg:w-auto">
                            <img src={user ? user.profileImageUrl : VITE_URL + "/uploads/emptyprofile.png"} className="w-12 h-12 object-cover rounded-full" alt="" />
                        </div>

                        <div className="relative w-10/12 md:w-[675px] lg:w-[500px]">

                            <input type="text"
                                onChange={handleCommentContent}
                                value={comment}
                                placeholder="Leave a comment"
                                className="bg-secondary-50 h-12 w-full rounded-3xl pl-2.5 pr-12 focus:outline-none"
                            />
                            {user ?
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={() => handleComment(post)}>
                                    <SendOutlinedIcon />
                                </div>
                                :
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={loginAlert}>
                                    <SendOutlinedIcon />
                                </div>
                            }

                        </div>

                    </div>

                    {currentPost === post._id && post.comments.length > 0 &&
                        <div className="flex flex-col w-full h-full space-y-4">

                            {post.comments.map((comment) => (
                                <div key={comment._id}>

                                    <div className="flex flex-row w-full pb-1 space-x-2 border-b border-gray-200">

                                        <div className={`lg:w-1/12`}>
                                            <img src={comment.profileImageUrl} alt="User Profile" className="w-9 h-9 object-cover rounded-full" />
                                        </div>

                                        <div className="flex flex-col m-auto w-10/12 lg:w-full">
                                            <div className="font-semibold">
                                                {comment.name}
                                            </div>

                                            <div>
                                                {comment.comment}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>}

                    <div className="flex flex-row justify-between">

                        <div className="flex flex-row space-x-4">

                            <div className="flex flex-row space-x-2">

                                {user &&
                                    (user.likedPosts.includes(post._id) ? (
                                        <FavoriteIcon className="cursor-pointer text-red-500" onClick={() => toggleLiked(post)} />
                                    ) : (
                                        <FavoriteBorderOutlinedIcon className="cursor-pointer" onClick={() => toggleLiked(post)} />
                                    ))}

                                {!user && <FavoriteBorderOutlinedIcon className="cursor-pointer" onClick={loginAlert} />}

                                <span>{post.likedByUserIds.length}</span>
                            </div>

                            <div className="flex flex-row space-x-2">
                                <ModeCommentOutlinedIcon className="cursor-pointer" onClick={() => handleComments(post._id)} />
                                <span>{post.comments.length}</span>
                            </div>

                            <div className="flex flex-row space-x-2 cursor-pointer">

                                {user &&
                                    (user.savedPosts.includes(post._id) ? (
                                        <BookmarkOutlinedIcon onClick={() => unsavePost(post)} />
                                    ) : (
                                        <BookmarkBorderOutlinedIcon onClick={() => savePost(post)} />
                                    ))}

                                {!user && <BookmarkBorderOutlinedIcon onClick={loginAlert} />}

                            </div>
                        </div>

                        <div className="cursor-pointer" onClick={copyLinkToClipboard}>
                            <ShareOutlinedIcon />
                        </div>
                    </div>
                </div>
            ))
            }

        </div>
    );
}

export default Posts;
