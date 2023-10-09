import Card from "../Card/Card";
import "./CardList.css";

export default function CardList({ data, handleNewGame, handleClick }) {
  return (
    <div className="wrapper">
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
