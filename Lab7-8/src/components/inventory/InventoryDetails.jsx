export default function InventoryDetails({ item }) {
  if (!item) return <p>Інформація відсутня</p>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ color: '#333' }}>{item.inventory_name}</h2>
      <img 
        src={item.photo || "https://via.placeholder.com/150"} 
        alt={item.inventory_name} 
        style={{ width: '100%', maxWidth: '300px', borderRadius: '4px' }} 
      />
      <p style={{ marginTop: '15px' }}><strong>Опис:</strong> {item.description}</p>
      <p><small>ID позиції: {item.id}</small></p>
    </div>
  );
}