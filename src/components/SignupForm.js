import { useContext, useState } from "react";
//import axios from "axios";
import { UserContext } from "../App";
import { useNavigate, useOutletContext } from "react-router-dom";
//import { OutletContextType } from "./RecipePage";
import React from "react";

export default function SignupForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userphone, setUserphone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  //const pageLayout: PageLayoutType = useOutletContext();
  //const userContext: UserContextType = React.useContext(UserContext) as UserContextType;

  const handleSignUp = async (e) => {
    e.preventDefault();
    //const response = await axios.get("http://localhost:8000/user/"+username+"?password="+password);
    const authUser = {
      username: btoa(username),
      password: btoa(password),
    };

    userContext.addUser(
      firstname,
      lastname,
      username,
      password,
      useremail,
      userphone
    );
    navigate("/home");
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

  const handleCancel = (e) => {
    e.preventDefault();
    if (localStorage.getItem("user") != "") {
      navigate("/home");
    } else {
      setUsername("");
      setPassword("");
      setMessage("");
    }
  };

  const isValid = () => {
    return (
      firstname !== "" &&
      lastname !== "" &&
      username !== "" &&
      password !== "" &&
      useremail !== "" &&
      userphone !== ""
    );
  };

  return (
    <>
      <section className="signuppage">
        <div className="loginform">
          <form>
            <p className="msg">{message}</p>
            <h3>Please enter your information</h3>

            <div className="logininfo">
              <label htmlFor="username">Firstname</label>
              <input
                type="text"
                name="firsname"
                value={firstname}
                required
                id="firstname"
                onChange={(e) => setFirstname(e.target.value)}
              ></input>
              <label htmlFor="username">Lastname</label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                required
                id="lastrname"
                onChange={(e) => setLastname(e.target.value)}
              ></input>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                required
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                required
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <label htmlFor="useremail">Email:</label>
              <input
                type="email"
                name="useremail"
                id="useremail"
                value={useremail}
                required
                onChange={(e) => setUseremail(e.target.value)}
              />
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userphone}
                required
                placeholder="(XXX) XXX-XXXX"
                onChange={(e) => setUserphone(e.target.value)}
                //pattern="([1-9]{3}) ([0-9]{3})-([0-9]{4})"
              />
            </div>
            <div className="btn-grp">
              <input
                type="submit"
                className="btn bg-yellow"
                disabled={!isValid()}
                onClick={handleSignUp}
                value="Sign Up"
              />
              <button
                className="bg-yellow"
                aria-label="Cancel"
                onClick={() => navigate("/home")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
