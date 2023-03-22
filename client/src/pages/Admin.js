import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import "../styles/Admin.css";

const Admin = () => {
  const uid = React.useContext(UidContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: true,
    }).then((res) => {
      setCurrentUser(res.data);
    });
  }, [uid]);

  if (!currentUser || !currentUser.isAdmin) {
    return (
      <div className="login-req">
        <div className="login-req-box">
          <h1>Admin</h1>
          <p>Vous n'avez pas les droits d'accès à cette page</p>
          <Link to="/">Dashboard</Link>
        </div>
      </div>
    );
  }

  const refreshPage = (event) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user`,
      withCredentials: true,
    }).then((res) => {
      setUsers(res.data);
    });
  };

  const handleDeleteUser = (userId) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      withCredentials: true,
    }).then((res) => {
      refreshPage();
    });
  };

  return (
    <div>
      <h1 className="title-admin">Admin</h1>
      <button onClick={refreshPage} className="refresh-admin">
        Refresh
      </button>
      {users.map((user) => (
        <div className="user-admin" key={user._id}>
          <p>Pseudo: {user.pseudo}</p>
          <p>Email: {user.email}</p>
          <p>Created At: {user.createdAt}</p>
          <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
