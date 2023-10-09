import "./App.css";
import CardList from "./components/CardList/CardList";
import { data } from "./assets/data.js";
import { useEffect, useState } from "react";

function App() {
  const [cards, setCards] = useState(data.sort(() => Math.random() - 0.5));
  const [prev, setPrev] = useState(null);
  const [isClickable, setIsClickable] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);

  const handleClick = (id, cardID) => {
    if (!isClickable) return;
    setCards((cards) =>
      cards.map((card, idx) =>
        idx === id ? { ...card, status: "flipped" } : { ...card }
      )
    );

    if (prev === null) {
      setIsClickable(false);
      setPrev(cardID);
      setIsClickable(true);
    } else if (cardID === prev) {
      setIsClickable(false);
      setCards((cards) =>
        cards.map((c) =>
          c.cardId === cardID
            ? { ...c, status: "flipped", css: "correct" }
            : { ...c }
        )
      );
      setPrev(null);
      setIsClickable(true);
    } else {
      setIsClickable(false);
      setCards((cards) =>
        cards.map((c) =>
          c.cardId === cardID || c.cardId === prev
            ? { ...c, css: "wrong" }
            : { ...c }
        )
      );
      setTimeout(() => {
        setCards((cards) =>
          cards.map((c) =>
            c.cardId === cardID || c.cardId === prev
              ? { ...c, status: "closed", css: "" }
              : { ...c }
          )
        );
        setPrev(null);
        setIsClickable(true);
      }, 500);
    }
  };

  const handleNewGame = () => {
    setPrev(null);
    setCards((cards) =>
      cards
        .map((card) => ({ ...card, status: "flipped", css: "" }))
        .sort(() => Math.random() - 0.5)
    );
    setTimeout(() => {
      setCards((cards) =>
        cards.map((card) => ({ ...card, status: "closed", css: "" }))
      );
    }, 2000);
  };

  useEffect(() => {
    setCards((cards) =>
      cards
        .map((card) => ({ ...card, status: "flipped", css: "" }))
        .sort(() => Math.random() - 0.5)
    );
    setTimeout(() => {
      setCards((cards) => cards.map((card) => ({ ...card, status: "closed" })));
    }, 2000);
  }, []);

  return (
    <>
      <CardList
        data={cards}
        handleNewGame={handleNewGame}
        handleClick={handleClick}
      />
    </>
  );
}

export default App;
