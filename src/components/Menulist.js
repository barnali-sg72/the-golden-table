import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMenuData } from "./menu";
import { categories, getImageByCategory, getIconByCategory } from "./MenuPage";
import { UserContext } from "../App";

import { FaCartPlus } from "react-icons/fa6";

export default function MenuList({ addOrder }) {
  const [data, setData] = useState([]);
  //const userContext = useContext(UserContext);
  const navigate = useNavigate();
  //const [qtyList, setQtyList] = useState([]);
  const params = useParams();

  const image = getImageByCategory(params.category);
  /*const backgroundStyle = {
    background: `linear-gradient( rgba(87, 83, 78, 0.4), rgba(87, 83, 78, 0.4) ), url("${image}")`,
    backgroundSize: "cover",
  };*/

  const backgroundStyle = {
    backgroundImage: `linear-gradient(
        to right,
        rgba(0, 0, 0, 0.6) 30%,
        transparent
      ), url("${image}")`,
    backgroundSize: `100% 100%, cover`,
    backgroundPosition: `top left, center`,
  };

  useEffect(() => {
    const menu = getMenuData(params.category);
    const menuList = [];
    //setData(menu);
    menu.forEach((m) => {
      menuList.push({ ...m, qty: 1 });
    });
    setData(menuList);
  }, [params.category]);

  const getMenuDescription = (category) => {
    const list = categories.filter((c) => c.category == category);
    return list[0].description;
  };

  const handleOnQuantityChange = (e, name) => {
    const val = e.target.value;
    let list = [];
    data.forEach((m) => {
      if (m.name === name) {
        list.push({ ...m, qty: val });
      } else {
        list.push(m);
      }
    });
    setData(list);
  };

  return (
    <section className="menu-list-page options">
      <section className="section-layout" style={backgroundStyle}>
        <article className="menu-page-content">
          <div className="menu-page-title">
            <div className="category">
              <img
                alt="menu-category"
                src={getIconByCategory(params.category)}
              />
            </div>

            <h1 className="gradient-text">
              {params.category.charAt(0).toUpperCase() +
                params.category.slice(1)}{" "}
              Menu
            </h1>
          </div>

          <p
            dangerouslySetInnerHTML={{
              __html: getMenuDescription(params.category),
            }}
          ></p>
          <button aria-label="Main Menu" onClick={(e) => navigate("/menu")}>
            Main Menu
          </button>
        </article>
      </section>

      <div className="menu-options">
        <h2>Select from these options</h2>
        <div className="menu-list">
          {data.map((rec, k) => (
            <article className="card" key={k}>
              <img
                src={`http://localhost:3000/${rec.image}`}
                alt={rec.name}
              ></img>

              <div className="card-content">
                <h3 className="card-title">{rec.name}</h3>
                <h4 className="highlight-text">Price: {rec.price}</h4>
                <p>{rec.description}</p>
              </div>
              <div className="order">
                <div className="qty">
                  <label htmlFor="quantity-k">Qty: </label>
                  <select
                    id="quantity-k"
                    name="quantity-k"
                    value={rec.qty}
                    onChange={(e) => handleOnQuantityChange(e, rec.name)}
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
                <button
                  aria-label="Add to order"
                  type="button"
                  onClick={(e) =>
                    addOrder(
                      rec.name,
                      rec.qty,
                      rec.price,
                      rec.image,
                      rec.description
                    )
                  }
                >
                  Add&nbsp;&nbsp;
                  <FaCartPlus className="faicon" aria-label="cart"></FaCartPlus>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
