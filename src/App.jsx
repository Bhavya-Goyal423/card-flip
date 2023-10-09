import "./App.css";
import CardList from "./components/CardList/CardList";
import { data } from "./assets/data.js";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import cardsound from "/sound/cardsound.mp3";
import flipcard from "/sound/flipcard.mp3";

function App() {
  const [cards, setCards] = useState(data.sort(() => Math.random() - 0.5));
  const [prev, setPrev] = useState(null);
  const [isClickable, setIsClickable] = useState(true);
  const [moves, setMoves] = useState(0);
  const [playflip] = useSound(flipcard);
  const [playcard] = useSound(cardsound);
  // const [gameEnd, setGameEnd] = useState(false);

  const handleClick = (id, cardID) => {
    if (!isClickable) return;
    setCards((cards) =>
      cards.map((card, idx) =>
        idx === id ? { ...card, status: "flipped" } : { ...card }
      )
    );

    if (prev === null) {
      setIsClickable(false);
      playflip();
      setPrev(cardID);
      setIsClickable(true);
    } else if (cardID === prev) {
      setIsClickable(false);
      playflip();
      setMoves((moves) => moves + 1);
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
      playflip();
      setMoves((moves) => moves + 1);
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
    playcard();
    setPrev(null);
    setMoves(0);
    setCards((cards) =>
      cards
        .map((card) => ({ ...card, status: "flipped", css: "" }))
        .sort(() => Math.random() - 0.5)
    );
    setTimeout(() => {
      setCards((cards) =>
        cards.map((card) => ({ ...card, status: "closed", css: "" }))
      );
      playcard();
    }, 2000);
  };

  useEffect(() => {
    playcard();
    setCards((cards) =>
      cards
        .map((card) => ({ ...card, status: "flipped", css: "" }))
        .sort(() => Math.random() - 0.5)
    );
    setTimeout(() => {
      setCards((cards) => cards.map((card) => ({ ...card, status: "closed" })));
      playcard();
    }, 2000);
  }, [playcard]);

  return (
    <>
      <CardList
        data={cards}
        handleNewGame={handleNewGame}
        handleClick={handleClick}
        moves={moves}
      />
    </>
  );
}

export default App;
