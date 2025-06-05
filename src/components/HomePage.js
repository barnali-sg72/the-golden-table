import CallToAction from "./CallToAction";
import CustomerRatings from "./CustomerRatings";
import Specials from "./Specials";
import AboutUs from "./AboutUs";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

function HomePage({ addOrder }) {
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.setSelectedMenu("HOME");
  }, []);
  return (
    <section className="home">
      <CallToAction />
      <Specials addOrder={addOrder} />
      <CustomerRatings />
      <h2 className="about-header">About Us</h2>
      <AboutUs />
    </section>
  );
}

export default HomePage;
