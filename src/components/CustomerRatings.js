import Avatar from "react-avatar";
import Rating from "./Rating";

function CustomerRatings() {
  return (
    <section className="ratings">
      <h2>Testimonials</h2>
      <div className="card-list">
        <article className="cust-card">
          <div className="rating">
            <Rating num={5} />
          </div>
          <div className="cust-details">
            <Avatar
              className="cust-avatar"
              name="John Doe"
              alt="John Doe"
            ></Avatar>
            <h4>John Doe</h4>
          </div>
          <p>
            I have had the best experience of my life at this restaurant. I will
            go back there soon.
          </p>
        </article>
        <article className="cust-card">
          <div className="rating">
            <Rating num={4} />
          </div>
          <div className="cust-details">
            <Avatar
              className="cust-avatar"
              name="Paul Smith"
              alt="Paul Smith"
            ></Avatar>
            <h4>Paul Smith</h4>
          </div>
          <p>I like the food at this restaurant and enjoy the ambience.</p>
        </article>
        <article className="cust-card">
          <div className="rating">
            <Rating num={5} />
          </div>
          <div className="cust-details">
            <Avatar
              className="cust-avatar"
              name="Mary Kessler"
              alt="Mary Kessler"
            ></Avatar>
            <h4>Mary Kessler</h4>
          </div>
          <p>Love the food and the online order services.</p>
        </article>
        <article className="cust-card">
          <div className="rating">
            <Rating num={3} />
          </div>
          <div className="cust-details">
            <Avatar
              className="cust-avatar"
              name="Ross Anderson"
              alt="Ross Anderson"
            ></Avatar>
            <h4>Ross Anderson</h4>
          </div>
          <p>Food is ok but it does not have much vegan options.</p>
        </article>
      </div>
    </section>
  );
}

export default CustomerRatings;
