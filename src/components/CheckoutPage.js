import { FaCcVisa, FaCcAmex, FaCcMastercard } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { MdError } from "react-icons/md";
import { CalculateTotal } from "./OrderPage";
import { getLoggedUser } from "../App";
import pickup from "../assets/images/icons/pickup3.png";
import delivery from "../assets/images/icons/delivery3.png";

export default function CheckoutPage({
  order,
  updateOrder,
  deleteOrder,
  submitOrderForm,
}) {
  const [mode, setMode] = useState("pickup");
  const times = [
    "5:00 pm",
    "5:30 pm",
    "6:00 pm",
    "6:30 pm",
    "7:00 pm",
    "7:30 pm",
    "8:00 pm",
    "8:30 pm",
    "9:00 pm",
    "9:30 pm",
    "10:00 pm",
  ];
  const user = getLoggedUser();
  //const [orderData, setOrderData] = useState({
  const orderData = {
    name:
      user !== null && user !== undefined
        ? user.firstname + " " + user.lastname
        : "",
    date: "",
    time: "",
    mode: "pickup",
    email: user !== null && user !== undefined ? user.useremail : "",
    phone: user !== null && user !== undefined ? user.userphone : "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    ccname: "",
    ccn: "",
    expdate: "",
    cvc: "",
  };

  useEffect(() => {
    console.log(orderData);
  }, [orderData, mode]);

  const iconStyles = {
    color: "red",
    backgroundColor: "white",
    fontSize: "1.5em",
    borderRadius: "10px",
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const curr = today;
  curr.setDate(1);

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z ]*$/, "Please enter a valid name")
      .min(8, "Please enter at least 8 characters!")
      .max(50, "Please enter maximun 50 characters!")
      .required("Customer name is required. Please provide a valid name"),
    date: Yup.date()
      .min(today, "Please select any date starting from today")
      .required(
        "Date is required. Please select a valid date starting from today"
      ),
    time: Yup.string().required("Time is required. Please select a valid time"),
    phone: Yup.string()
      .matches(
        /^\(([0-9]{3})\) ([0-9]{3})-([0-9]{4})$/,
        "Phone number is not valid"
      )
      .required(
        "Phone number is required. Please provide a valid phone number"
      ),
    email: Yup.string()
      .email()
      .required("Email is required. Please enter a valid email address"),
    street: Yup.string().required(
      "Street is required. Please provide a valid street name"
    ),
    city: Yup.string().required(
      "City is required. Please provide a valid city name"
    ),
    state: Yup.string().required(
      "State is required. Please provide a valid state name"
    ),
    zipcode: Yup.string()
      .matches(/^([0-9]{5})$/, "Please enter a valid zipcode")
      .required("Zipcode is required. Please provide a valid zipcode"),
    ccname: Yup.string()
      .matches(/^[a-zA-Z ]*$/, "Please enter a valid name")
      .required("Credit Card Name is required. Please provide a valid name"),
    ccn: Yup.string()
      .matches(
        /^((([0-9]{4}) ){3})([0-9]{4})$/,
        "Credit Card number is not valid"
      )
      .required(
        "Credit Card Number is required. Please provide a valid number"
      ),
    cvc: Yup.string().required(
      "Security Code is required. Please provide a valid code"
    ),
    expdate: Yup.date()
      /*.test({
                name: 'valid date',
                test(value, ctx) {
                    let mon = value.split('-')[1];
                    let year = value.split('-')[0];
                    if (year >= curryear)
                }
            })*/
      .min(curr, "Expiry date cannot be in the past")
      .required("Expiry date is required. Please provide a valid expiry date"),
  });

  /*const handleOnQuantityChange = (e, name) => {
    const val = e.target.value;
    updateOrder(name, val);
  };*/

  const onPhoneBlur = (e, fn1, fn2, touched, values) => {
    const val = e.target.value;
    let newval = "";
    let rem = "";
    if (
      val &&
      val.length === 10 &&
      !val.match(/^\(([0-9]{3})\) ([0-9]{3})-([0-9]{4})$/)
    ) {
      newval = "(" + val.slice(0, 3) + ") ";
      rem = val.slice(3);
      newval += rem.slice(0, 3) + "-";
      rem = rem.slice(3);
      newval += rem;
      //setOrderData({...orderData, ccn: newval} );
      //alert(newval);
      fn1("phone", newval);
      values.phone = newval;
      touched.phone = false;
    }
    fn2(e);
  };

  const onCcnBlur = (e, fn1, fn2, touched, values) => {
    const val = e.target.value;
    let newval = "";
    let rem = "";
    if (
      val &&
      val.length === 16 &&
      !val.match(/^(([0-9]{4}) ){3}([0-9]{4})$/)
    ) {
      newval = val.slice(0, 4) + " ";
      rem = val.slice(4);
      newval += rem.slice(0, 4) + " ";
      rem = rem.slice(4);
      newval += rem.slice(0, 4) + " ";
      rem = rem.slice(4);
      newval += rem;
      //setOrderData({...orderData, ccn: newval} );
      //alert(newval);
      fn1("ccn", newval);
      values.ccn = newval;
      touched.ccn = false;
    }
    fn2(e);
  };

  const onModeChange = (e, fn) => {
    setMode(e.target.value);
    fn(e);
  };

  const getTotal = () => {
    let tax = parseFloat((CalculateTotal(order) * 0.15).toFixed(2));
    let delivery = 10.0;
    let total =
      parseFloat(CalculateTotal(order)) +
      tax +
      (mode === "delivery" ? delivery : 0);
    return total.toFixed(2);
  };

  return (
    <section className="checkout">
      <section className="section-layout">
        {/*<div className="section-img">
          <img src={image1} alt="image1"></img>
        </div>*/}
        <article className="section-header">
          <h1>Order Checkout</h1>
          {/*<p>
            You're just a few steps away from enjoying your delicious meal!
            Please review your order details below and choose your preferred
            payment and delivery options. We’ve made it quick, secure, and easy
            for you to checkout.
          </p>*/}
        </article>
        {/*<div className="section-img">
          <img src={image2} alt="image2"></img>
        </div>*/}
        {/*<div className="section-img">
          <img src={restaurant} alt="restaurant"></img>
        </div>*/}
      </section>
      <h2>ORDER DETAILS</h2>
      <p className="ord-msg">
        You're just a few steps away from enjoying your delicious meal! Please
        review your order details below and choose your preferred payment and
        delivery options. We’ve made it quick, secure, and easy for you to
        checkout.
      </p>
      <section className="summary bg-lightgrey">
        <section className="leftcol">
          <h3>Please fill up the form below:</h3>
          <Formik
            initialValues={orderData}
            validateOnMount={true}
            validationSchema={FormSchema}
            onSubmit={(values) => {
              submitOrderForm(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              isSubmitting,
              touched,
              values,
              formProps,
              isValid,
              dirty,
              validate,
              validateForm,
            }) => (
              <form
                name="order-form"
                aria-label="order-form"
                onSubmit={handleSubmit}
              >
                <section className="checkout-section">
                  <h4>Order Information</h4>
                  <section className="detail">
                    <div className="delmode">
                      <span>
                        <input
                          type="radio"
                          id="pickup"
                          value="pickup"
                          name="mode"
                          aria-label="Pickup"
                          checked={values.mode === "pickup"}
                          onChange={(e) => onModeChange(e, handleChange)}
                          onBlur={handleBlur}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </span>
                      <span className="pickup">
                        <label htmlFor="pickup">
                          Pickup{" "}
                          <img alt="pickup" loading="lazy" src={pickup}></img>
                        </label>
                      </span>
                      <span>
                        <input
                          type="radio"
                          id="delivery"
                          value="delivery"
                          name="mode"
                          aria-label="Delivery"
                          checked={values.mode === "delivery"}
                          onChange={(e) => onModeChange(e, handleChange)}
                          onBlur={handleBlur}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </span>
                      <span className="delivery">
                        <label htmlFor="delivery">
                          Delivery{" "}
                          <img
                            alt="delivery"
                            loading="lazy"
                            src={delivery}
                          ></img>
                        </label>
                      </span>
                    </div>
                    <div className="fields">
                      <label htmlFor="name">Name:</label>
                      <div className="entry">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.name && errors.name ? (
                          <div data-testid="nameError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.name}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="fields">
                      <label htmlFor="date">Date:</label>
                      <div className="entry">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={values.date}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.date && errors.date ? (
                          <div data-testid="dateError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.date}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="fields">
                      <label htmlFor="time">Choose time:</label>
                      <div className="entry">
                        <select
                          id="time"
                          name="time"
                          value={values.time}
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select a time
                          </option>
                          {times.map((hr, ind) => (
                            <option key={ind} value={hr}>
                              {hr}
                            </option>
                          ))}
                        </select>
                        {touched.time && errors.time ? (
                          <div data-testid="timeError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.time}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </section>
                </section>
                <section className="checkout-section">
                  <h4>Contact Information</h4>
                  <section className="contact">
                    <div className="fields">
                      <label htmlFor="email">Email:</label>
                      <div className="entry">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.email && errors.email ? (
                          <div data-testid="emailError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.email}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="fields">
                      <label htmlFor="phone">Phone:</label>
                      <div className="entry">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          placeholder="(XXX) XXX-XXXX"
                          //pattern="([1-9]{3}) ([0-9]{3})-([0-9]{4})"
                          value={values.phone}
                          onBlur={(e) =>
                            onPhoneBlur(
                              e,
                              setFieldValue,
                              handleBlur,
                              touched,
                              values
                            )
                          }
                          onChange={handleChange}
                        />
                        {touched.phone && errors.phone ? (
                          <div data-testid="phoneError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.phone}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <label className="addr">Address:</label>
                    <div className="address">
                      <div className="fields">
                        <label htmlFor="street">Street:</label>
                        <div className="entry">
                          <input
                            type="text"
                            name="street"
                            id="street"
                            value={values.street}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.street && errors.street ? (
                            <div data-testid="streetError" className="error">
                              <span>
                                <MdError style={iconStyles} />
                              </span>
                              <span className="msg">{errors.street}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="fields">
                        <label htmlFor="city">City:</label>
                        <div className="entry">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={values.city}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.city && errors.city ? (
                            <div data-testid="cityError" className="error">
                              <span>
                                <MdError style={iconStyles} />
                              </span>
                              <span className="msg">{errors.city}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="fields">
                        <label htmlFor="state">State:</label>
                        <div className="entry">
                          <input
                            type="text"
                            name="state"
                            id="state"
                            value={values.state}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.state && errors.state ? (
                            <div data-testid="stateError" className="error">
                              <span>
                                <MdError style={iconStyles} />
                              </span>
                              <span className="msg">{errors.state}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="fields">
                        <label htmlFor="zipcode">Zipcode:</label>
                        <div className="entry">
                          <input
                            type="text"
                            name="zipcode"
                            id="zipcode"
                            pattern="\d{5}"
                            value={values.zipcode}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.zipcode && errors.zipcode ? (
                            <div data-testid="zipcodeError" className="error">
                              <span>
                                <MdError style={iconStyles} />
                              </span>
                              <span className="msg">{errors.zipcode}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
                <section className="checkout-section">
                  <h4>
                    <span>Payment Information</span>
                    <span>
                      <FaCcVisa className="faicon" aria-label="cart"></FaCcVisa>
                      <FaCcMastercard
                        className="faicon"
                        aria-label="cart"
                      ></FaCcMastercard>
                      <FaCcAmex className="faicon" aria-label="cart"></FaCcAmex>
                    </span>
                  </h4>

                  <section className="payment">
                    <div className="fields">
                      <label htmlFor="ccname">Card Holder:</label>
                      <div className="entry">
                        <input
                          type="text"
                          name="ccname"
                          id="ccname"
                          value={values.ccname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.ccname && errors.ccname ? (
                          <div data-testid="ccnameError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.ccname}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="fields">
                      <label htmlFor="ccn">Card Number:</label>
                      <div className="entry">
                        <input
                          type="text"
                          name="ccn"
                          id="ccn"
                          pattern="([0-9]{4}\s){3}[0-9]{4}"
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={values.ccn}
                          onBlur={(e) =>
                            onCcnBlur(
                              e,
                              setFieldValue,
                              handleBlur,
                              touched,
                              values
                            )
                          }
                          onChange={handleChange}
                        />
                        {touched.ccn && errors.ccn ? (
                          <div data-testid="ccnError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.ccn}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="fields">
                      <label htmlFor="expdate">Expiry Date:</label>
                      <div className="entry">
                        <input
                          type="month"
                          name="expdate"
                          id="expdate"
                          value={values.expdate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.expdate && errors.expdate ? (
                          <div data-testid="expdateError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.expdate}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="fields">
                      <label htmlFor="cvc">Security Code:</label>
                      <div className="entry">
                        <input
                          type="number"
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          length={3}
                          value={values.cvc}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.cvc && errors.cvc ? (
                          <div data-testid="cvcError" className="error">
                            <span>
                              <MdError style={iconStyles} />
                            </span>
                            <span className="msg">{errors.cvc}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </section>
                </section>
                <div className="buttons">
                  <input
                    disabled={!isValid}
                    data-testid="orderSubmitButton"
                    type="submit"
                    aria-label="submit"
                    className="btn bg-yellow"
                    value="Place Order"
                  />
                  <button className="tertiary" aria-label="Cancel">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </section>
        <section className="rightcol">
          <h3>Order Summary:</h3>
          <section className="list">
            <div className="item-table">
              <table cellspacing="0" cellpadding="0">
                <tbody>
                  {order !== null &&
                  order !== undefined &&
                  order.items.length > 0 ? (
                    <>
                      {order.items.map((ord, ind) => (
                        <tr key={ind}>
                          <td>
                            <div>
                              <img
                                alt={ord.item}
                                loading="lazy"
                                src={ord.image}
                              />
                              <span>{ord.item}</span>
                            </div>
                          </td>
                          <td>
                            <b>Qty: </b>
                            {ord.quantity}
                          </td>
                          <td>$ {ord.price}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={3}>There are no orders to display</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="sum-table">
              <table>
                {mode === "delivery" ? (
                  <tr>
                    <td>
                      <b>Delivery fee:</b>
                    </td>
                    <td></td>
                    <td>$ 10.00</td>
                  </tr>
                ) : (
                  <></>
                )}
                <tr>
                  <td>
                    <b>Tax:</b>
                  </td>
                  <td></td>
                  <td>$ {(CalculateTotal(order) * 0.15).toFixed(2)} </td>
                </tr>
                <tr className="total">
                  <td>Total:</td>
                  <td></td>
                  <td>$ {getTotal()}</td>
                </tr>
              </table>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
