import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { InventoryProvider } from "./store/InventoryContext";

// Сторінки 7 лаби
import AdminInventory from "./pages/AdminInventory";
import AdminInventoryCreate from "./pages/AdminInventoryCreate";
import AdminInventoryEdit from "./pages/AdminInventoryEdit";
import AdminInventoryDetails from "./pages/AdminInventoryDetails";

// Сторінки 8 лаби
import Gallery from "./pages/Gallery";
import Favorites from "./pages/Favorites";

import './App.css';

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <nav style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            <Link to="/">🖼️ Галерея</Link>
            <Link to="/favorites">❤️ Улюблені</Link>
            <Link to="/admin">⚙️ Адмінка</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin" element={<AdminInventory />} />
            <Route path="/create" element={<AdminInventoryCreate />} />
            <Route path="/edit/:id" element={<AdminInventoryEdit />} />
            <Route path="/details/:id" element={<AdminInventoryDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;