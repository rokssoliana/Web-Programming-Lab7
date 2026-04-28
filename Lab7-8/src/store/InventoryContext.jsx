import React, { createContext, useState, useEffect, useContext } from 'react';

// Експортуємо сам контекст [cite: 49]
export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem("inventory_data");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("inventory_data", JSON.stringify(inventory));
  }, [inventory]);

  const addItem = (newItem) => {
    setInventory((prev) => [...prev, { ...newItem, id: Date.now() }]);
  };

  const removeItem = (id) => {
    setInventory((prev) => prev.filter(item => item.id !== id));
  };

  const updateItem = (id, updatedData) => {
    setInventory((prev) => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };

  // Передаємо значення, щоб вони були доступні через хук [cite: 49]
  return (
    <InventoryContext.Provider value={{ inventory, addItem, removeItem, updateItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Додаємо цей хук, який шукають твої сторінки
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};