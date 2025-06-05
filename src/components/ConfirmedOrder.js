import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";

function ConfirmedOrder({ orderData }) {
  const pageRef = useRef(null);
  const userContext = useContext(UserContext);
  useEffect(() => {
    pageRef.current?.scrollIntoView();
    userContext.setSelectedMenu("ORDER ONLINE");
  }, []);

  return (
    <section className="orderconf" ref={pageRef}>
      <section className="section-layout">
        <article className="section-header">
          <h2>Order Confirmation</h2>
          <h3>Your order is confirmed!!!</h3>
          <p>
            Thank you for placing your order with{" "}
            <strong className="gold-text">The Golden Table</strong>! We’ve
            received your order and are preparing it with care. If you have any
            questions, please do not hesitate to contact us. We can’t wait for
            you to enjoy your meal!
          </p>
        </article>

        <section className="confirm">
          <section className="message">
            <h3>Confirmation Details</h3>
            <p>Confirmation No. : XXXXXX</p>
            <h6>SUMMARY</h6>
            <summary className="bordergrey">
              <section>
                <span>NAME:</span>
                <span>{orderData.name}</span>
                <span>DATE:</span>
                <span>{orderData.date}</span>
                <span>TIME:</span>
                <span>{orderData.time}</span>
                <span>DISPATCH:</span>
                <span>{orderData.mode}</span>
              </section>
              <table>
                <thead>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </thead>
                <tbody>
                  {orderData.items !== undefined &&
                  (orderData.items !== null) & (orderData.items.length > 0) ? (
                    <>
                      {orderData.items.map((ord, ind) => (
                        <tr key={ind}>
                          <td>{ord.item}</td>
                          <td>{ord.quantity}</td>
                          <td>$ {ord.price}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </summary>
          </section>
        </section>
      </section>
    </section>
  );
}

export default ConfirmedOrder;
