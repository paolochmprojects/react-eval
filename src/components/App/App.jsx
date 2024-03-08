import * as React from "react";
import clsx from "clsx";
import s from "./App.module.css";

import reactIconUrl from "../../assets/react-icon.svg";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  {
    name: "Color Game",
    to: "/color-game",
  },
  {
    name: "Doable",
    to: "/doable",
  },
];

function App() {
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <NavLink
          className={s.logo}
          to="/"
        >
          <img src={reactIconUrl} /> React Evaluation
        </NavLink>
        <nav className={s.nav}>
          {navigation.map((item) => (
            <NavLink key={item.to}
              className={({isActive})=>clsx(s["nav-item"],isActive && s.current)}
              to={item.to}>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
