/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(AuthContext);
    const { userId, setUserId } = useContext(AuthContext);
    const { userEmail, setUserEmail } = useContext(AuthContext);
    const { loggedIn, setLoggedIn } = useContext(AuthContext);

    const VITE_URL = import.meta.env.VITE_URL;

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const setCookie = (name, value, days) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);

        const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = cookieString;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                VITE_URL + "/login",
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                const token = response.data.token;
                setCookie("token", token, 7);

                setUserId(response.data.user._id);
                setUserEmail(email);
                setUser(response.data.user);
                setLoggedIn(true);
                navigate("/");
                toast.success("Welcome back! You've successfully signed in.");
            } else {
                toast.error("Sign-in failed. Please check your credentials and try again.");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.msg);
            } else {
                toast.error("An error occurred during Sign In, Please Try Again!");
            }
        }
    };

    return (
        <div className="bg-white flex flex-col items-center w-[95%] m-auto mt-28 rounded-lg lg:w-1/2 lg:mt-28">
            <div className="w-11/12 text-[.75rem] font-semibold py-4 md:text-base">
                Welcome To Sociopedia, the Social Media for Sociopaths!
            </div>

            <div className="w-11/12 flex flex-col mt-2 space-y-6">
                <form className="flex flex-col space-y-6">
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
                    Sign In
                </button>

                <div className="w-11/12 py-4 text-primary-400 text-sm hover:text-primary-500">
                    <Link
                        to="/signup"
                        className="border-b-2 border-primary-400 hover:border-primary-500"
                    >
                        Don't have an Account? Sign Up here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
