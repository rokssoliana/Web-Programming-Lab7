import React from 'react';
import { Link } from 'react-router-dom';

const InventoryCard = ({ item, isFavorite, onToggleFavorite }) => {
  // Перевіряємо: якщо в item.photo вже лежить готовий код картинки (починається з data:), 
  // використовуємо його як є. Якщо ні — додаємо шлях до сервера[cite: 137].
  const imageUrl = item.photo && item.photo.startsWith('data:') 
    ? item.photo 
    : `http://localhost:3000/uploads/${item.photo}`;

  return (
    <div className="inventory-card">
      <div className="card-image-wrapper">
        <img src={imageUrl} alt={item.inventory_name} className="card-image" />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(item.id); // Логіка перемикання "Улюблених" [cite: 151-155]
          }}
          title={isFavorite ? "Видалити з улюблених" : "Додати в улюблені"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-content">
        <h3>{item.inventory_name}</h3> [cite: 138]
        <p className="card-description">{item.description}</p> [cite: 147]
        <Link to={`/details/${item.id}`} className="view-btn"> [cite: 142]
          Детальніше
        </Link>
      </div>
    </div>
  );
};

export default InventoryCard;