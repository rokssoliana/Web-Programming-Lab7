const productsContainer = document.getElementById("products-container");
const categorySelect = document.getElementById("category");
const colorSelect = document.getElementById("color");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const applyFiltersBtn = document.getElementById("apply-filters");
const noProductsMessage = document.getElementById("no-products");
const cartCount = document.getElementById("cart-count");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

const clearCartBtn = document.getElementById("clear-cart");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ============================= */
/* Лічильник кошика */
/* ============================= */

const updateCartCount = () => {
    cartCount.textContent = cart.length;
};


/* ============================= */
/* Створення картки товару */
/* ============================= */

const createProductCard = (product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price">${product.price} грн</div>
        <button>Додати в кошик</button>
    `;

    // Додавання в кошик
    card.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    });

    // Відкриття модального вікна
    card.addEventListener("click", () => {
        modalBody.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" style="width:100%; margin:15px 0;">
            <p>${product.description}</p>
            <p><strong>Категорія:</strong> ${product.category}</p>
            <p><strong>Колір:</strong> ${product.color}</p>
            <p><strong>Ціна:</strong> ${product.price} грн</p>
        `;
        modal.classList.add("active");
    });

    return card;
};


/* ============================= */
/* Відображення товарів */
/* ============================= */

const displayProducts = (items) => {
    productsContainer.innerHTML = "";

    if (items.length === 0) {
        noProductsMessage.classList.remove("hidden");
        return;
    }

    noProductsMessage.classList.add("hidden");

    items.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
};


/* ============================= */
/* Фільтрація */
/* ============================= */

const applyFilters = () => {
    const selectedCategory = categorySelect.value;
    const selectedColor = colorSelect.value;
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    const filtered = products.filter(product => {
        const matchCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchColor =
            selectedColor === "all" ||
            product.color === selectedColor;

        const matchPrice =
            product.price >= minPrice &&
            product.price <= maxPrice;

        return matchCategory && matchColor && matchPrice;
    });

    displayProducts(filtered);
};


/* ============================= */
/* Завантаження JSON */
/* ============================= */

fetch("data/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts(products);
    })
    .catch(error => {
        console.error("Помилка завантаження JSON:", error);
    });


/* ============================= */
/* Події */
/* ============================= */

applyFiltersBtn.addEventListener("click", applyFilters);

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// Очищення кошика
if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        if (confirm("Ви впевнені, що хочете очистити кошик?")) {
            localStorage.removeItem("cart");
            cart = [];
            updateCartCount();
        }
    });
}


/* ============================= */
/* Ініціалізація */
/* ============================= */

updateCartCount();