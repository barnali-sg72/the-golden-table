import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCartShopping } from "react-icons/fa6";
import logo from "../assets/images/logos/img1.png";
import Nav from "./Nav";
import { getLoggedUser, UserContext } from "../App";
import { useContext, useState } from "react";

function Header() {
  const userContext = useContext(UserContext);
  const [isDropdownMenu, setDropdownMenu] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("AUTH");
    userContext.setUser(null);
    //navigate("/home");
  };

  const handleMenuClick = (name) => {
    userContext.setSelectedMenu(name);
    if (isDropdownMenu) {
      setDropdownMenu(false);
    }
  };

  return (
    <header>
      <img src={logo} alt="logo" onClick={(e) => navigate("/home")}></img>
      <Nav
        handleMenuClick={handleMenuClick}
        isDropdownMenu={isDropdownMenu}
        setDropdownMenu={setDropdownMenu}
      />

      <div className="right-icons">
        <div className="dropdown">
          <Link
            className={userContext.selectedMenu === "LOGIN" ? "selected" : ""}
          >
            {getLoggedUser() !== null ? (
              <div className="avataar">
                {getLoggedUser().firstname.toUpperCase().charAt(0)}
              </div>
            ) : (
              <FaUser className="faicon usericon" aria-label="User"></FaUser>
            )}
          </Link>
          <div class="dropdown-content">
            {getLoggedUser() === null ? (
              <Link to="/login" onClick={() => handleMenuClick("LOGIN")}>
                LOGIN
              </Link>
            ) : (
              <>
                <p>Hello, {getLoggedUser().firstname}</p>
                <div className="separator"></div>
                <Link to="/home" onClick={logout}>
                  LOGOUT
                </Link>
              </>
            )}
          </div>
        </div>

        <Link to="/orderOnline">
          <FaCartShopping className="faicon" aria-label="cart"></FaCartShopping>
        </Link>
      </div>
    </header>
  );
}

export default Header;
