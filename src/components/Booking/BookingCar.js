import React, { useState, useEffect } from "react";
import "./booking.css";
import {
  Button,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Alert,
} from "reactstrap"; 
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingCar({ offer, car, totalRating, avgRating }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reservationStatus, setReservationStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);

  // Calculate total and number of days whenever start or end date changes
  useEffect(() => {
    const calculateTotalAndDays = () => {
      const pricePerDay = car.price_per_day || 0;
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = pricePerDay * days;
      setTotal(totalPrice);
      setNumberOfDays(days);
    };
    calculateTotalAndDays();
  }, [startDate, endDate, car.price_per_day]);

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/reservations/store_car", {
        pickuptime: startDate,
        dropofftime: endDate,
        id: car.id,
        offer_id: offer[0].id,
      });
      console.log("Reservation successful");
      setReservationStatus("success");
    } catch (error) {
      console.error("Error adding Reservation:", error.response);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setReservationStatus("error");
    }
  };

  return (
    <div className="booking">
      {reservationStatus === "success" && (
        <Alert color="success">Reservation successful</Alert>
      )}
      {reservationStatus === "error" && (
        <Alert color="danger">{errorMessage}</Alert>
      )}
      <div className="booking__top d-flex align-items-center justify-align-center justify-between">
        <h3 className="text-xl font-bold">Reservation</h3>
        <span className="tour__rating d-flex align-align-items-center gap-1">
          <i
            className="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>{" "}
          {avgRating === 0 ? null : avgRating}
          {totalRating === 0 ? (
            "Not rated"
          ) : (
            <span>({offer[0].reviews?.length})</span>
          )}
        </span>
      </div>
      <div>
        <Form className="booking__form">
          <div className="booking__info-form">
            <FormGroup>
              <div className="mt-2 flex">
                <div className="w-1/2 mr-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Start Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="yyyy-MM-dd HH:mm"
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="bg-gray-200 text-gray-700  focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    End Date
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    showTimeSelect 
                    timeFormat="HH:mm"
                    dateFormat="yyyy-MM-dd HH:mm"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
              </div>
              <div className="booking__bottom">
                <ListGroup>
                  <ListGroupItem className="border-0 px-0">
                    <h3 className="text-xl font-bold d-flex align-items-center gap-1">
                      Price per day
                    </h3>
                    <span>{car.price_per_day} DH</span>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 px-0">
                    <h3 className="text-xl font-bold"> Number of days</h3>
                    <span>{numberOfDays} Days</span>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 px-0">
                    <h3 className="text-xl font-bold">Total</h3>
                    <span>{total}DH</span>
                  </ListGroupItem>
                </ListGroup>
              </div>
              <div className="mt-8">
                <button onClick={handleReservation} className="bg-blue-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700">Reserve</button>
              </div>
            </FormGroup>
          </div>
        </Form>
      </div>
    </div>
  );
}
