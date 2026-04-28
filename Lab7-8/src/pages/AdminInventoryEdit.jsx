import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InventoryContext } from '../store/InventoryContext';

const AdminInventoryEdit = () => {
  const { id } = useParams();
  const { inventory, updateItem } = useContext(InventoryContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ inventory_name: '', description: '', photo: '' });

  useEffect(() => {
    const item = inventory.find(i => i.id === parseInt(id));
    if (item) setFormData(item);
  }, [id, inventory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateItem(parseInt(id), formData);
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Редагувати товар</h1>
      <input 
        value={formData.inventory_name} 
        onChange={e => setFormData({...formData, inventory_name: e.target.value})} 
        placeholder="Назва" 
      />
      <textarea 
        value={formData.description} 
        onChange={e => setFormData({...formData, description: e.target.value})} 
      />
      <button type="submit">Зберегти зміни</button>
    </form>
  );
};

export default AdminInventoryEdit;