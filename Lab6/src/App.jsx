import { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

export default function Game() {
  // --- СТАН (STATE) КОМПОНЕНТА --- [cite: 8, 47, 55]
  
  // history зберігає масив усіх станів поля (історію ходів) для можливості відкату 
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  // currentMove відстежує номер поточного ходу (0, 1, 2...) [cite: 59]
  const [currentMove, setCurrentMove] = useState(0);
  
  // score зберігає об'єкт із кількістю перемог для X та O [cite: 42]
  const [score, setScore] = useState({ x: 0, o: 0 });
  
  // --- ПОХІДНІ ДАНІ ---
  
  // Визначаємо, чий зараз хід: якщо номер ходу парний — ходить X [cite: 8]
  const xIsNext = currentMove % 2 === 0;
  
  // Вибираємо з історії саме той стан поля, який відповідає поточному ходу
  const currentSquares = history[currentMove];

  // --- ЕФЕКТИ (EFFECTS) --- [cite: 10]
  
  // Використовуємо useEffect для зчитування даних із пам'яті браузера при завантаженні 
  useEffect(() => {
    const savedScore = localStorage.getItem("tictactoe-score");
    if (savedScore) {
      // JSON.parse перетворює рядок з localStorage назад у об'єкт JS
      setScore(JSON.parse(savedScore));
    }
  }, []); // Порожній масив [] означає, що код виконається лише ОДИН раз при старті

  // --- ОБРОБНИКИ ПОДІЙ (EVENT HANDLERS) --- [cite: 9, 51]

  function handlePlay(nextSquares) {
    // Оновлюємо історію: беремо частину історії до поточного ходу і додаємо новий стан 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // Перевірка на переможця для оновлення статистики [cite: 39, 63]
    const winnerLine = calculateWinnerSimple(nextSquares);
    if (winnerLine) {
      const newScore = { ...score };
      if (winnerLine === "X") newScore.x += 1;
      else newScore.o += 1;
      
      setScore(newScore);
      // Зберігаємо оновлений рахунок у localStorage, щоб він не зник після оновлення сторінки 
      localStorage.setItem("tictactoe-score", JSON.stringify(newScore));
    }
  }

  // Функція для скидання гри (очищення поля, але не рахунку) [cite: 37]
  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  // --- РЕНДЕР (ВІДОБРАЖЕННЯ) --- [cite: 7, 60]
  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      
      {/* Відображення рахунку */}
      <div className="score-board">
        <p>Рахунок: X — <b>{score.x}</b> | O — <b>{score.o}</b></p>
      </div>

      <div className="game-container">
        {/* Передаємо дані та функцію управління в компонент Board через props  */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="controls">
        {/* Кнопка "Нова гра" викликає функцію очищення стану [cite: 37] */}
        <button className="reset-btn" onClick={resetGame}>Нова гра</button>
      </div>
    </div>
  );
}

// --- ЛОГІЧНА ФУНКЦІЯ ПЕРЕВІРКИ --- [cite: 39, 63]
function calculateWinnerSimple(squares) {
  // Масив усіх можливих виграшних ліній (індекси в масиві squares) [cite: 39]
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // горизонталі
    [0,3,6], [1,4,7], [2,5,8], // вертикалі
    [0,4,8], [2,4,6]             // діагоналі
  ];
  
  for (let [a, b, c] of lines) {
    // Якщо в клітинках a, b та c однакові символи — повертаємо переможця
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null; // Якщо переможця немає
}