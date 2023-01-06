import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Buttons.css";
import Main from "../main/Main";
import AddMovie from "../addmovie/AddMovie";
import Adminschedule from "../AdminSchedule/Adminschedule";

export default function MovieOptions({ setMovieStatus, add }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [addSchedule, setAddSchedule] = useState(false);
    const [addbtn, setaddbtn] = useState(true);
    const navigate = useNavigate();

    const [allMovies, setAllMovies] = useState(true);
    const [upComingMovies, setUpcomingMovies] = useState(false);
    const [runningMovies, setRunningMovies] = useState(false);

    function schedulePage() {
        navigate("/adminSchedule");
    }
    const all = () => {
        // event.preventDefault();
        setAllMovies(true);
        setUpcomingMovies(false);
        setRunningMovies(false);
    };

    const upcoming = () => {
        // event.preventDefault();
        setAllMovies(false);
        setUpcomingMovies(true);
        setRunningMovies(false);
    };

    const running = () => {
        // event.preventDefault();
        setAllMovies(false);
        setUpcomingMovies(false);
        setRunningMovies(true);
    };

    return (
        <div>
            <form>
                <div className="movie-mainbuttons">
                    <div className="movie-buttons">
                        <button
                            className="movie-btn"
                            onClick={() => {
                                setMovieStatus("");
                                // all();
                            }}
                            style={{
                                backgroundColor: allMovies ? "#EB4E62" : "",
                                color: allMovies ? "white" : "",
                            }}
                        >
                            All Movies
                        </button>

                        <button
                            className="movie-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                setMovieStatus("getByStatus/RUNNING");
                                running();
                            }}
                            style={{
                                backgroundColor: runningMovies ? "#EB4E62" : "",
                                color: runningMovies ? "white" : "",
                            }}
                        >
                            Running Movies
                        </button>

                        <button
                            className="movie-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                setMovieStatus("getByStatus/UPCOMING");
                                upcoming();
                            }}
                            style={{
                                backgroundColor: upComingMovies
                                    ? "#EB4E62"
                                    : "",
                                color: upComingMovies ? "white" : "",
                            }}
                        >
                            Upcoming Movies
                        </button>
                        <button
                            className="movie-btn"
                            onClick={(e) => {
                                navigate("/foodAndBeveragesdefault")
                            }}
                            style={{
                                backgroundColor: upComingMovies
                                    ? "#EB4E62"
                                    : "",
                                color: upComingMovies ? "white" : "",
                            }}
                        >
                            Food and Beverages
                        </button>
                    </div>
                    <div className="movie-addbutton">
                        {add == "ADMIN" ? (
                            <p>
                                <button
                                    className="movie-addbtn"
                                    onClick={(e) => {
                                        {
                                            e.preventDefault();
                                            setModalOpen(true);
                                        }
                                    }}
                                >
                                    Add Movies
                                </button>
                            </p>
                        ) : null}
                    </div>
                    <div className="movie-schedulebutton">
                        {add == "ADMIN" ? (
                            <p>

                                <button
                                    className="movie-schedulebtn"
                                    onClick={() => {
                                        schedulePage();
                                    }}
                                >
                                    Add Schedule
                                </button>

                            </p>
                        ) : null}
                    </div>
                    {modalOpen && <AddMovie setModalOpen={setModalOpen} />}
                    {addSchedule && <Adminschedule addSchedule={addSchedule} />}
                </div>
            </form>
        </div>
    );
}
