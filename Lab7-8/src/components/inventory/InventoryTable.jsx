import { useInventory } from "../../store/InventoryContext";

export default function InventoryTable() {
  const { items, removeItem } = useInventory();

  return (
    <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#eee' }}>
          <th>Фото</th>
          <th>Назва</th>
          <th>Опис</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Склад порожній</td></tr>
        ) : (
          items.map(item => (
            <tr key={item.id}>
              <td style={{ textAlign: 'center' }}>
                {item.photo && <img src={item.photo} width="50" height="50" style={{ objectFit: 'cover' }} />}
              </td>
              <td>{item.inventory_name}</td>
              <td>{item.description}</td>
              <td>
                <button 
                  onClick={() => { if(window.confirm("Видалити?")) removeItem(item.id) }}
                  style={{ color: 'red', cursor: 'pointer' }}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}