import { useEffect, useState, createContext, useRef } from "react";
import "./css/styles.css";
import "./css/general.css";
import "./css/queries.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Dialog from "./components/Dialog";

export const UserContext = createContext(null);

export function getLoggedUser() {
  //alert(localStorage.getItem('AUTH'));
  if (localStorage.getItem("AUTH") !== null) {
    //alert(localStorage.getItem('AUTH'));
    const currentUser = JSON.parse(localStorage.getItem("AUTH") || "{}");
    //alert(currentUser);
    return currentUser;
  } else {
    return null;
  }
}

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogmsg, setDialogmsg] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("HOME");

  const openDialog = (msg) => {
    setDialogmsg(msg);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    //localStorage.clear();
    let users = localStorage.getItem("USERS");
    if (users != undefined && users != null) {
      const userlist = JSON.parse(users);
      console.log(userlist);
      if (userlist.length > 0) {
        setUsers(userlist);
      }
    }
    //alert(selectedMenu);
  }, [user, isDialogOpen, selectedMenu]);

  //  USERS
  const addUser = (
    firstname,
    lastname,
    username,
    password,
    useremail,
    userphone
  ) => {
    let allusers = localStorage.getItem("USERS");
    let users = [];
    if (allusers != undefined && allusers != null) {
      users = JSON.parse(allusers);
      console.log(users);
    }
    users.push({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      useremail: useremail,
      userphone: userphone,
    });

    if (users.length > 0) {
      setUsers(users);
      localStorage.setItem("USERS", JSON.stringify(users));
    }

    alert(`User ${username} added!`);
  };

  const findUser = (username, password) => {
    let arr = users.filter(
      (u) => u.username === username && u.password === password
    );
    if (arr.length > 0) {
      return arr[0];
    } else {
      return null;
    }
  };

  const UserContextValue = {
    user: user,
    users: users,
    //updateCurrentUser: updateCurrentUser,
    addUser: addUser,
    findUser: findUser,
    setUser: setUser,
    dialogmsg: dialogmsg,
    isDialogOpen: isDialogOpen,
    openDialog: openDialog,
    closeDialog: closeDialog,
    selectedMenu: selectedMenu,
    setSelectedMenu: setSelectedMenu,
  };
  return (
    <UserContext.Provider value={UserContextValue}>
      <Header />
      <Main />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
