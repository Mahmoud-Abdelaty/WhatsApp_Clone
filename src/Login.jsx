import React from "react";
import { Button } from "@mui/material";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useSetValue } from "./StateProvider";
import { actionTypes } from "./reducer";

// 2.53.10
export default function Login() {
  const [{ user }, dispatch] = useSetValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({ type: actionTypes.SET_User, user: result.user })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/250px-WhatsApp.svg.png"
          alt=""
        />
        <h6>{user?.displayName}</h6>
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}
