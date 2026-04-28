// Знаходимо основні елементи на сторінці
const canvas = document.getElementById('canvas');             // Полотно для растрового малювання
const ctx = canvas.getContext('2d');                          // Інструменти малювання (контекст)
const svg = document.getElementById('svg-canvas');            // Контейнер для векторних фігур
const colorPicker = document.getElementById('colorPicker');   // Вибір кольору
const lineWidthInput = document.getElementById('lineWidth'); // Повзунок товщини/розміру
const sizeValue = document.getElementById('sizeValue');       // Текст, що показує число розміру

// Поточний стан редактора
let mode = 'raster';        // Режим: 'raster' (растр) або 'vector' (вектор)
let isDrawing = false;      // Чи натиснута мишка для малювання прямо зараз
let selectedShape = null;   // Яка векторна фігура зараз вибрана
let currentTool = 'brush';  // Інструмент: 'brush' (пензель) або 'eraser' (ластик)

// Налаштування історії для кнопок "Назад" і "Вперед"
let history = []; // Масив, де зберігаємо "знімки" роботи
let step = -1;    // Поточний крок в історії

// --- ФУНКЦІЇ ІСТОРІЇ ---

// Функція для збереження поточного стану
function saveState() {
    step++; // Збільшуємо номер кроку
    // Якщо ми щось змінили після "Назад", видаляємо майбутні кроки
    if (step < history.length) history.length = step;

    if (mode === 'raster') {
        // Для растру зберігаємо все полотно як картинку-текст
        history.push({ mode: 'raster', data: canvas.toDataURL() });
    } else {
        // Для вектору зберігаємо весь внутрішній HTML-код SVG
        history.push({ mode: 'vector', data: svg.innerHTML });
    }
}

// Обробка кнопки "Назад"
document.getElementById('btn-undo').onclick = () => {
    if (step > 0) {
        step--; // Повертаємось на крок назад
        applyState(history[step]); // Відновлюємо той стан
    }
};

// Обробка кнопки "Вперед"
document.getElementById('btn-redo').onclick = () => {
    if (step < history.length - 1) {
        step++; // Йдемо на крок вперед
        applyState(history[step]); // Відновлюємо той стан
    }
};

// Функція, яка фактично виводить збережений стан на екран
function applyState(state) {
    if (state.mode === 'raster') {
        let img = new Image();
        img.src = state.data;
        img.onload = () => {
            ctx.clearRect(0, 0, 800, 600); // Очищаємо полотно
            ctx.drawImage(img, 0, 0);      // Малюємо збережену картинку
        };
    } else {
        svg.innerHTML = state.data; // Відновлюємо всі фігури через код
        // Після заміни HTML треба знову навчити фігури "рухатися"
        Array.from(svg.children).forEach(child => {
            if (child.tagName !== 'defs' && child.tagName !== 'rect' || child.id !== 'main-grid') {
                addVectorEvents(child);
            }
        });
    }
}

// Зберігаємо початковий порожній стан
saveState();

// --- ТЕМА ТА РЕЖИМИ ---

// Перемикач теми (світла/темна)
document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('light-theme'); // Додає або прибирає клас теми
};

// Функція перемикання між Растром і Вектором
function switchMode(newMode) {
    mode = newMode;
    // Міняємо активний вигляд кнопок
    document.getElementById('btn-raster').classList.toggle('active', mode === 'raster');
    document.getElementById('btn-vector').classList.toggle('active', mode === 'vector');
    // Ховаємо одне полотно і показуємо інше
    canvas.classList.toggle('hidden', mode !== 'raster');
    svg.classList.toggle('hidden', mode !== 'vector');
    document.getElementById('vector-tools').classList.toggle('hidden', mode !== 'vector');
    saveState(); // Зберігаємо стан при переході
}

document.getElementById('btn-raster').onclick = () => switchMode('raster');
document.getElementById('btn-vector').onclick = () => switchMode('vector');

// --- ПАЛІТРА ---

// Обробка кліку на кольорові квадратики (пресети)
document.querySelectorAll('.preset').forEach(p => {
    p.onclick = () => {
        colorPicker.value = p.dataset.color; // Беремо колір з атрибуту data-color
        // Оновлюємо вигляд активного пресета
        document.querySelectorAll('.preset').forEach(n => n.classList.remove('active-preset'));
        p.classList.add('active-preset');
        // Якщо вибрана фігура у векторі — фарбуємо її
        if (selectedShape && mode === 'vector') {
            selectedShape.setAttribute('fill', p.dataset.color);
            saveState();
        }
    };
});

// --- МАЛЮВАННЯ (РАСТР) ---

// Натиснули мишку на полотні
canvas.onmousedown = (e) => {
    if (mode !== 'raster') return;
    isDrawing = true;
    ctx.beginPath();                // Починаємо нову лінію
    ctx.moveTo(e.offsetX, e.offsetY); // Ставимо "перо" в точку кліку
};

// Рухаємо мишкою по полотну
canvas.onmousemove = (e) => {
    if (!isDrawing || mode !== 'raster') return;
    ctx.lineTo(e.offsetX, e.offsetY); // Проводимо лінію до поточної позиції миші
    // Вибираємо колір: якщо ластик — колір фону, якщо ні — вибраний колір
    ctx.strokeStyle = currentTool === 'eraser' ? getComputedStyle(canvas).backgroundColor : colorPicker.value;
    ctx.lineWidth = lineWidthInput.value; // Товщина з повзунка
    ctx.lineCap = 'round';                // Закруглені кінці ліній
    ctx.stroke();                         // Малюємо лінію
};

// Відпустили мишку
window.onmouseup = () => {
    if (isDrawing && mode === 'raster') saveState(); // Зберігаємо мазок в історію
    isDrawing = false;
};

// Вибір інструментів
document.getElementById('btn-brush').onclick = () => {
    currentTool = 'brush';
    document.getElementById('btn-brush').classList.add('active');
    document.getElementById('btn-eraser').classList.remove('active');
};

document.getElementById('btn-eraser').onclick = () => {
    currentTool = 'eraser';
    document.getElementById('btn-eraser').classList.add('active');
    document.getElementById('btn-brush').classList.remove('active');
};

// --- ВЕКТОР (SVG) ---

// Додавання прямокутника
document.getElementById('add-rect').onclick = () => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const s = lineWidthInput.value * 2; // Розмір залежить від повзунка
    setAttrs(rect, { x: 50, y: 50, width: s, height: s, fill: colorPicker.value });
    addVectorEvents(rect); // Робимо його рухомим
    svg.appendChild(rect); // Кладемо в контейнер
    saveState();
};

// Додавання кола
document.getElementById('add-circle').onclick = () => {
    const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    setAttrs(circ, { cx: 100, cy: 100, r: lineWidthInput.value, fill: colorPicker.value });
    addVectorEvents(circ); // Робимо його рухомим
    svg.appendChild(circ); // Кладемо в контейнер
    saveState();
};

// Функція для перетягування фігур (Drag & Drop)
function addVectorEvents(el) {
    el.onmousedown = (e) => {
        if (mode !== 'vector') return;
        e.stopPropagation(); // Щоб не спрацьовували інші кліки під фігурою
        if (selectedShape) selectedShape.classList.remove('selected');
        selectedShape = el; // Робимо фігуру вибраною
        selectedShape.classList.add('selected');
        
        let startX = e.clientX, startY = e.clientY;
        
        const move = (m) => {
            const dx = m.clientX - startX, dy = m.clientY - startY; // Рахуємо зміну позиції
            if (el.tagName === 'rect') {
                setAttrs(el, { x: +el.getAttribute('x') + dx, y: +el.getAttribute('y') + dy });
            } else {
                setAttrs(el, { cx: +el.getAttribute('cx') + dx, cy: +el.getAttribute('cy') + dy });
            }
            startX = m.clientX; startY = m.clientY;
        };
        
        const up = () => { 
            document.removeEventListener('mousemove', move); 
            document.removeEventListener('mouseup', up);
            saveState(); // Зберігаємо фігуру на новому місці в історію
        };
        
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    };
}

// Зміна розміру вибраної фігури через повзунок (в реальному часі)
lineWidthInput.oninput = (e) => {
    sizeValue.innerText = e.target.value;
    if (selectedShape && mode === 'vector') {
        if (selectedShape.tagName === 'rect') {
            selectedShape.setAttribute('width', e.target.value * 2);
            selectedShape.setAttribute('height', e.target.value * 2);
        } else {
            selectedShape.setAttribute('r', e.target.value);
        }
    }
};

// Збереження в історію тільки після того, як відпустили повзунок
lineWidthInput.onchange = () => { if (mode === 'vector' && selectedShape) saveState(); };

// --- КЕРУВАННЯ ТА ЗБЕРЕЖЕННЯ ---

// Очищення полотна
document.getElementById('btn-clear').onclick = () => {
    if (mode === 'raster') {
        ctx.clearRect(0,0,800,600); // Стираємо все з растру
    } else {
        // Видаляємо всі фігури крім фонової сітки
        while (svg.children.length > 2) svg.removeChild(svg.lastChild);
    }
    saveState();
};

// Видалення однієї вибраної фігури
document.getElementById('delete-shape').onclick = () => {
    if (selectedShape) {
        selectedShape.remove();
        selectedShape = null;
        saveState();
    }
};

// Збереження всього растрового малюнка як PNG
document.getElementById('btn-save').onclick = () => {
    const link = document.createElement('a');
    link.download = 'art.png';
    link.href = canvas.toDataURL(); // Перетворюємо полотно в посилання на картинку
    link.click();                   // Автоматично "натискаємо" на завантаження
};

// Допоміжна функція для швидкого встановлення атрибутів елемента
function setAttrs(el, attrs) { for (let k in attrs) el.setAttribute(k, attrs[k]); }