import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [search, setSearch] = useState(false);
    const [user, setUser] = useState();
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState(null);
    const [posts, setPosts] = useState();
    const [newPostDiv, setNewPostDiv] = useState(false);
    const [friends, setFriends] = useState();
    const [userProfileId, setUserProfileId] = useState();

    return (
        <AuthContext.Provider value={{
            loggedIn, setLoggedIn, search, setSearch, user, setUser, userEmail, setUserEmail,
            userId, setUserId, posts, setPosts, newPostDiv, setNewPostDiv, friends, setFriends, userProfileId, setUserProfileId
        }}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};