/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const SearchItem = (props) => {

    const { user } = useContext(AuthContext);
    const { fName, lName, profileImageUrl, id } = props;

    return (

        <div className="flex flex-row justify-between border-b border-gray-300 pt-1 pb-1">

            <div className="flex flex-row space-x-2.5 hover:cursor-pointer" onClick={props.getAccount}>
                {<img src={profileImageUrl} className="w-12 h-12 rounded-full object-cover" alt="" />}
                {<span className="m-auto hover:border-b-2 hover:border-primary-300">{fName + " " + lName}</span>}
            </div>

            <div className="bg-primary-100 border rounded-full mt-auto mb-auto p-1 text-primary-500 hover:text-primary-400">
                {user.friends.includes(id) ? (
                    <PersonRemoveOutlinedIcon className="cursor-pointer" onClick={props.removeFriend} />

                ) : (
                    <PersonAddOutlinedIcon className="cursor-pointer" onClick={props.addFriend} />
                )}
            </div>

        </div>
    );
}

export default SearchItem;