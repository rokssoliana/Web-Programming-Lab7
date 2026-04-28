import InventoryForm from "../components/inventory/InventoryForm";
import { useNavigate } from "react-router-dom";

export default function AdminInventoryCreate() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "10px" }}>
        ← Назад до списку
      </button>
      <h1>Додати нову позицію</h1>
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <InventoryForm />
      </div>
    </div>
  );
}