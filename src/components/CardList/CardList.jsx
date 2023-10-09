import Card from "../Card/Card";
import "./CardList.css";

export default function CardList({ data, handleNewGame, handleClick, moves }) {
  return (
    <div className="wrapper">
      <p className="moves-count">Moves: {moves}</p>
      <div className="container">
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
