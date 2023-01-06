import React from "react";
import { useState, useEffect } from "react";
// import "./ViewSearchedDate.css";
import "./ViewAllTicket.css";
import axios from "axios";

const ViewSearchedDate = ({ moviedate }) => {
  const [showContainer, setShowContainer] = useState(false);
  const [Ticket, setTicket] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9091/movie/date/${moviedate}`)
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
      {Ticket.map((data) => {
        return (
          <div className="mainticket">
            <div className="ticketcard">
              <img src={`${data.url}`}></img>

              <div className="datadetails">
                <div className="moviename">
                  {data.name}
                  {/* {console.log(data.name)} */}
                </div>
                <div className="moviegenre">{data.genre}</div>
                <div className="movieduration">{data.duration}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p id="error"></p>
  );
};

export default ViewSearchedDate;
