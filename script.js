const WHATSAPP = "94773129477";

const products = [
  { name: "CEYO Black Tee", price: 3850, category: "T-Shirts", image: "product-1.jpg" },
  { name: "CEYO White Tee", price: 4250, category: "T-Shirts", image: "product-2.jpg" },
  { name: "CEYO Navy Tee", price: 4350, category: "T-Shirts", image: "product-3.jpg" },
  { name: "CEYO White Oversized Tee", price: 4450, category: "T-Shirts", image: "product-4.jpg" },
  { name: "CEYO Black Cargo Pants", price: 6250, category: "Pants", image: "product-5.jpg" },
  { name: "CEYO Grey Wide Pants", price: 5950, category: "Pants", image: "product-6.jpg" },
  { name: "CEYO Black Cargo Jogger", price: 6250, category: "Pants", image: "product-7.jpg" },
  { name: "CEYO Grey Wide Fit Pants", price: 5950, category: "Pants", image: "product-8.jpg" },
  { name: "CEYO Navy Oversized Tee", price: 4350, category: "T-Shirts", image: "product-9.jpg" },
  { name: "CEYO White Signature Tee", price: 4250, category: "T-Shirts", image: "product-10.jpg" },
  { name: "CEYO White Classic Tee", price: 4250, category: "T-Shirts", image: "product-11.jpg" },
  { name: "CEYO Black Graphic Tee", price: 4450, category: "T-Shirts", image: "product-12.jpg" }
];

let cart = [];
const el = (id) => document.getElementById(id);
const money = (value) => Number(value).toLocaleString("en-LK");

function render(category = "All") {
  const list = products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => category === "All" || product.category === category);

  el("products").innerHTML = list.map(({ product, index }) => `
    <article class="product reveal-card">
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="tag">CEYO / ${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="product-info">
        <div>
          <h3>${product.name}</h3>
          <p>${product.category}</p>
        </div>
        <div class="price">LKR ${money(product.price)}</div>
        <button class="add" type="button" data-add="${index}">ADD TO BAG <span>+</span></button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => add(Number(button.dataset.add)));
  });
  observeCards();
}

function add(index) {
  if (!products[index]) return;
  cart.push(products[index]);
  renderCart();
  openCart();
}

function removeItem(index) {
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  el("cartCount").textContent = cart.length;
  el("cartItems").innerHTML = cart.length
    ? cart.map((product, index) => `
      <div class="cart-row">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div>
          <strong>${product.name}</strong>
          <small>LKR ${money(product.price)}</small>
        </div>
        <button type="button" data-remove="${index}" aria-label="Remove ${product.name}">×</button>
      </div>
    `).join("")
    : "<div class='empty'>Your bag is empty.<br><span>Add a piece you love.</span></div>";

  document.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => removeItem(Number(button.dataset.remove)));
  });

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  el("cartTotal").textContent = money(total);
}

function setCategory(category) {
  document.querySelectorAll(".filter").forEach((button) => {
    button.classList.toggle("active", button.dataset.cat === category);
  });
  render(category);
  const shop = document.getElementById("shop");
  if (shop) shop.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openCart() {
  el("cart").classList.add("open");
  el("overlay").classList.add("show");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  el("cart").classList.remove("open");
  if (!el("orderModal").classList.contains("show")) {
    el("overlay").classList.remove("show");
    document.body.classList.remove("no-scroll");
  }
}

function closeModal() {
  el("orderModal").classList.remove("show");
  el("overlay").classList.remove("show");
  document.body.classList.remove("no-scroll");
}

function openOrderModal() {
  if (!cart.length) {
    alert("Please add a product to your bag first.");
    return;
  }
  el("orderModal").classList.add("show");
  el("overlay").classList.add("show");
  document.body.classList.add("no-scroll");
}

function sendWhatsAppOrder() {
  const name = el("customerName").value.trim();
  const phone = el("customerPhone").value.trim();
  const size = el("customerSize").value;
  const color = el("customerColor").value.trim();
  const address = el("customerAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Please enter your name, phone number and delivery address.");
    return;
  }

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const items = cart.map((product, index) =>
    `${index + 1}. ${product.name} - LKR ${money(product.price)}`
  ).join("\n");

  const message = [
    "Hi CEYO CLOTHING!",
    "",
    "I would like to place an order.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Size: ${size || "Not specified"}`,
    `Color: ${color || "Not specified"}`,
    `Address: ${address}`,
    "",
    "Items:",
    items,
    "",
    `Total: LKR ${money(total)}`
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// Filters
 document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => setCategory(button.dataset.cat));
});

// Cart / modal controls
el("cartBtn").addEventListener("click", openCart);
el("closeCart").addEventListener("click", closeCart);
el("overlay").addEventListener("click", () => {
  if (el("orderModal").classList.contains("show")) closeModal();
  else closeCart();
});
el("checkoutBtn").addEventListener("click", openOrderModal);
el("modalClose").addEventListener("click", closeModal);
el("sendWhatsApp").addEventListener("click", sendWhatsAppOrder);

// Mobile navigation
el("menuBtn").addEventListener("click", () => {
  document.querySelector(".header nav").classList.toggle("mobile-open");
});
document.querySelectorAll(".header nav a").forEach((link) => {
  link.addEventListener("click", () => document.querySelector(".header nav").classList.remove("mobile-open"));
});

// Escape key support
window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (el("orderModal").classList.contains("show")) closeModal();
  else closeCart();
});

// Reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeCards() {
  document.querySelectorAll(".reveal-card:not(.visible)").forEach((card) => observer.observe(card));
}

// Small desktop hero motion
window.addEventListener("mousemove", (event) => {
  const card = document.querySelector(".hero-card");
  if (!card || window.innerWidth < 850) return;
  const x = (window.innerWidth / 2 - event.clientX) / 45;
  const y = (window.innerHeight / 2 - event.clientY) / 55;
  card.style.transform = `translate(${x}px, ${y}px) rotate(1deg)`;
});

render();
renderCart();
