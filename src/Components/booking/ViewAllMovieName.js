import React from "react";
import { useState, useEffect } from "react";
// import "./ViewAllMovieName.css";
import "./ViewAllTicket.css";
import axios from "axios";

const ViewAllMovieName = ({ moviename }) => {
  const [Ticket, setTicket] = useState([]);
  const [showContainer, setShowContainer] = useState(false);

  useEffect(() => {
      // .get(`http://localhost:9091/movie/movieName/${moviename}`)
      axios.get(`https://movies.learn.skillassure.com/movies/getByName/${moviename}`)
      .then((response) => {
        setTicket(response.data);
        console.log(response);
        if (response.status !== 200) {
          document.getElementById("error").innerHTML = response.data;
          //   alert(response.data);
          setShowContainer(false);  
        } else {
          setShowContainer(true);
          //   <ViewAllMovieName moviename={userData.moviename} />;
          //   alert("Login Successful!");
        }
      });
  }, []);

  return showContainer ? (
    <div className="view_all_ticket_container">
      <div className="mainticket">
        <div className="ticketcard">
          <img src={`${Ticket.movieUrl}`}></img>
          <div className="ticketdetails">
            <div className="moviename">{Ticket.movieName}</div>
            <div className="moviegenre">{Ticket.movieGenre}</div>
            <div className="movieduration">{Ticket.duration}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p id="error"></p>
  );
};

export default ViewAllMovieName;
