import React from 'react';
import InventoryCard from './InventoryCard';

const InventoryGallery = ({ items, onToggleFavorite, isFavorite }) => {
  return (
    <div className="inventory-grid">
      {items.map((item) => (
        <InventoryCard 
          key={item.id} 
          item={item} 
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(item.id)}
        />
      ))}
    </div>
  );
};

export default InventoryGallery;