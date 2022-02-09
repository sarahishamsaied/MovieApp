import React from "react";
import * as FaBIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./modules.Sidermenu.css";
import { SiderbarData } from "./SiderData";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function Sidermenu(props) {
  const [sider, setsider] = useState(false);
  const siderChange = () => {
    setsider(!sider);
  };

  return (
    <>
      <section className={style.body}>
        <div className={sider ? "siderBody" : "siderBody-inactive"}>
          <ul>
            <div className="side-btn">
              <button onClick={siderChange}>
                <GiIcons.GiHamburgerMenu />
              </button>
            </div>
            {SiderbarData.map((data, index) => {
              return (
                <li onClick={()=>{<Redirect to = {data.path}></Redirect>}}
                  key={index}
                  className={sider ? "side-item" : "side-item-inactive"}
                >
                  <span>{data.icon}</span>
                  <Link to={data.path}>{data.tittle}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Sidermenu;
