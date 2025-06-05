import greekSalad from "../assets/images/menu/salads/greek-salad.jpg";
import bruschetta from "../assets/images/menu/appetizers/bruschetta.jpg";
import tiramisu from "../assets/images/menu/dessert/tiramisu.jpg";

import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Specials({ addOrder }) {
  const navigate = useNavigate(null);
  return (
    <section className="specials">
      <div className="specials-title">
        <h2>Specials</h2>
        <button
          aria-label="Order Online"
          onClick={(e) => navigate("/orderOnline")}
        >
          Order Online
        </button>
      </div>
      <div className="card-list">
        <article className="card">
          <img src={greekSalad} alt="greek salad" />
          <div className="card-content">
            <div className="card-header">
              <h4>Greek Salad</h4>
              <h4 className="highlight-text">$ 6.99</h4>
            </div>
            <p>
              A classic Mediterranean dish that showcases the vibrant flavors
              and fresh ingredients typical of Greek cuisine.
            </p>
          </div>
          <button
            type="button"
            aria-labelledby="Order for delivery"
            onClick={(e) =>
              addOrder(
                "Greek Salad",
                1,
                "6.99",
                greekSalad,
                "A classic Mediterranean dish that showcases the vibrant flavors and fresh ingredients typical of Greek cuisine."
              )
            }
          >
            Add&nbsp;&nbsp;&nbsp;
            <FaCartPlus className="faicon" aria-label="cart"></FaCartPlus>
          </button>
        </article>
        <article className="card">
          <img src={bruschetta} />
          <div className="card-content">
            <div className="card-header">
              <h4>Bruschetta</h4>
              <h4 className="highlight-text">$ 5.99</h4>
            </div>
            <p>
              A traditional Italian appetizer that consists of grilled bread
              rubbed with garlic and topped with a variety of ingredients.
            </p>
          </div>
          <button
            type="button"
            aria-labelledby="Order for delivery"
            onClick={(e) =>
              addOrder(
                "Bruschetta",
                1,
                "5.99",
                bruschetta,
                "A traditional Italian appetizer that consists of grilled bread rubbed with garlic and topped with a variety of ingredients."
              )
            }
          >
            Add&nbsp;&nbsp;&nbsp;
            <FaCartPlus className="faicon" aria-label="cart"></FaCartPlus>
          </button>
        </article>
        <article className="card">
          <img src={tiramisu} />
          <div className="card-content">
            <div className="card-header">
              <h4>Tiramisu</h4>
              <h4 className="highlight-text">$ 15:99</h4>
            </div>
            <p>
              A classic Italian dessert made with layers of coffee-soaked
              ladyfingers, mascarpone cheese, and a dusting of cocoa powder.
            </p>
          </div>
          <button
            type="button"
            aria-labelledby="Order for delivery"
            onClick={(e) =>
              addOrder(
                "Tiramisu",
                1,
                "15.99",
                tiramisu,
                "A classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, and a dusting of cocoa powder."
              )
            }
          >
            Add&nbsp;&nbsp;&nbsp;
            <FaCartPlus className="faicon" aria-label="cart"></FaCartPlus>
          </button>
        </article>
      </div>
    </section>
  );
}

export default Specials;
