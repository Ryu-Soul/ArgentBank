import React, { useEffect, useState, useRef } from "react";
import "../styles/global.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, changeUserName } from "../store/userSlice";
import Accounts from "../components/Accounts";

export default function User() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const profile = useSelector((state) => state.user.data);

  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(profile?.userName || "");
  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");

  const spanRef = useRef('');

  // Récupération du profil quand on a un token
  useEffect(() => {
    if (token) {
      dispatch(getUserProfile(token));
    }
  }, [token, dispatch]);

  // Mise à jour des champs quand le profil change
  useEffect(() => {
    if (profile) {
      setUserName(profile.userName);
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  const handleSave = () => {
    // adapte la payload à ce que ton changeUserName attend côté backend
    if  (userName !== '') {
      
      dispatch(changeUserName({ token, userName }));
      setEditMode(false);
    }
    else {
      
      if (spanRef.current) {
        spanRef.current.textContent = "Le champ doit être rempli"
      }
    }
  };
  return (
    <main className="main bg-dark">
      <div className="header">
        {editMode ? (
          <div className="Wrappers">
            <h1>Edit your name</h1>
            <div>
              <div className="input-wrapper">
                <label htmlFor="username">User name</label>
                <input
                  id="username"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="firstname">First name</label>
                <input id="firstname" type="text" value={firstName} disabled />
              </div>

              <div className="input-wrapper">
                <label htmlFor="lastname">Last name</label>
                <input id="lastname" type="text" value={lastName} disabled />
              </div>
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
            <span ref={spanRef}></span>
          </div>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {profile ? `${profile.userName} !` : "Loading..."}
            </h1>
            <button
              className="edit-button"
              onClick={() => setEditMode(true)}
            >
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <Accounts />
    </main>
  );
}
