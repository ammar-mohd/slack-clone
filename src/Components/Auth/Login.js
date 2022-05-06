import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../../firebase";
import "./Login.css";

function Login(props) {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        props.setUser(userInfo);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd-970-80.jpg.webp"
          alt="slack"
        />
        <h1>Sign in to Clever Programmer HQ</h1>
        <p>cleverprogrammer.slack.com</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
