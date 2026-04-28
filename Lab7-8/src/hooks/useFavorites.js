import { useState, useEffect } from 'react';

export const useFavorites = () => {
    // 1. Беремо список ID з localStorage, якщо він там є, або створюємо пустий []
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // 2. Кожного разу, коли список favorites змінюється, ми перезаписуємо його в пам'ять
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // 3. Функція, яка додає ID в список, якщо його там нема, або видаляє, якщо він там є
    const toggleFavorite = (id) => {
        setFavorites(prev => 
            prev.includes(id) 
                ? prev.filter(favId => favId !== id) 
                : [...prev, id]
        );
    };

    // 4. Проста перевірка: чи є цей конкретний ID у списку улюблених
    const isFavorite = (id) => favorites.includes(id);

    return { favorites, toggleFavorite, isFavorite };
};