import { useContext, useState } from "react";

import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

import React from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    //const response = await axios.get("http://localhost:8000/user/"+username+"?password="+password);
    const authUser = {
      username: btoa(username),
      password: btoa(password),
    };

    if (checkUser()) {
      let usr = userContext.findUser(username, password);
      //alert(usr);
      localStorage.setItem("AUTH", JSON.stringify(usr));
      userContext.setUser(usr);
      navigate("/home");
    } else {
      setMessage("Username/Password does not exist!");
    }

    //const response = await axios.post("http://localhost:8000/user/login", authUser);
    /*if (response.data.code == 200) {
            //const data: User = response.data.data[0];
            if (data != undefined) {   
                userContext.updateCurrentUser(data);             
                setTimeout(()=> {                   
                    navigate("/home");
                }, 300);
                //navigate("/home");
                
            } else {

            }
        } else {
            //pageLayout.displayMessage(true, "Username/Password does not exist!");
            setMessage("Username/Password does not exist!");
        }*/
  };

  const checkUser = () => {
    let list = userContext.users.filter(
      (u) => u.username === username && u.password === password
    );
    return list.length > 0;
  };

  /*const handleCancel = (e) => {
    e.preventDefault();
    if (localStorage.getItem("AUTH") != "") {
      navigate("/home");
    } else {
      setUsername("");
      setPassword("");
      setMessage("");
    }
  };*/

  return (
    <>
      <div className="loginpage">
        <div className="loginform">
          <form>
            <p className="msg">{message}</p>
            <h3>Enter your login information</h3>

            <div className="logininfo">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                id="username"
                onChange={(e) => setUsername(e.currentTarget.value)}
              ></input>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              ></input>
            </div>
            <div className="btn-grp">
              <input
                type="submit"
                className="btn bg-yellow"
                disabled={username == "" || password == ""}
                onClick={handleSignIn}
                value="Sign In"
              />
              <button
                className="bg-yellow"
                aria-label="Cancel"
                onClick={() => navigate("/home")}
              >
                Cancel
              </button>
            </div>
            <h6>
              Not a registered user? Please <a href="/signup">sign up</a> for a
              new account
            </h6>
          </form>
        </div>
      </div>
    </>
  );
}
