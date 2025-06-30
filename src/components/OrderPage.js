import { FaX } from "react-icons/fa6";
import phone from "../assets/images/phone4.png";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, UserContext } from "../App";

export const CalculateTotal = (order) => {
  let total = 0.0;
  if (order !== null && order !== undefined) {
    order.items.forEach((element) => {
      total += parseFloat(element.price) * element.quantity;
    });
  }

  return total;
};
export default function OrderPage({ order, updateOrder, deleteOrder }) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.setSelectedMenu("ORDER ONLINE");
    userContext.setUser(getLoggedUser());
  }, []);

  const handleOnQuantityChange = (e, name) => {
    const val = e.target.value;
    updateOrder(name, val);
  };

  const handleCheckOut = () => {
    if (getLoggedUser() === undefined || getLoggedUser() === null) {
      alert("Please sign in to place your order");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <section className="order-page">
      <section className="section-layout">
        <article className="section-header">
          <h1>Order Online</h1>
          <p>
            Browse our menu, customize dishes to your taste, and add your
            selections to your cart. We offer a range of options including
            appetizers, entrées, sides, desserts, and beverages—each crafted
            with fresh ingredients and a passion for flavor.
          </p>
          <button aria-label="AddToOrder" onClick={(e) => navigate("/menu")}>
            Add to order
          </button>
        </article>
        {/*<svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="order">
              <circle cx="100%" cy="50%" r="300" fill="#FFFFFF" />
            </clipPath>
          </defs>

          
        </svg>*/}
        <img className="phone" src={phone} alt="phone" loading="lazy"></img>
        <div className="section-img"></div>
      </section>

      <section className="list bg-lightgrey">
        <h2>Orders</h2>
        <div className="ord-table">
          {order !== null && order !== undefined && order.items.length > 0 ? (
            order.items.map((ord, ind) => (
              <article key={ind} className="item-card">
                <div className="item-image">
                  <img alt={ord.image} src={ord.image} loading="lazy" />
                </div>
                <div className="item-desc">
                  <h4>{ord.item}</h4>
                  <p>{ord.description}</p>
                </div>

                <FaX
                  className="faicon trash"
                  aria-label="Delete Order"
                  onClick={() => deleteOrder(ord.item)}
                />
                <div className="qty">
                  <label>Qty:&nbsp;&nbsp;&nbsp;</label>
                  <select
                    name={"quantity-" + ind}
                    value={ord.quantity}
                    onChange={(e) => handleOnQuantityChange(e, ord.item)}
                  >
                    <option key="1" value="1">
                      1
                    </option>
                    <option key="2" value="2">
                      2
                    </option>
                    <option key="3" value="3">
                      3
                    </option>
                    <option key="4" value="4">
                      4
                    </option>
                    <option key="5" value="5">
                      5
                    </option>
                    <option key="6" value="6">
                      6
                    </option>
                    <option key="7" value="7">
                      7
                    </option>
                    <option key="8" value="8">
                      8
                    </option>
                    <option key="9" value="9">
                      9
                    </option>
                    <option key="10" value="10">
                      10
                    </option>
                  </select>
                </div>

                <p className="price">
                  <span className="price-label">Price: </span>$ {ord.price}
                </p>
              </article>
            ))
          ) : (
            <h4>There are no orders to display</h4>
          )}
          <p className="total">
            Total: $ {parseFloat(CalculateTotal(order)).toFixed(2)}
          </p>
        </div>
        <div className="buttons">
          <button
            aria-label="Checkout"
            disabled={
              order === null || order === undefined || order.items.length === 0
            }
            onClick={handleCheckOut}
          >
            Checkout
          </button>
          <button
            className="tertiary"
            aria-label="Cancel Order"
            disabled={
              order === null || order === undefined || order.items.length === 0
            }
            onClick={(e) => navigate("/bookingPage")}
          >
            Cancel Order
          </button>
        </div>
      </section>
    </section>
  );
}
