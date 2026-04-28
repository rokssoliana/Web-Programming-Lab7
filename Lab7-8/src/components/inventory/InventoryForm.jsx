import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../../store/InventoryContext";

export default function InventoryForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const { addItem } = useInventory();
  const navigate = useNavigate();

  // Функція для перетворення картинки в текст
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ 
      inventory_name: name, 
      description: desc, 
      photo: photoBase64 
    });
    alert("Товар збережено в LocalStorage!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <input placeholder="Назва" value={name} onChange={e => setName(e.target.value)} required />
      <textarea placeholder="Опис" value={desc} onChange={e => setDesc(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px' }}>
        Зберегти назавжди
      </button>
    </form>
  );
}