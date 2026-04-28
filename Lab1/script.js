// =====================
// Додавання тексту
// =====================

const addTextBtn = document.getElementById("addTextBtn");
const textContainer = document.getElementById("textContainer");

addTextBtn.addEventListener("click", function () {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "Новий текст додано через JavaScript!";
    textContainer.appendChild(newParagraph);
});


// =====================
// Перемикання теми
// =====================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});