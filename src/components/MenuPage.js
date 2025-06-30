import appetizerIcon from "../assets/images/icons/appetizer.png";
import saladIcon from "../assets/images/icons/salad.png";
import soupIcon from "../assets/images/icons/soup2.png";
import chickenIcon from "../assets/images/icons/chicken.png";
import beefIcon from "../assets/images/icons/beef.png";
import porkIcon from "../assets/images/icons/pork.png";
import fishIcon from "../assets/images/icons/fish.png";
import pastaIcon from "../assets/images/icons/pasta.png";
import pizzaIcon from "../assets/images/icons/pizza.png";
import burgerIcon from "../assets/images/icons/burger.png";
import dessertIcon from "../assets/images/icons/dessert.png";
import drinkIcon from "../assets/images/icons/drink.png";
import sidesIcon from "../assets/images/icons/sides.png";

import appetizer from "../assets/images/appetizer6.jpg";
import salad from "../assets/images/salad.jpg";
import soup from "../assets/images/soup1.jpg";
import chicken from "../assets/images/chicken4.jpg";
import beef from "../assets/images/beef1.jpg";
import pork from "../assets/images/menu/pork/pork-tenderloin.jpg";
import shrimp from "../assets/images/shrimp2.jpg";
import pasta from "../assets/images/pasta.jpg";
import pizza from "../assets/images/pizza2.jpg";
import burger from "../assets/images/burger.jpg";
import dessert from "../assets/images/dessert1.jpg";
import drink from "../assets/images/drinks1.jpg";
import sides from "../assets/images/sides1.jpg";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

export const categories = [
  {
    title: "Appetizer",
    category: "appetizer",
    icon: appetizerIcon,
    image: appetizer,
    description: `Get your meal off to a delicious start with our selection of crave-worthy appetizers, 
        crafted to excite your taste buds and share with friends. `,
  },
  {
    title: "Salad",
    category: "salads",
    icon: saladIcon,
    image: salad,
    description: `Refresh your palate with our vibrant selection of salads, crafted from the freshest 
        greens, crisp vegetables, and flavorful toppings. `,
  },
  {
    title: "Soup",
    category: "soups",
    icon: soupIcon,
    image: soup,
    description: `Warm up with our collection of soul-soothing soups, each made from scratch with fresh 
        ingredients and a whole lot of love.`,
  },
  {
    title: "Chicken",
    category: "chicken",
    icon: chickenIcon,
    image: chicken,
    description: `Indulge in our succulent selection of chicken dishes, each crafted to bring out the bold, 
        savory flavors of perfectly seasoned poultry. `,
  },
  {
    title: "Beef",
    category: "beef",
    icon: beefIcon,
    image: beef,
    description: `Dive into our savory selection of beef dishes, where every cut is cooked to perfection 
        and every flavor is expertly crafted. `,
  },
  {
    title: "Pork",
    category: "pork",
    icon: porkIcon,
    image: pork,
    description: `Savor the flavors of our expertly crafted pork dishes, each designed to showcase the 
        versatility and depth of this tender, flavorful meat. `,
  },
  {
    title: "Seafood",
    category: "seafood",
    icon: fishIcon,
    image: shrimp,
    description: `Explore the ocean’s finest with our selection of fresh, flavorful seafood dishes, 
        crafted to bring you the best tastes of the sea. `,
  },
  //{ title: "Vegetables", category: "vegetables", image: vegetables},
  {
    title: "Pasta",
    category: "pasta",
    icon: pastaIcon,
    image: pasta,
    description: `Indulge in our comforting and delicious pasta creations, crafted with rich, flavorful 
        sauces and high-quality ingredients. `,
  },
  {
    title: "Pizza",
    category: "pizza",
    icon: pizzaIcon,
    image: pizza,
    description: `Treat yourself to our mouth-watering selection of pizzas, each one crafted with a 
        perfectly crisp crust, savory sauces, and the freshest toppings. `,
  },
  {
    title: "Burger",
    category: "burgers",
    icon: burgerIcon,
    image: burger,
    description: `Sink your teeth into our irresistible burgers, crafted with juicy, tender patties and 
        piled high with fresh, flavorful toppings. `,
  },
  {
    title: "Sides",
    category: "sides",
    icon: sidesIcon,
    image: sides,
    description: `Complete your meal with our delicious selection of sides, designed to complement any 
        dish with a burst of flavor. `,
  },
  {
    title: "Dessert",
    category: "desserts",
    icon: dessertIcon,
    image: dessert,
    description: `End your meal on a high note with our decadent dessert selection, where every bite is 
        a sweet indulgence.`,
  },
  {
    title: "Drinks",
    category: "drinks",
    icon: drinkIcon,
    image: drink,
    description: `Quench your thirst with our wide selection of beverages, carefully curated to complement 
        your meal and elevate your dining experience. `,
  },
];

export const getImageByCategory = (category) => {
  return categories.filter((c) => c.category === category)[0].image;
};

export const getIconByCategory = (category) => {
  return categories.filter((c) => c.category === category)[0].icon;
};

export default function MenuPage() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.setSelectedMenu("MENU");
  }, []);

  return (
    <section className="menu-page">
      <section className="section-layout">
        <article className="section-header">
          <h1>Our Menu</h1>
          <p>
            Explore a curated selection of dishes crafted from the freshest
            ingredients, inspired by flavors from around the world. Each item is
            prepared with care and passion, aiming to offer an unforgettable
            dining experience. Bon appétit!
          </p>
        </article>
        {/*}
        <div className="section-img">
          <img alt="menu" src={menu} />
        </div> */}
      </section>

      <div className="menu-options">
        <h2>Menu Options</h2>
        <div className="menu-option-list">
          {categories.map((rec, k) => (
            <article
              className="card"
              key={k}
              onClick={() => navigate("/menu/" + rec.category)}
            >
              <img
                className="card-img-top"
                src={rec.image}
                alt={rec.title}
                loading="lazy"
              ></img>
              <div className="card-body">
                {/*{ rec.rating && rec.rating >0 ? 
                                <Rating num={rec?.rating}/> : <Rating num={0}/> }*/}
                <h2 className="card-title">{rec.title.toUpperCase()}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
