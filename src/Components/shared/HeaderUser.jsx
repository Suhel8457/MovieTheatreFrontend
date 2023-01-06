import React from "react";
import logo from "../styles/logo.png";
import logo1 from "../styles/logo1.png";
import logo2 from "../styles/logo2.png";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";

export default function HeaderUser({ pass }) {
    var navigate = useNavigate();
    return (
        <div className="header-finalmain">
            <div className="header-main">
                <div className="header-logo">
                    <img src={logo} alt="Italian Trulli" />
                </div>

                <div className="header-logo2">
                    <img src={logo2} alt="Italian Trulli" />
                    <p>&nbsp;Movies</p>
                </div>
                <div className="header-logo1" >
                    <img src={logo1} alt="Italian Trulli" />
                    {/* <a href="/theater">&nbsp;Theaters</a> */}
                    <a style={{ textDecoration: "none", color: "#ffff" }} href="/theater">&nbsp;Theaters</a>
                </div>
                <div >
                    {pass == "ADMIN" ? (
                        <p>
                            <a href="/viewSettings" className="header-admin">
                                Settings
                            </a>
                        </p>
                    ) : (
                        <div className="header-user">
                            <a href="/viewSettings" className="header-admin">
                                Settings
                                {/* <img src={logo1} className="header-logo4"></img> */}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
