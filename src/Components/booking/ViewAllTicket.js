import React from "react";
import { useState, useEffect } from "react";
import "./ViewAllTicket.css";
import axios from "axios";

const ViewAllTicket = () => {
  const [Ticket, setTicket] = useState([]);

  useEffect(() => {
    axios
      .get("https://movies.learn.skillassure.com/movies/getByStatus/RUNNING")
      .then((response) => {
        // axios.get("http://movies.learn.skillassure.com/movies/movieStatus").then((response) => {
        // axios.get("http://localhost:9091/movie/movieStatus").then((response) => {
        setTicket(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="view_all_ticket_container">
      {Ticket.map((data) => {
        return (
          <div className="mainticket">
            {/* {console.log(data)} */}

            <div className="ticketcard">
              <img src={`${data.movieUrl}`}></img>

              <div className="ticketdetails">
                <div className="moviename">
                  {data.movieName}
                  {/* {console.log(data.name)} */}
                </div>
                <div className="moviegenre">{data.movieGenre}</div>
                <div className="movieduration">{data.duration}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewAllTicket;
