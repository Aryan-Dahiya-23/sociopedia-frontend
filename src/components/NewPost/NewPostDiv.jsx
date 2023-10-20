/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingIndicator from "../UI/LoadingIndicator";
import { toast } from "react-toastify";

const NewPostDiv = () => {
    const { newPostDiv, setNewPostDiv } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { userId, setUserId } = useContext(AuthContext);
    const [changed, setChanged] = useState(false);
    const [caption, setCaption] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const VITE_URL = import.meta.env.VITE_URL;

    useEffect(() => {
        const textarea = document.getElementById("caption-textarea");
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [caption]);

    const handleTextareaChange = (event) => {
        setCaption(event.target.value);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setChanged(true);
        }
    };

    const handlePost = async () => {
        if (!loggedIn) {
            return toast.error("Please Login First!");
        }

        if (!caption && !selectedFile) {
            return toast.error("Please enter content for your post before submitting.");
        }

        setIsLoading(true);

        const formData = new FormData();

        let postData = {
            userId: userId,
        };

        if (caption) {
            postData.caption = caption;
        }

        if (selectedFile) {
            formData.append("image", selectedFile);
            const imgbbKey = import.meta.env.VITE_BB_SECRET_KEY;
            const imgbbResponse = await fetch(
                `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const imgbbData = await imgbbResponse.json();
            const imageUrl = imgbbData.data.url;
            postData.picturePath = imageUrl;
        }

        try {
            const response = await axios.post(
                VITE_URL + "/createpost",
                postData,
                {}
            );
            setIsLoading(false)
            if (response.status === 200) {
                toast.success("Your post has been successfully created.");
                setNewPostDiv(false);
            } else {
                toast.error("Failed to create the post. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to create the post. Please try again.");
        }
    };

    const handleClose = () => {
        setNewPostDiv(false);
    };

    return (
        // <div className="bg-white absolute h-full w-full z-50 left-1/2 transform -translate-x-1/2 rounded-xl lg:h-[70%] lg:w-2/4 lg:top-20">

        <div className="bg-white fixed h-full top-0 overflow-y-auto w-full z-10 animate-slide-in rounded-xl lg:animate-none lg:transform lg:-translate-x-1/2 lg:h-[80%] lg:w-7/12 lg:left-1/2 lg:top-20">

            <div className="w-[95%] h-full m-auto pt-2 pb-2">
                <div className="flex flex-row justify-between m-auto hover:cursor-pointer">
                    <div className="flex flex-row space-x-2 p-1 rounded-lg hover:bg-secondary-100">
                        <div>
                            <img
                                src={
                                    user
                                        ? user.profileImageUrl
                                        : VITE_URL + "/uploads/emptyprofile.png"
                                }
                                className="w-12 h-12 rounded-full object-cover"
                                alt=""
                            />
                        </div>

                        <div className="flex flex-col justify-start m-auto">
                            <span className="text-lg/[22.5px]">
                                {" "}
                                {user ? `${user.fName} ${user.lName}` : "No User"}{" "}
                            </span>
                            <span className="text-sm/[15px] text-secondary-600">
                                post to anyone
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`max-h-[600px] mt-4 overflow-y-auto ${selectedFile ? "lg:max-h-[350px]" : "lg:max-h-[275px]"}`}>
                    <div className="flex flex-col w-full gap-2 p-1.5">
                        <textarea
                            id="caption-textarea"
                            className="min-h-[75px] w-full outline-none resize-none"
                            placeholder="What do you have in mind?"
                            value={caption}
                            onChange={handleTextareaChange}
                        ></textarea>

                        {selectedFile && (
                            <img
                                className="max-h-auto max-w-auto object-cover rounded-lg"
                                src={URL.createObjectURL(selectedFile)}
                                alt="Uploaded File"
                            />
                        )}
                    </div>
                </div>

                <div className={`flex flex-row space-x-5 mt-5 lg:absolute lg:bottom-[107.5px] ${changed ? "lg:hidden" : ""}`}>
                    <div className="bg-secondary-50 p-3 rounded-3xl hover:cursor-pointer hover:shadow-lg">
                        <label>
                            <input
                                type="file"
                                name=""
                                id=""
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <ImageOutlinedIcon />
                        </label>
                    </div>

                    <div className="bg-secondary-50 p-3 rounded-3xl hover:cursor-pointer hover:shadow-lg">
                        <label>
                            <input
                                type="file"
                                name=""
                                id=""
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <PersonalVideoIcon />
                        </label>
                    </div>

                    <div className="bg-secondary-50 p-3 rounded-3xl hover:cursor-pointer hover:shadow-lg">
                        <label>
                            <input
                                type="file"
                                name=""
                                id=""
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <AttachFileIcon />
                        </label>
                    </div>

                    <div className="bg-secondary-50 p-3 rounded-3xl hover:cursor-pointer hover:shadow-lg">
                        <label>
                            <input
                                type="file"
                                name=""
                                id=""
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <MicNoneOutlinedIcon />
                        </label>
                    </div>

                    <div className="lg:hidden m-auto">
                        {!isLoading ?
                            <button
                                className="bg-primary-500 ml-4 text-white pt-2 pb-2 pl-5 pr-5 rounded-full hover:opacity-80"
                                onClick={handlePost}>
                                Post
                            </button>
                            :
                            <div className="ml-4 pt-2 pb-2 pl-5 pr-5">
                                <LoadingIndicator />
                            </div>
                        }
                    </div>
                </div>

                <div className="hidden w-[95%] bottom-20 lg:absolute lg:inline-block border-[.5px] border-gray-300"></div>

                {!isLoading ?
                    <button className="hidden bg-primary-500 text-white pt-1 pb-1 pl-4 pr-4 rounded-full lg:inline-block lg:absolute lg:bottom-6 lg:right-12 hover:opacity-80"
                        onClick={handlePost} >
                        Post
                    </button>
                    :
                    <div className="hidden absolute bottom-6 right-12 lg:inline-block">
                        <LoadingIndicator />
                    </div>
                }

                <div className="absolute p-2 top-1 right-1 rounded-full cursor-pointer hover:bg-secondary-50" onClick={handleClose}>
                    <CloseIcon fontSize="medium" />
                </div>
            </div>
        </div>
    );
};

export default NewPostDiv;
