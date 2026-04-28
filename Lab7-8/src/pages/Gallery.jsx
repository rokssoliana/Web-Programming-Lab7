import React, { useContext } from 'react';
import { InventoryContext } from '../store/InventoryContext';
import InventoryGallery from '../components/gallery/InventoryGallery';
import { useFavorites } from '../hooks/useFavorites';

const Gallery = () => {
  const { inventory, loading, error } = useContext(InventoryContext);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Обробка станів завантаження та помилок (вимога методички) [cite: 104, 106, 160, 161]
  if (loading) return <div className="status-msg">⏳ Завантаження галереї...</div>;
  if (error) return <div className="status-msg error">❌ Помилка: {error}</div>;

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <h1>🌿 Галерея інвентарю</h1>
        <p>Ваш надійний склад у візуальному форматі</p>
      </header>

      {inventory.length > 0 ? (
        <InventoryGallery 
          items={inventory} 
          onToggleFavorite={toggleFavorite} 
          isFavorite={isFavorite}
        />
      ) : (
        <div className="empty-state">
          <p>На складі поки порожньо. Додайте товари в адмін-панелі! 📦</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;