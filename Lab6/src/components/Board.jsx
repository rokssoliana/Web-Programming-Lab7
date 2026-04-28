import Square from "./Square";

function Board({ xIsNext, squares, onPlay }) {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.player : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  function handleClick(i) {
    // Якщо клітинка зайнята або вже є переможець — ігноруємо клік [cite: 38, 66]
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = "Переможець: " + winner;
  } else if (!squares.includes(null)) {
    status = "Нічия!";
  } else {
    status = "Наступний хід: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-grid">
        {squares.map((square, i) => (
          <Square 
            key={i} 
            value={square} 
            onSquareClick={() => handleClick(i)} 
            isHighlight={winningLine.includes(i)}
          />
        ))}
      </div>
    </>
  );
}

// Функція для визначення переможця [cite: 39, 63]
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонталі
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикалі
    [0, 4, 8], [2, 4, 6]             // Діагоналі
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default Board;