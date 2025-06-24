import logo from "../assets/images/logos/img3.png";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareTwitter,
  FaSquarePinterest,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <div className="footer-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="footer-item">
          <h6>DOORMAT NAVIGATION</h6>
          <ul>
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="#">ABOUT</a>
            </li>
            <li>
              <a href="#">MENU</a>
            </li>
            <li>
              <a href="/reservations">RESERVATIONS</a>
            </li>
            <li>
              <a href="#">ORDER ONLINE</a>
            </li>
            <li>
              <a href="#">LOGIN</a>
            </li>
          </ul>
        </div>
        <div className="footer-item">
          <h6>CONTACT</h6>
          <dl class="contact-list">
            <dt>ADDRESS</dt>
            <dd>123 South Lake Avenue, San Francisco, USA</dd>
            <dt>EMAIL</dt>
            <dd>
              <a href="mailto:#">thegoldentable@gmail.com</a>
            </dd>
            <dt>PHONE</dt>
            <dd>
              <a href="tel:#">1.415.619.322</a>
            </dd>
          </dl>
        </div>
        <div className="footer-item">
          <h6>SOCIAL MEDIA</h6>
          <ul className="social">
            <li>
              <a href="http://www.facebook.com" target="_blank">
                <FaSquareFacebook
                  className="faicon facebook"
                  aria-label="facebook"
                />
              </a>
            </li>
            <li>
              <a href="http://www.linkedin.com" target="_blank">
                <FaLinkedin className="faicon linkedin" aria-label="linkedin" />
              </a>
            </li>
            <li>
              <a href="http://www.twitter.com" target="_blank">
                <FaSquareTwitter
                  className="faicon twitter"
                  aria-label="twitter"
                />
              </a>
            </li>
            <li>
              <a href="http://www.pinterest.com" target="_blank">
                <FaSquarePinterest
                  className="faicon pinterest"
                  aria-label="pinterest"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="copyright">@Copyright The Golden Table Inc.</p>
    </footer>
  );
}

export default Footer;
