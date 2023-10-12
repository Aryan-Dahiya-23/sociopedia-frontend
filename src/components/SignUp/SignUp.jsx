import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const SignUp = () => {
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(null);
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hover, setHover] = useState(false);

    const VITE_URL = import.meta.env.VITE_URL;

    const handleProfileImage = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handlefName = (e) => {
        setfName(e.target.value);
    };

    const handlelName = (e) => {
        setlName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        let imageUrl = VITE_URL + "/uploads/emptyprofile.png";

        if (profileImage) {
            formData.append("image", profileImage);

            const imgbbKey = "2297152e80e8b3ceddce22a21d30a769";
            const imgbbResponse = await fetch(
                `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const imgbbData = await imgbbResponse.json();
            imageUrl = imgbbData.data.url;
        }

        let userData = {
            fName: fName,
            lName: lName,
            email: email,
            username: username,
            password: password,
            profileImageUrl: imageUrl,
        };

        try {
            const response = await axios.post(
                VITE_URL + "/register",
                userData,
                {}
            );

            if (response.status === 201) {
                alert("Registration successful");
                navigate("/signin");
            } else if (response.status === 409) {
                if (response.data.error === "Email already exists") {
                    alert("Email already exists");
                } else if (response.data.error === "Username already exists") {
                    alert("Username already exists");
                } else {
                    alert("Registration Failed");
                }
            } else {
                alert("An error occurred during registration, Please Try Again!");
            }
        } catch (error) {
            alert("An error occurred during registration, Please Try Again!");
        }
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 150,
                height: 150,
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }

    return (
        <div className="bg-white flex flex-col items-center w-[95%] m-auto mt-16 rounded-lg lg:w-1/2 lg:mt-6">
            <div className="w-11/12 text-[.75rem] font-semibold py-4 md:text-base">
                Welcome To Sociopedia, the Social Media for Sociopaths!
            </div>

            <div className="w-11/12 flex flex-col mt-2 space-y-6">
                <form className="flex flex-col space-y-6">
                    <div className="flex flex-row m-auto">
                        <label
                            className="relative cursor-pointer"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleProfileImage}
                            />

                            {/* {fName && lName && !profileImage ? (
                                <Avatar
                                    {...stringAvatar(fName + " " + lName)}
                                    alt="User"
                                    className={`m-auto ${hover ? "opacity-70" : ""} `}
                                />
                            ) : (
                                <Avatar
                                    alt="User"
                                    src={profileImage ? URL.createObjectURL(profileImage) : ""}
                                    sx={{ width: 150, height: 150 }}
                                    className={`m-auto ${hover ? "opacity-70" : ""} `}
                                />
                            )} */}

                            <Avatar
                                alt="User"
                                src={profileImage ? URL.createObjectURL(profileImage) : ""}
                                sx={{ width: 150, height: 150 }}
                                className={`m-auto ${hover ? "opacity-70" : ""} `}
                            />

                            <div
                                className={`absolute inset-0 flex justify-center items-center font-semibold ${profileImage ? "text-white" : "text-primary-500"
                                    } ${hover ? "inline-block" : "hidden"} `}
                            >
                                <EditOutlinedIcon />
                                <h1>Add Photo</h1>
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-col space-y-6 lg:flex-row lg:justify-between lg:space-y-0">
                        <input
                            className="py-2 pl-1 border border-gray-400 rounded-md lg:w-[47%] focus:border-primary-500 focus:outline-none"
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            onChange={handlefName}
                        />

                        <input
                            className="py-2 pl-1 border border-gray-400 rounded-md lg:w-[47%] focus:border-primary-500 focus:outline-none"
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            onChange={handlelName}
                        />
                    </div>

                    <div className="flex flex-col space-y-6">
                        <input
                            className="py-2 pl-1 border border-gray-400 rounded-md focus:border-primary-500 focus:outline-none"
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleEmail}
                        />

                        <input
                            className="py-2 pl-1 border border-gray-400 rounded-md focus:border-primary-500 focus:outline-none"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleUsername}
                        />

                        <input
                            className="py-2 pl-1 border border-gray-400 rounded-md focus:border-primary-500 focus:outline-none"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handlePassword}
                        />
                    </div>
                </form>

                <button
                    className="bg-primary-400 w-full py-2 text-white rounded-md hover:bg-primary-300"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </div>

            <div className="w-11/12 py-4 text-primary-400 text-sm  hover:text-primary-500">
                <Link
                    to="/signin"
                    className="border-b-2 border-primary-400 hover:border-primary-500"
                >
                    Already have an Account? Sign In here
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
