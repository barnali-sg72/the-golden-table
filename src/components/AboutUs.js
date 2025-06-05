function AboutUs() {
  /*const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.setSelectedMenu("ABOUT");
  }, []);*/
  return (
    <section className="about-us section-layout">
      <article className="section-header">
        <h1>About Us</h1>

        <p>
          The Golden Table restaurant was founded in 2005 by Adrian and Mario
          who were passionate about creating a unique dining experience in San
          Francisco. Our journey began with a love for fresh, locally-sourced
          ingredients. We believe in the power of good food to bring people
          together.
        </p>
      </article>
      {/*<div className="section-img">
        <img alt="about us" src={image} />
      </div>*/}
    </section>
  );
}

export default AboutUs;
