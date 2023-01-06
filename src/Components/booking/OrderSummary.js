import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderSummary.css";
import { Link } from "react-router-dom";
import Header from "./Header"

function OrderSummary() {
  const [APIData, setAPIData] = useState([]);
  const [TheaterData, setTheaterData] = useState([]);
  const [MovieData, setMovieData] = useState([[]]);
  const [BookingData, setBookingData] = useState([[]]);
  useEffect(() => {
    // axios.get(`http://booking.learn.skillassure.com/`).then((response) => {
      axios.get(`http://booking.learn.skillassure.com/booking`).then((response) => {
      setBookingData(response.data);
    });
  }, []);
  function deleteTicket() {
    console.log("Delete");
    axios.delete(
      `http://booking.learn.skillassure.com/booking/${BookingData[BookingData.length - 1].id}`
    );
  }
  useEffect(() => {
      axios.get(`https://booking.learn.skillassure.com/seat`).then((response) => {
        // axios.get(`http://localhost:9091/seat/`).then((response) => {
      setAPIData(response.data);
    });
    // axios.get(`http://localhost:9091/theatre`).then((response) => {
      axios.get(`https://theater.learn.skillassure.com/theater/theater/All`).then((response) => {
      setTheaterData(response.data);
    });
    // axios.get(`http://localhost:9091/movie`).then((response) => {
      axios.get(`https://movies.learn.skillassure.com/movies`).then((response) => {
      setMovieData(response.data);
    });
  }, []);
  return (
    <div className="order_summary_main_container">
      {/* <div> */}
      <div className="order_summary_main_top">
        <div className="order_summary_heading">
          <h4>Order Summary</h4>
        </div>
        <div className="order_summary_ticket">
          <div className="order_summary_ticket_number">
            <h3>{APIData.length}</h3>
          </div>
          <div className="order_summary_ticket_heading">
            <h6>Tickets</h6>
          </div>
        </div>
      </div>
      <div className="order_summary_movie_details">
        <div className="order_summary_movie_name">
          <h6>{MovieData[0]?.movieName}</h6>
        </div>
        <div className="order_summary_movie_language">
          {/* <h6>{MovieData[0].language}</h6> */}
          {/* Language To Be Displayed */}
          <h6>{MovieData[0]?.movieCode}</h6>
        </div>
        <div className="order_summary_theater_address">
          <h6>{TheaterData[0]?.name}</h6>
        </div>
        <div className="order_summary_theater_address">
          <h6>M-Ticket</h6>
        </div>
        <div className="order_summary_seat_details">
          <h6>
            {APIData.filter((data) => data.rowId > 8).map((data) => data.rowId)
              .length > 0
              ? "PREMIUM: " +
                APIData.filter((data) => data.rowId > 8).map(
                  (data) => `${data.name}`
                )
              : ""}
            {APIData.filter((data) => data.rowId >= 5 && data.rowId < 8).map(
              (data) => data.rowId
            ).length > 0
              ? "GOLD: " +
                APIData.filter((data) => data.rowId >= 5 && data.rowId < 8).map(
                  (data) => `${data.name}`
                )
              : ""}
            {APIData.filter((data) => data.rowId < 5).map((data) => data.rowId)
              .length > 0
              ? "NORMAL: " +
                APIData.filter((data) => data.rowId < 5).map(
                  (data) => `${data.name}`
                )
              : ""}
          </h6>
          <h6>Thu, 17 Nov, 2022</h6>
          <h6>09:00 PM</h6>
        </div>
      </div>
      <div className="order_summary_sub_total">
        <h6>Sub Total</h6>
        <h6>
          Rs.
          {APIData.filter((data) => data.rowId < 2)
            .map((data) => data.price)
            .reduce((a, c) => a + c, 0) +
            APIData.filter((data) => data.rowId >= 2 && data.rowId < 5)
              .map((data) => data.price)
              .reduce((a, c) => a + c, 0) +
            APIData.filter((data) => data.rowId >= 5)
              .map((data) => data.price)
              .reduce((a, c) => a + c, 0)}
        </h6>
      </div>
      <div className="order_summary_main_convenience_fees">
        <h6>+ Convenience fees</h6>
        <h6>
          Rs.{" "}
          {(APIData.length * 100 * 0.25 + APIData.length * 100 * 0.28).toFixed(
            1
          )}
        </h6>
      </div>
      <div className="order_summary_main_amount_payable">
        <h6>Amount Payable</h6>
        <h6>
          Rs.{" "}
          {APIData.length * 100 * 0.25 +
            APIData.length * 100 * 0.18 +
            APIData.filter((data) => data.rowId < 2)
              .map((data) => data.price)
              .reduce((a, c) => a + c, 0) +
            APIData.filter((data) => data.rowId >= 2 && data.rowId < 5)
              .map((data) => data.price)
              .reduce((a, c) => a + c, 0) +
            APIData.filter((data) => data.rowId >= 5)
              .map((data) => data.price)
              .reduce((a, c) => a + c, 0) +
            2}
        </h6>
      </div>
      <Link to="/">
        <button type="button" className="buttonClassCancel" onClick={deleteTicket}>
          Cancel
        </button>
      </Link>
    </div>
  );
}

export default OrderSummary;
