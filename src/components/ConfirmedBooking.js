import { useContext, useEffect, useRef } from "react";
import { getTime } from "./utils";
import { UserContext } from "../App";

function ConfirmedBooking({ formData }) {
  const pageRef = useRef(null);
  const userContext = useContext(UserContext);
  useEffect(() => {
    pageRef.current?.scrollIntoView();
    userContext.setSelectedMenu("RESERVATIONS");
  }, []);

  return (
    <section className="confirmation" ref={pageRef}>
      <section className="section-layout">
        <article className="section-header">
          <h2>Booking Confirmation</h2>
          <h3>Your reservation is all set!!!</h3>
          <p>
            See you soon at{" "}
            <strong className="gold-text1">The Golden Table</strong> for an
            amazing dining experience! We are looking forward to welcoming you
            to our restaurant. If you need to make any changes or have any
            questions, please do not hesitate to contact us.
          </p>
        </article>

        <section className="confirm">
          <section className="message">
            <h3>Reservation Details</h3>
            <p>Confirmation No.: XXXXXX</p>
            <h6>SUMMARY</h6>
            <summary className="bordergrey">
              <span>NAME:</span>
              <span>{formData.customerName}</span>
              <span>WHEN:</span>
              <span>
                {formData.date} {getTime(formData.time)}
              </span>
              <span>OCCASION:</span>
              <span>{formData.occasion}</span>
              <span>AREA:</span>
              <span>{formData.area}</span>
              <span>GUESTS:</span>
              <span>{formData.guests}</span>
            </summary>
          </section>
          <section className="terms">
            <h6>TERMS AND CONDITIONS</h6>
            <ul className="term-list">
              <li>Table is reserved for 2 hours.</li>
              <li>
                We will keep your table for 15 minutes after the scheduled time.
              </li>
              <li>
                Please try to be here within that 15 minutes, otherwise, we will
                have to cancel it. Sorry for the inconvenience
              </li>
            </ul>
          </section>
        </section>
      </section>
    </section>
  );
}

export default ConfirmedBooking;
