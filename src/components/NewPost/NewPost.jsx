/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import NewPostDiv from './NewPostDiv';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import { toast } from 'react-toastify';

const NewPost = () => {

    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext);
    const { newPostDiv, setNewPostDiv } = useContext(AuthContext);

    const VITE_URL = import.meta.env.VITE_URL;

    const handleClick = () => {
        if (!user) {
            toast.error("Please login first!");
            navigate("/signin");
        } else {
            setNewPostDiv(true);
        }
    }

    return (
        <>

            {newPostDiv && (<NewPostDiv />)}

            <div className="bg-white w-[95%] m-auto mt-[4%] space-y-5 p-2 pt-3 rounded-lg lg:absolute lg:w-2/5 lg:ml-[32.5%] lg:mt-[1%] hover:cursor-pointer">

                <div className="w-[97.5%] flex flex-row justify-between m-auto space-x-2.5 hover:cursor-pointer">

                    <div className="w-2/12 lg:w-auto">
                        <img src={user ? user.profileImageUrl : VITE_URL + "/uploads/emptyprofile.png"} className="w-12 h-12 rounded-full object-cover" alt="" />
                    </div>
                    <input type="text" placeholder="what's on your mind..." className="bg-secondary-50 h-12 w-10/12 rounded-3xl pl-2.5 md:w-[675px] lg:w-[500px] focus:outline-none cursor-pointer" onClick={handleClick} />
                </div>

                <div className="bg-secondary-100 h-[1px]"></div>

                <div className="w-[97.5%] flex flex-row space-x-3 justify-between text-xs md:text-sm">

                    <div className="flex flex-row space-x-1 md:space-x-1.5" onClick={handleClick}>
                        <ImageOutlinedIcon />
                        <span className="m-auto">Image</span>
                    </div>

                    <div className="flex flex-row space-x-1 md:space-x-1.5" onClick={handleClick}>
                        <PersonalVideoIcon />
                        <span className="m-auto">Video</span>
                    </div>

                    <div className="flex flex-row space-x-1 md:space-x-1.5" onClick={handleClick}>
                        <AttachFileIcon />
                        <span className="m-auto">Attachment</span>
                    </div>

                    <div className="flex flex-row space-x-1 md:space-x-1.5" onClick={handleClick}>
                        <MicNoneOutlinedIcon />
                        <span className="m-auto">Audio</span>
                    </div>

                </div>

            </div>

        </>



    );
}

export default NewPost;