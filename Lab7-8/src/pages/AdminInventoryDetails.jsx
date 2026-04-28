import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';

const AdminInventoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Використовуємо наш новий хук
  const { inventory } = useInventory();

  // Шукаємо товар [cite: 78-84]
  const item = inventory.find(i => i.id === parseInt(id));

  if (!item) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Товар не знайдено! 😕</h2>
        <button onClick={() => navigate('/admin')}>До адмінки</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{item.inventory_name}</h1>
      <div style={{ marginBottom: '20px' }}>
        <img 
          src={item.photo} 
          alt={item.inventory_name} 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
        />
      </div>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>{item.description}</p>
      <button onClick={() => navigate(-1)} className="view-btn">⬅️ Назад</button>
    </div>
  );
};

export default AdminInventoryDetails;