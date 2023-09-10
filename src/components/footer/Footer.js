import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import './Footer.scss'

function Footer() {
  return (
    <div className="Footer">
      <div className="container">
        <div className="content">
          <div className="footer-left">
            <h3 className="title">Follow Us</h3>
            <ul className="follow">
              <li className="hover-link center">
                <AiOutlineInstagram />
              </li>
              <li className="hover-link center">
                <AiOutlineFacebook />
              </li>
              <li className="hover-link center">
                <AiOutlineTwitter />
              </li>
              <li className="hover-link center">
                <AiOutlineMail />
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <h3 className="title">Company</h3>
            <ul className="company">
              <li className="hover-link">Contact Us</li>
              <li className="hover-link">Privacy Policy</li>
              <li className="hover-link">Terms & Conditions</li>
              <li className="hover-link">Returns & Exchange Policy</li>
              <li className="hover-link">Shipping Policy</li>
            </ul>
          </div>
        </div>
        <div className="sub-footer">
          <div className="credit-card-img">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
