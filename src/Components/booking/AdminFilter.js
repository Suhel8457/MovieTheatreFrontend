import React, { useState } from "react";
import "./AdminFilter.css";
import axios from "axios";
import ViewAllTicket from "./ViewAllTicket.js";
import ViewSearchedDate from "./ViewSearchedDate.js";
import ViewAllMovieName from "./ViewAllMovieName";
import Footer from "./Footer";
import Header from "./Header";
// import { useNavigate } from "react-router-dom";

function AdminFilter() {
  //   const navigate = useNavigate();
  const [Ticket, setTicket] = useState([]);
  const [showMovie, setShowMovie] = useState(false);
  const [getMovies, setgetMovies] = useState(false);
  const [showMovieDate, setshowMovieDate] = useState(false);
  const [data, setData] = useState({
    id: "",
    moviename: "",
    date: "",
  });

  const handleSubmit = (e) => {
    setgetMovies(false);
    setShowMovie(!showMovie);
    e.preventDefault();
    const userData = {
      id: data.id,
      moviename: data.moviename,
      date: data.date,
    };
    // try {
    //   axios
    //     .get(
    //       `http://localhost:9091/movie/movieName/${userData.moviename}`,
    //       userData
    //     )
    //     .then((response) => {
    //       console.log(response.status);
    //       console.log(response.data);
    //       setTicket(response.data);
    //       setShowMovie(false);
    //       if (response.status !== 200)
    //         alert("No Tickets Available For The Movie " + userData.moviename);
    //       else {
    //         getmovies();
    //         // <ViewAllMovieName moviename={userData.moviename} />;
    //         alert("Login Successful!");
    //       }
    //     });
    // } catch (error) {
    //   if (error.response) {
    //     console.log(error.response);
    //     console.log("Server Responded");
    //   } else if (error.request) {
    //     console.log("Network Error");
    //   } else {
    //     console.log(error);
    //   }
    // }
    // setTimeout(() => {
    //   setgetMovies(true);
    //   setShowMovie(false);
    // }, 1000);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const getallmovies = () => {
    setgetMovies(true);
    setShowMovie(false);
  };

  const searchmoviebynamedate = () => {
    setShowMovie(false);
    setshowMovieDate(true);
  };

  return (
<><Header></Header>
    <div className="admin_filter_main_container">
      <div className="admin_filter_heading">
        <h3>Admin Filter Section</h3>
      </div>
      <div className="admin_filter_search_back">
        <form className="admin_filter_search" onSubmit={handleSubmit}>
          <input
            type="text"
            name="moviename"
            placeholder="Movie Name"
            value={data.moviename}
            onChange={handleChange}
          />
          OR
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={data.date}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="submitButton"
            onClick={searchmoviebynamedate}
          >
            Search
          </button>
          <button type="button" className="viewAll" onClick={getallmovies}>
            View All
          </button>
        </form>
      </div>
      {getMovies ? <ViewAllTicket></ViewAllTicket> : " "}
      {showMovie ? <ViewAllMovieName moviename={data.moviename} /> : " "}
      {showMovieDate ? (
        <ViewSearchedDate moviedate={data.date}></ViewSearchedDate>
      ) : (
        " "
      )}
    <Footer> </Footer>
    </div>
  </>
  );
}

export default AdminFilter;
