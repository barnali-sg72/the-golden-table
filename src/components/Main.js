import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import { useReducer, useState, useEffect, useContext } from "react";
import { fetchAPI, submitAPI } from "../api";
import ConfirmedBooking from "./ConfirmedBooking";
import ReservationsPage from "./ReservationsPage";
import About from "./About";
import MenuPage from "./MenuPage";
import MenuList from "./Menulist";
import OrderPage from "./OrderPage";
import CheckoutPage from "./CheckoutPage";
import ConfirmedOrder from "./ConfirmedOrder";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { getLoggedUser, UserContext } from "../App";
import Dialog from "./Dialog";
import ScrollToTop from "./ScrollToTop";
import { FaCircleCheck } from "react-icons/fa6";

//let script = null;
/* reducer */
export function updateTimes(state, date) {
  const dateobj = new Date(date);
  state = fetchAPI(dateobj);
  return state;
}

export function initializeTimes() {
  //let fetchAPI = window.fetchAPI;
  return fetchAPI(new Date());
  //return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
}

/*export function getCurrentOrder() {
    let data = localStorage.getItem("PENDINGORDERS");
    if (data != undefined && data != null) {            
        const ordlist = JSON.parse(data);
        //console.log(ordlist);
        if (ordlist.length > 0) {
            //setPendingOrders(ordlist);
            const ordarr = ordlist.flter(e => e.username === getLoggedUser().username);
            if (ordarr !== undefined && ordarr !== null && ordarr.length > 0) {
                return ordarr[0];
            }
        }
    }
    return null;
}*/

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  const [formData, setFormData] = useState({});
  const [orderData, setOrderData] = useState({});

  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]); //username, items[]
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    //localStorage.clear();
    let data = localStorage.getItem("RESERVATIONS");
    if (data != undefined && data != null) {
      const reslist = JSON.parse(data);
      console.log(reslist);
      if (reslist.length > 0) {
        setReservations(reslist);
      }
    }

    data = localStorage.getItem("ORDERS");
    if (data != undefined && data != null) {
      const ordlist = JSON.parse(data);
      console.log(ordlist);
      if (ordlist.length > 0) {
        setOrders(ordlist);
      }
    }

    data = localStorage.getItem("PENDINGORDERS");
    if (data != undefined && data != null) {
      const ordlist = JSON.parse(data);
      console.log(ordlist);
      if (ordlist.length > 0) {
        setPendingOrders(ordlist);
        if (getLoggedUser() !== null && getLoggedUser() !== undefined) {
          const ordarr = ordlist.filter(
            (e) => e.username === getLoggedUser().username
          );
          if (ordarr !== undefined && ordarr !== null && ordarr.length > 0) {
            setOrder(ordarr[0]);
          } else {
            setOrder(null);
          }
        } else {
          setOrder(null);
        }
      }
    }

    data = localStorage.getItem("COMPLETEDORDERS");
    if (data != undefined && data != null) {
      const ordlist = JSON.parse(data);
      console.log(ordlist);
      if (ordlist.length > 0) {
        setCompletedOrders(ordlist);
      }
    }
  }, [userContext.user]);

  const submitForm = (formData) => {
    console.log(formData);
    setFormData(formData);
    submitAPI(formData);
    let reslist = reservations;
    reslist.push(formData);
    localStorage.setItem("RESERVATIONS", JSON.stringify(reslist));
    setReservations(reslist);
    /*setReservations((prev) => {
            return [...prev, formData];
        })
        localStorage.setItem("RESERVATIONS", JSON.stringify(reservations));*/
    navigate("/bookingConfirmation");
  };

  const submitOrderForm = (data) => {
    let ord = data;
    ord.username = getLoggedUser().username;
    ord.items = order.items;
    console.log(ord);
    setOrderData(ord);
    //submitAPI(formData);
    let ordlist = completedOrders;
    ordlist.push(ord);
    localStorage.setItem("COMPLETEDORDERS", JSON.stringify(ordlist));
    setCompletedOrders(ordlist);
    /*setReservations((prev) => {
            return [...prev, formData];
        })
        localStorage.setItem("RESERVATIONS", JSON.stringify(reservations));*/
    navigate("/orderConfirmation");
  };

  const deleteReservation = (ind) => {
    let list = reservations;
    list.splice(ind, 1);
    setReservations(list);
    localStorage.setItem("RESERVATIONS", JSON.stringify(reservations));
    navigate("/reservations");
  };

  // ORDERS

  const addOrder = (itm, qty, price, image, description) => {
    if (getLoggedUser() === undefined || getLoggedUser() === null) {
      //alert("Please sign in to place your order");
      userContext.openDialog("Please log in to start an order");
      return;
    }

    let ords = pendingOrders;
    let ord = null;
    const ordarr = ords.filter((e) => e.username === getLoggedUser().username);
    if (ordarr !== undefined && ordarr !== null && ordarr.length > 0) {
      ord = ordarr[0];
    } else {
      ord = {
        username:
          getLoggedUser() === null ? "Anonymous" : getLoggedUser().username,
        items: [],
      };
      ords.push(ord);
    }
    const ind = ord.items.findIndex((e) => e.item === itm);
    if (ind > -1) {
      ord.items[ind].quantity =
        parseInt(ord.items[ind].quantity) + parseInt(qty);
    } else {
      ord.items.push({
        item: itm,
        quantity: qty,
        price: price,
        image: image,
        description: description,
      });
    }
    setOrder(ord);
    localStorage.setItem("PENDINGORDERS", JSON.stringify(ords));
    setPendingOrders(ords);
    console.log(ords);
    //alert("Item added to order!");
    userContext.openDialog(
      <>
        <FaCircleCheck
          className="faicon"
          aria-label="success"
          fill="green"
        ></FaCircleCheck>
        <p>Item added to order!</p>
      </>
    );
  };

  /*const addOrder = (itm, qty, price, image) => {
        let ords = orders;
        const ind = ords.findIndex(e => e.item === itm);
        if (ind > -1) {
            ords[ind].quantity = parseInt(ords[ind].quantity) + parseInt(qty);
        } else {
            ords.push({item: itm, quantity: qty, price: price, image: image});
        }        
        localStorage.setItem("ORDERS", JSON.stringify(ords));
        setOrders(ords);
        alert("Item added to order!");
    }*/

  const updateOrder = (itm, qty) => {
    let ords = pendingOrders;
    let ord = null;
    const ordarr = ords.filter((e) => e.username === getLoggedUser().username);
    if (ordarr.length > 0) {
      ord = ordarr[0];
      const ind = ord.items.findIndex((e) => e.item === itm);
      ord.items[ind].quantity = qty;
      localStorage.setItem("PENDINGORDERS", JSON.stringify(ords));
      setPendingOrders(ords);
    }

    navigate("/orderOnline");
  };

  /*const updateOrder = (itm, qty) => {
        let ords = orders;
        const ind = ords.findIndex(e => e.item === itm);
        ords[ind].quantity = qty;
        localStorage.setItem("ORDERS", JSON.stringify(ords));
        setOrders(ords);
        navigate("/orderOnline");
    }*/

  const deleteItemInOrder = (itm) => {
    let ords = pendingOrders;
    let ord = null;
    const ordarr = ords.filter((e) => e.username === getLoggedUser().username);
    if (ordarr.length > 0) {
      ord = ordarr[0];
      let items = ord.items.filter((e) => e.item !== itm);
      ord.items = items;
      localStorage.setItem("PENDINGORDERS", JSON.stringify(ords));
      setPendingOrders(ords);
      userContext.openDialog("Order item deleted successfully!");
    }

    navigate("/orderOnline");
  };

  /*const deleteOrder = (itm) => {
        let ords = orders.filter(e => e.item !== itm);
        localStorage.setItem("ORDERS", JSON.stringify(ords));
        setOrders(ords);
        navigate("/orderOnline");
    }*/

  return (
    <>
      <main>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<HomePage addOrder={addOrder} />}></Route>
            <Route
              path="/home"
              element={<HomePage addOrder={addOrder} />}
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/menu" element={<MenuPage />}></Route>
            <Route
              path="/menu/:category"
              element={<MenuList addOrder={addOrder} />}
            ></Route>
            <Route
              path="/reservations"
              element={
                <ReservationsPage
                  reservations={reservations}
                  deleteReservation={deleteReservation}
                />
              }
            ></Route>
            <Route
              path="/bookingPage"
              element={
                <BookingPage
                  availableTimes={availableTimes}
                  dispatch={dispatch}
                  submitForm={submitForm}
                />
              }
            ></Route>
            <Route
              path="/bookingConfirmation"
              element={<ConfirmedBooking formData={formData} />}
            ></Route>
            <Route
              path="/orderConfirmation"
              element={<ConfirmedOrder orderData={orderData} orders={orders} />}
            ></Route>
            <Route
              path="/orderOnline"
              element={
                <OrderPage
                  order={order}
                  updateOrder={updateOrder}
                  deleteOrder={deleteItemInOrder}
                />
              }
            ></Route>
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  order={order}
                  updateOrder={updateOrder}
                  deleteOrder={deleteItemInOrder}
                  submitOrderForm={submitOrderForm}
                />
              }
            ></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/signup" element={<SignupForm />}></Route>
          </Routes>
          {userContext.isDialogOpen && (
            <Dialog title="Example Dialog" onClose={userContext.closeDialog}>
              <p>{userContext.dialogmsg}</p>
            </Dialog>
          )}
        </ScrollToTop>
      </main>
    </>
  );
}

export default Main;
