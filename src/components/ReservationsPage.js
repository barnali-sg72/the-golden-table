import { getTime } from "./utils";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import restaurant from "../assets/images/restaurant4.jpg";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

function ReservationsPage({ reservations, deleteReservation }) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.setSelectedMenu("RESERVATIONS");
  }, []);
  return (
    <section className="reservation-page">
      <section className="section-layout">
        <article className="section-header">
          <h1>Reservation System</h1>
          <p>
            Plan ahead for a dining experience to remember.{" "}
            <span className="extra">
              Whether it's a special celebration or an intimate night out,
              reserving your table with us ensures that you’ll enjoy the best
              seat in the house. Simply select your preferred date and time, and
              let us handle the rest.
            </span>{" "}
            We look forward to hosting you!
          </p>
          <button
            aria-label="Reserve a table"
            onClick={(e) => navigate("/bookingPage")}
          >
            Reserve a table
          </button>
        </article>
        <div className="section-img">
          <img src={restaurant} alt="restaurant"></img>
        </div>
      </section>
      <section className="list">
        <h2>Reservations</h2>
        <div className="res-table">
          <table className="">
            <thead>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Occasion</th>
              <th>Guests</th>
              <th>Area</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((res, ind) => (
                  <tr key={ind}>
                    <td>{res.customerName}</td>
                    <td>{res.date}</td>
                    <td>{getTime(res.time)}</td>
                    <td>{res.occasion}</td>
                    <td>{res.guests}</td>
                    <td>{res.area}</td>
                    <td>
                      <FaTrash
                        className="faicon"
                        aria-label="Delete Reservation"
                        onClick={() => deleteReservation(ind)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>There are no reservations to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export default ReservationsPage;
