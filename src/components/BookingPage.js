import BookingForm from "./BookingForm";

import image1 from "../assets/images/restaurant17.jpg";
import image2 from "../assets/images/restaurant18.jpg";
import image3 from "../assets/images/restaurant19.jpg";

import { useContext, useEffect, useState } from "react";

import { UserContext } from "../App";

function BookingPage({ availableTimes, dispatch, submitForm }) {
  const [bookingData, setBookingData] = useState({
    customerName: "",
    date: "",
    time: "",
    guests: 0,
    occasion: "",
    area: "",
  });

  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.setSelectedMenu("RESERVATIONS");
  }, []);

  const handleChange = (e) => {
    let name = e.currentTarget.name;
    let val = e.currentTarget.value;
    setBookingData({ ...bookingData, [name]: val });
    if (name === "date") {
      dispatch(val);
    }
  };

  const handleDateChange = (e) => {
    let name = e.currentTarget.name;
    let val = e.currentTarget.value;
    if (name === "date") {
      dispatch(val);
    }
  };

  /*const onSubmit = (e) => {
        e.preventDefault();
        submitForm(bookingData);
    }*/

  return (
    <section className="booking">
      <section className="section-layout">
        <article className="section-header">
          {/*<img alt="table-icon" src={table}></img>*/}
          <h1>Reserve a Table </h1>
        </article>
      </section>
      <section className="header-layout">
        <h2>
          <strong>Welcome to our table reservation system!</strong>
        </h2>
        <p>
          Booking a table at our restaurant is quick and easy. Simply select
          your preferred date, time, and party size, and we'll take care of the
          rest. If you have any special requests or need assistance, don't
          hesitate to reach out. Our team is here to ensure you have an
          unforgettable dining experience.
        </p>
      </section>

      <section className="booking-layout bg-lightgrey">
        <BookingForm
          bookingData={bookingData}
          availableTimes={availableTimes}
          handleDateChange={handleDateChange}
          submitForm={submitForm}
        />
        <div className="images">
          <div className="img1">
            <img src={image1} alt="Food Served" loading="lazy"></img>
          </div>
          <div className="img2">
            <img src={image2} alt="Dining Area" loading="lazy"></img>
          </div>
          <div className="img3">
            <img src={image3} alt="Dining Experience" loading="lazy"></img>
          </div>

          {/*<img className="img4" src={image4} alt="image4"></img>*/}
        </div>
      </section>
    </section>
  );
}

export default BookingPage;
