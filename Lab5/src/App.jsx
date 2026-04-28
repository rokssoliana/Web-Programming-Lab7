import { useState, useEffect } from "react"; // підключаємо хуки React

function App() { // головний компонент

  const [todos, setTodos] = useState(() => { // стан списку задач, одразу беремо з localStorage
    const saved = localStorage.getItem("todos"); // дістаємо збережені дані
    return saved ? JSON.parse(saved) : []; // якщо є — парсимо, якщо ні — пустий масив
  });

  const [input, setInput] = useState(""); // стан для поля вводу (що пише користувач)
  const [editId, setEditId] = useState(null); // зберігаємо id задачі, яку редагуємо

  useEffect(() => { // ефект, який спрацьовує при зміні todos
    localStorage.setItem("todos", JSON.stringify(todos)); // зберігаємо список в localStorage
  }, [todos]); // залежність — todos

  const handleAdd = () => { // функція додавання або редагування задачі
    if (!input.trim()) return; // якщо пусто — нічого не робимо

    if (editId) { // якщо ми редагуємо існуючу задачу
      setTodos(todos.map(t => // перебираємо всі задачі
        t.id === editId ? { ...t, text: input } : t // якщо id співпав — міняємо текст
      ));
      setEditId(null); // виходимо з режиму редагування
    } else { // якщо додаємо нову задачу
      setTodos([
        ...todos, // беремо всі старі задачі
        { id: Date.now(), text: input, done: false } // додаємо нову
      ]);
    }

    setInput(""); // очищаємо поле вводу
  };

  const handleDelete = (id) => { // видалення задачі
    setTodos(todos.filter(t => t.id !== id)); // залишаємо всі, крім тієї що видаляємо
  };

  const handleToggle = (id) => { // відмітити як виконану
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t // міняємо done на протилежне
    ));
  };

  const handleEdit = (todo) => { // редагування задачі
    setInput(todo.text); // підставляємо текст у поле
    setEditId(todo.id); // зберігає її id у змінній editId
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}> {/* контейнер */}
      <h1>ToDo List</h1> {/* заголовок */}

      <input
        value={input} // значення поля = стан input
        onChange={(e) => setInput(e.target.value)} // при вводі змінюємо стан
        placeholder="Введіть задачу" // підказка
      />

      <button onClick={handleAdd}> {/* кнопка додає або зберігає */}
        {editId ? "Зберегти" : "Додати"} {/* якщо редагуємо — текст змінюється */}
      </button>

      <ul>
        {todos.map(todo => ( // перебираємо всі задачі
          <li key={todo.id}> {/* key потрібен для React */}

            <span
              onClick={() => handleToggle(todo.id)} // клік — виконано/не виконано
              style={{
                textDecoration: todo.done ? "line-through" : "none", // якщо done — закреслення
                cursor: "pointer"
              }}
            >
              {todo.text} {/* текст задачі */}
            </span>

            <button onClick={() => handleEdit(todo)}>✏️</button> {/* редагувати */}
            <button onClick={() => handleDelete(todo.id)}>❌</button> {/* видалити */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; // експортуємо компонент