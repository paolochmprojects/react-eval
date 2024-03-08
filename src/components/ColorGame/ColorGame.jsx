import { useState } from "react";
import s from "./ColorGame.module.css";
import { getRandomColors, getStatus, rgbString, statusMessage } from "./utils";
import Button from "../Button/Button"

function ColorGame() {
  const [numOfColors, setNumOfColors] = useState(6)
  const [colors, setColors] = useState(getRandomColors(numOfColors));
  const [attempts, setAttempts] = useState([]);
  const [target, setTarget] = useState(Math.floor(Math.random() * colors.length));

  function handleReset() {
    setAttempts([]);
    setTarget(Math.floor(Math.random() * colors.length))
    setColors(getRandomColors(numOfColors));
  }

  function handleChangeNumber(event) {
    setNumOfColors(+event.target.value)
    setAttempts([]);
    setTarget(Math.floor(Math.random() * colors.length))
    setColors(getRandomColors(+event.target.value))
  }

  const status = getStatus(attempts, target, numOfColors);
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Color Game</h1>
      <p className={s.description}>
        Guess which color correspond to the following RGB code
      </p>

      <div className={s["rgb-wrapper"]}>
        <div className={s.rgb} style={{borderColor: "red"}}>
          <span className={s["color-number"]}>
            {colors[target][0]}
          </span>
          <span className={s["color-name"]}>red</span>
        </div>
        <div className={s.rgb} style={{borderColor: "green"}}>
          <span className={s["color-number"]}>
            {colors[target][1]}
          </span>
          <span className={s["color-name"]}>green</span>
        </div>
        <div className={s.rgb} style={{borderColor: "blue"}}>
          <span className={s["color-number"]}>
            {colors[target][2]}
          </span>
          <span className={s["color-name"]}>blue</span>
        </div>

      </div>
      <div className={s.dashboard}>
        <div className={s["number-input"]}>
          <label htmlFor="colors"># Colors</label>
          <input
            id="colors"
            type="number"
            defaultValue={numOfColors}
            onChange={handleChangeNumber}
            step={3}
            min={3}
            max={9}
          />
        </div>
        <p className={s["game-status"]}>{statusMessage[status]}</p>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div className={s.squares}>
        {colors.map((color, index) => {
          const backgroundColor = status === "playing" ? rgbString(color): rgbString(colors[target]);
          const opacity = attempts.includes(index) && status === "playing" ? "0" : "100";

          return (
            <button
              key={index}
              style={{ backgroundColor, opacity }}
              onClick={() => {
                setAttempts([...attempts, index])
              }}
              className={s.square}
              disabled={["lose", "win"].includes(status)}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default ColorGame;
