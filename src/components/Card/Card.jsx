import "./Card.css";
import ReactCardFlip from "react-card-flip";

export default function Card({ card, index, handleClick }) {
  return (
    <ReactCardFlip
      isFlipped={card.status !== "flipped"}
      flipDirection="horizontal"
    >
      <div className={`card card-front ${card.css}`}>{card.fruit}</div>
      <div
        className={`card card-back ${card.css}`}
        onClick={() => handleClick(index, card.cardId)}
      >
        <img className="card-back-img" src="/img/cardback.jpg" alt="card" />
      </div>
    </ReactCardFlip>
  );
}

Card.propTypes = null;
