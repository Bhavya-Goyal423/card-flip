import Card from "../Card/Card";
import "./CardList.css";

export default function CardList({
  data,
  handleNewGame,
  handleClick,
  moves,
  misses,
  isGameEnded,
  timer,
}) {
  const formatTime = (time) => {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds}`;
  };

  const converTime = (timer) => {
    const result = formatTime(timer).split(":");
    const minute = result[0];
    const second = result[1];

    if (minute === "0") return `${second} seconds`;
    else if (minute === "1") return `${minute} minute and ${second} seconds`;
    else return `${minute} minutes and ${second} seconds`;
  };

  return (
    <div className="wrapper">
      <div className="stats">
        <p className="moves-count">
          Moves:{" "}
          <span
            className="moves"
            style={{ color: `${moves > 0 ? "#755c12" : ""}` }}
          >
            {moves}
          </span>
        </p>
        <p className="misses-count">
          Misses:{" "}
          <span
            className="misses"
            style={{ color: `${misses > 0 ? "red" : ""}` }}
          >
            {misses}
          </span>
        </p>
      </div>
      <div className="container">
        <div
          className="win-stage"
          style={{ display: `${isGameEnded ? "flex" : "none"}` }}
        >
          <p>
            Congrats you solved it in <span>{converTime(timer)}</span>
          </p>
          <p>
            Click <span>New game</span> To start again
          </p>
        </div>
        {data.map((card, idx) => (
          <Card key={idx} card={card} index={idx} handleClick={handleClick} />
        ))}
      </div>
      <div className="cta">
        <button className="new-game" onClick={handleNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}
CardList.propTypes = null;
