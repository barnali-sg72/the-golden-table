import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/bookingPage");
  };

  return (
    <section className="hero section-layout">
      <article className="section-header">
        <h1 className="gradient-text">The Golden Table</h1>
        <h2>San Francisco</h2>
        <h3>
          <strong>Fresh. Flavorful. Unforgettable.</strong>
        </h3>
        <p>
          Taste the difference with our chef-crafted dishes made from the finest
          ingredients.
        </p>
        <button aria-label="Reserve a table" onClick={handleClick}>
          Reserve a table
        </button>
        <button
          aria-label="Order Now"
          className="order secondary"
          onClick={() => navigate("/menu")}
        >
          Order Now
        </button>
      </article>
      {/*<div className="section-img">
        <img src={food} alt="food"></img>
      </div>*/}
    </section>
  );
}

export default CallToAction;
