const products=[
{name:"Essential Black Tee",price:4500,category:"tshirts",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"},
{name:"Classic White Tee",price:4200,category:"tshirts",img:"https://images.unsplash.com/photo-1583743814966-8936f37f2096?auto=format&fit=crop&w=700&q=85"},
{name:"Urban Hoodie",price:7800,category:"hoodies",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85"},
{name:"Street Hoodie",price:8200,category:"hoodies",img:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=700&q=85"},
{name:"Relaxed Cargo",price:6900,category:"pants",img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=85"},
{name:"Everyday Pants",price:6400,category:"pants",img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85"},
{name:"CEYO Cap",price:2500,category:"accessories",img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=85"},
{name:"Classic Backpack",price:5600,category:"accessories",img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85"}
];

let cart=[];
const productsEl=document.getElementById("products");
const cartItems=document.getElementById("cartItems");
const cartCount=document.getElementById("cartCount");
const cartTotal=document.getElementById("cartTotal");

function money(n){return "LKR "+n.toLocaleString("en-LK")}
function renderProducts(category="all"){
  productsEl.innerHTML="";
  products.filter(p=>category==="all"||p.category===category).forEach((p,i)=>{
    productsEl.innerHTML+=`<article class="product-card">
      <img class="product-img" src="${p.img}" alt="${p.name}">
      <div class="product-info"><div class="product-name">${p.name}</div>
      <div class="price">${money(p.price)}</div>
      <button class="add-btn" onclick="addToCart(${i})">Add to Cart</button></div>
    </article>`;
  });
}
function addToCart(i){cart.push(products[i]);updateCart();openCart()}
function removeFromCart(i){cart.splice(i,1);updateCart()}
function updateCart(){
  cartCount.textContent=cart.length;
  cartItems.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row">
    <img src="${p.img}" alt="${p.name}">
    <div><h4>${p.name}</h4><p>${money(p.price)}</p><button class="remove" onclick="removeFromCart(${i})">Remove</button></div>
  </div>`).join(""):"<p>Your cart is empty.</p>";
  cartTotal.textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
const panel=document.getElementById("cartPanel"),overlay=document.getElementById("overlay");
function openCart(){panel.classList.add("open");overlay.classList.add("show")}
function closeCart(){panel.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
overlay.onclick=closeCart;
document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");renderProducts(btn.dataset.category);
});
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll(".nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));
document.getElementById("contactForm").onsubmit=e=>{e.preventDefault();alert("Thank you! Your message has been received.");e.target.reset()};
document.getElementById("checkoutBtn").onclick=()=>{
  if(!cart.length){alert("Your cart is empty.");return}
  alert("Checkout demo: connect a payment gateway to accept real orders.");
};
renderProducts();updateCart();
