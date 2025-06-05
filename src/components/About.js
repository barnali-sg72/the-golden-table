import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import AboutUs from "./AboutUs";

function About() {
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.setSelectedMenu("ABOUT");
  }, []);
  return (
    <section className="about">
      <AboutUs />
      <section className="about-details section-layout">
        <article className="section-header">
          <p>
            Our farm-to-table approach ensures that every dish we serve is not
            only delicious but also sustainable and eco-friendly. We are
            committed to supporting local farmers and using organic ingredients
            whenever possible. With a passion for innovation and a deep respect
            for tradition, our chefs craft each dish with precision and
            creativity.
          </p>
        </article>
        {/*<div className="section-img">
        <img alt="about us" src={image} />
      </div>*/}
      </section>
    </section>
  );
}

export default About;
