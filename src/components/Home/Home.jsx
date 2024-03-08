import s from "./Home.module.css";
import reactIconUrl from "../../assets/react-icon-lg.svg";
import { useNavigate } from "react-router-dom"
import Button from "../Button/Button";

function Home() {

  const navigate = useNavigate()

  return (
    <div className={s.wrapper}>
      <img src={reactIconUrl} />
      <h1 className={s.title}>React Evaluation</h1>
      <p className={s.name}>Paolo Cesar Charca M. (Paoloski)</p>
      <div className={s.buttons}>
        <Button variant="outline" onClick={()=>navigate("/color-game")}>
          Color Game
        </Button>
        <Button variant="outline" onClick={()=>navigate("/doable")}>
          Doable
        </Button>
      </div>
    </div>
  );
}

export default Home;
