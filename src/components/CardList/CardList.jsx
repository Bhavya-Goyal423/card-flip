import Card from "../Card/Card";
import "./CardList.css";

export default function CardList({
  data,
  handleNewGame,
  handleClick,
  moves,
  misses,
  isGameEnded,
}) {
  console.log(isGameEnded);
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
            You <span>Won!</span>
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
