import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../store/InventoryContext';

const AdminInventory = () => {
  const { inventory, removeItem } = useContext(InventoryContext);

  return (
    <div>
      <h1>⚙️ Адмін-панель складу</h1>
      <Link to="/create" className="view-btn" style={{marginBottom: '20px'}}>Додати товар</Link>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th>Фото</th>
            <th>Назва</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td><img src={item.photo} alt="" style={{width: '50px', height: '50px', objectFit: 'cover'}} /></td>
              <td>{item.inventory_name}</td>
              <td>
                <Link to={`/details/${item.id}`}>👁️</Link>
                <Link to={`/edit/${item.id}`} style={{margin: '0 10px'}}>✏️</Link>
                <button onClick={() => removeItem(item.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminInventory;