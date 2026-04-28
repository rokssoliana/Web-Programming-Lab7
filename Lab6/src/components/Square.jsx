function Square({ value, onSquareClick, isHighlight }) {
  return (
    <button 
      className={`square ${isHighlight ? 'highlight' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;