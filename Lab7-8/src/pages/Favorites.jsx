import React, { useContext } from 'react';
import { InventoryContext } from '../store/InventoryContext';
import InventoryGallery from '../components/gallery/InventoryGallery';
import { useFavorites } from '../hooks/useFavorites';

const Favorites = () => {
  const { inventory } = useContext(InventoryContext);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Залишаємо лише ті товари, чиї ID є у списку favorites [cite: 154-155]
  const favoriteItems = inventory.filter(item => favorites.includes(item.id));

  return (
    <div className="favorites-page">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>❤️ Мої улюблені</h1>
      
      {favoriteItems.length > 0 ? (
        <InventoryGallery 
          items={favoriteItems} 
          onToggleFavorite={toggleFavorite} 
          isFavorite={isFavorite}
        />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p className="empty-state">У вас ще немає улюблених товарів. Додайте щось із галереї! 😊</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;