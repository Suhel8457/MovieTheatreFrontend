import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
// import Delete from "./Delete";
// import MainContainer from "./MainContainer";
import Moviecard from "../movie/Moviecard";
import Navbar from "../shared/Navbar";
import "../../../src/App.css";
import { Route } from "react-router-dom";
import MovieOptions from "../button/MovieOptions";
import HeaderUser from "../shared/HeaderUser";
import axios from "axios";
import baseUrl from "../environment/baseUrl";

function MainUser() {
    const [movieStatus, setMovieStatus] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        handleProfileSettings();
    }, []);
    async function handleProfileSettings(e) {
        const response = await axios.get(
            `${baseUrl}/user/settings/${localStorage.getItem(
                "email"
            )}/${localStorage.getItem("password")}`
        );
        console.log(response.data);
        console.log(response.data.role);
        setRole(response.data.role);
        // localStorage.setItem("firstName",response.data.firstName);
        // localStorage.setItem("lastName",response.data.lastName);
        // localStorage.setItem("mobileNumber",response.data.mobileNumber);
        // localStorage.setItem("gender",response.data.gender);
    }
    const role1 = role;
    return (
        <div className="main-container">
            <div className="main-Container-head">
                <HeaderUser pass={role1} />
            </div>
            <div className="main-Container-nav">
                <Navbar
                    setSearchInput={setSearchInput}
                    searchInput={searchInput}
                    setMovieStatus={setMovieStatus}
                    movieStatus={movieStatus}
                />
            </div>

            <MovieOptions
                add={role1}
                setMovieStatus={setMovieStatus}
                movieStatus={movieStatus}
            />
            {/* <DeleteButton/> */}
            <Moviecard movieStatus={movieStatus} add={role1} />

            <Footer />
        </div>
    );
}

export default MainUser;
