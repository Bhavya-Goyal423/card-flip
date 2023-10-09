import "./App.css";
import CardList from "./components/CardList/CardList";
import { data } from "./assets/data.js";
import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import cardsound from "/sound/cardsound.mp3";
import flipcard from "/sound/flipcard.mp3";

function App() {
  const [cards, setCards] = useState(data.sort(() => Math.random() - 0.5));
  const [prev, setPrev] = useState(null);
  const [isClickable, setIsClickable] = useState(true);
  const [moves, setMoves] = useState(0);
  const [misses, setMisses] = useState(0);
  const [playflip] = useSound(flipcard);
  const [playcard] = useSound(cardsound);
  const [matchPair, setMatchPair] = useState(0);

  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const gameEnded = matchPair === 8 ? true : false;
  const intervalRef = useRef(null);
  if (gameEnded) clearInterval(intervalRef.current);

  const handleClick = (id, cardID) => {
    if (!isClickable) return;
    setCards((cards) =>
      cards.map((card, idx) =>
        idx === id ? { ...card, status: "flipped" } : { ...card }
      )
    );

    if (!isTimerRunning) {
      setIsTimerRunning(true);
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

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
      setMatchPair((matchPair) => matchPair + 1);
      setPrev(null);
      setIsClickable(true);
    } else {
      setIsClickable(false);
      playflip();
      setMoves((moves) => moves + 1);
      setMisses((misses) => misses + 1);
      setTimeout(() => {
        setCards((cards) =>
          cards.map((c) =>
            (c.cardId === cardID && c.status === "flipped") ||
            (c.cardId === prev && c.status === "flipped")
              ? { ...c, css: "wrong" }
              : { ...c }
          )
        );
      }, 500);

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
      }, 700);
    }
  };

  const handleNewGame = () => {
    playcard();
    setPrev(null);
    setMoves(0);
    setMisses(0);
    setMatchPair(0);
    setIsTimerRunning(false);
    setTimer(0);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
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
        misses={misses}
        isGameEnded={gameEnded}
        timer={timer}
      />
    </>
  );
}

export default App;
