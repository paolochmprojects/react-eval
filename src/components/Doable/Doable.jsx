import s from "./Doable.module.css";
import { Outlet } from "react-router-dom"

function Doable() {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Doable</h1>
      <p className={s.description}>Add and filter your most important tasks</p>
      <Outlet/>
    </div>
  );
}

export default Doable;
