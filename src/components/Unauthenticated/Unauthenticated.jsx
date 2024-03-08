import * as React from "react";
import s from "./Unauthenticated.module.css";
import { Outlet, redirect, NavLink } from "react-router-dom"
import { authService } from "../../services/authService";


export function loader() {
  if (authService.isAuthenticated) return redirect("/doable")
  return null
}

function Unauthenticated() {

  return (
    <div className={s.wrapper}>
      <div className={s.tabs}>
        <NavLink
          to="/doable/auth/login"
          className={({ isActive }) => {
            return isActive ? s.active : ""
          }}
        >
          Login
        </NavLink>
        <NavLink
          to="/doable/auth/signup"
          className={({ isActive }) => isActive ? s.active : ""}
        >
          Signup
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Unauthenticated;
