import React, { useState } from "react";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
// import Delete from "./Delete";
// import MainContainer from "./MainContainer";
import Moviecard from "../movie/Moviecard";
import Navbar from "../shared/Navbar";
import "../../../src/App.css";
import { Route } from "react-router-dom";
import MovieOptions from "../button/MovieOptions";

function Main(role) {
    const [movieStatus, setMovieStatus] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    const role1 = "ADMIN";
    return (
        <div className="main-container">
            <div className="main-Container-head">
                <Header pass={role1} />
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

export default Main;
