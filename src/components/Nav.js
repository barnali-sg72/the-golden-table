import { Link } from "react-router-dom";
import { FaBars, FaX } from "react-icons/fa6";
import { UserContext } from "../App";
import { useContext, useState } from "react";
//import useMediaQuery from "../hooks/useMediaQuery";

function Nav({ handleMenuClick, isDropdownMenu, setDropdownMenu }) {
  const userContext = useContext(UserContext);
  //const closeBtnRef = useRef(null);
  //const [isOpen, setOpen] = useState(false);

  /*useEffect(() => {
    document.body.addEventListener("click", (e) => {
      alert(isDropdownMenu);
      console.log(e);
      if (!isDropdownMenu) {
        alert("here2");
        displayDropdownMenu(false);
      }
    });
    return () =>
      document.body.removeEventListener("click", (e) => {
        if (isDropdownMenu) displayDropdownMenu(false);
      });
  }, []);*/
  //const navigate = useNavigate();
  //const mediaMatches = useMediaQuery("only screen and (max-width: 600px)");

  /*const logout = () => {
        localStorage.removeItem('AUTH');
        userContext.setUser(null);
        navigate("/home");
    }*/

  const displayDropdownMenu = (flag) => {
    //closeBtnRef.current.style.width = flag ? "40rem" : "0";
    setDropdownMenu(flag);
    //setOpen(flag);
  };

  return (
    <nav>
      <a
        href="javascript:void(0);"
        className={isDropdownMenu ? "menu-icon-hide" : "menu-icon-show"}
      >
        <FaBars
          className="faicon bars"
          aria-label="bars"
          onClick={(e) => displayDropdownMenu(true)}
        ></FaBars>
      </a>
      <div className="menu-overlay">
        <div
          className={
            isDropdownMenu ? "responsive nav-menu" : "unresponsive nav-menu"
          }
        >
          <ul>
            <li>
              <Link
                to="/"
                className={
                  userContext.selectedMenu === "HOME" ? "selected" : ""
                }
                onClick={() => handleMenuClick("HOME")}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  userContext.selectedMenu === "ABOUT" ? "selected" : ""
                }
                onClick={() => handleMenuClick("ABOUT")}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className={
                  userContext.selectedMenu === "MENU" ? "selected" : ""
                }
                onClick={() => handleMenuClick("MENU")}
              >
                MENU
              </Link>
            </li>
            <li>
              <Link
                to="/bookingPage"
                className={
                  userContext.selectedMenu === "RESERVATIONS" ? "selected" : ""
                }
                onClick={() => handleMenuClick("RESERVATIONS")}
              >
                RESERVATIONS
              </Link>
            </li>
            <li>
              <Link
                to="/orderOnline"
                className={
                  userContext.selectedMenu === "ORDER ONLINE" ? "selected" : ""
                }
                onClick={() => handleMenuClick("ORDER ONLINE")}
              >
                ORDER ONLINE
              </Link>
            </li>
          </ul>
          <a
            href="javascript:void(0);"
            className={isDropdownMenu ? "menu-icon-show" : "menu-icon-hide"}
          >
            <FaX
              className="faicon close"
              aria-label="close"
              onClick={(e) => displayDropdownMenu(false)}
            ></FaX>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
