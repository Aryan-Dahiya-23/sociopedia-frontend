/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Search from "../Search/Search";
import NewPostDiv from "../NewPost/NewPostDiv";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  const { userEmail, setUserEmail } = useContext(AuthContext);
  const { userId, setUserId } = useContext(AuthContext);
  const { search, setSearch } = useContext(AuthContext);
  const { newPostDiv, setNewPostDiv } = useContext(AuthContext);
  const { posts, setPosts } = useContext(AuthContext);

  useEffect(() => {

    const VITE_URL = import.meta.env.VITE_URL;

    const fetchData = async () => {
      if (loggedIn === false) {
        try {

          const cookies = document.cookie.split('; ');
          const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
          let token = '';
          if (tokenCookie) token = tokenCookie.split('=')[1];


          // const response = await axios.get(VITE_URL + "/profile", {
          //   withCredentials: true,
          // });

          const response = await axios.get(VITE_URL + "/profile", {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true 
          });
          
          if (response.data) {
            const { email, _id } = response.data;
            setUserId(_id);
            setUserEmail(email);
            setUser(response.data);
            setLoggedIn(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    setSearch(true);
  };

  return (
    <>
      {search && <Search />}

      {newPostDiv && <NewPostDiv />}

      <header className="bg-white p-4 flex items-center justify-between">
        <div className="flex items-center sm:ml-1">
          <Link
            to="/"
            className="text-primary-500 text-xl font-bold hover:text-primary-400 md:text-[2rem] hover:cursor-pointer"
          >
            Sociopedia
          </Link>
          {/* <h1 className="text-primary-500 text-xl font-bold hover:text-primary-400 md:text-[2rem] hover:cursor-pointer">Sociopedia</h1> */}
        </div>

        <div className="flex items-center md:space-x-2 sm:mr-2">
          <div
            className="relative items-center p-2 bg-secondary-50 rounded-lg sm:flex sm:px-4 sm:py-2 sm:mr-3"
            onClick={handleSearch}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent w-32 text-sm rounded-md focus:outline-none sm:w-full sm:px-0 sm:text-base"
            />
            <SearchIcon className="text-gray-600" />
          </div>

          {/* <div className="flex sm:hidden mr-3" onClick={handleSearch}>
                        <SearchIcon />
                    </div> */}

          {/* <ChatIcon alt="Message" className="hover:cursor-pointer" /> */}
        </div>
      </header>
    </>
  );
};

export default Header;
