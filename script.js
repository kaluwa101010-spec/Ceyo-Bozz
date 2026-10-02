const products=[
{name:"Urban Essential Tee",price:3850,cat:"T-Shirts",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85"},
{name:"Classic Black Tee",price:4250,cat:"T-Shirts",img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85"},
{name:"Street Hoodie",price:6950,cat:"Hoodies",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85"},
{name:"Relaxed Pants",price:5950,cat:"Pants",img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85"},
{name:"Everyday Cap",price:2950,cat:"Accessories",img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=85"},
{name:"Oversized Tee",price:4450,cat:"T-Shirts",img:"https://images.unsplash.com/photo-1583743814966-8936f37f2096?auto=format&fit=crop&w=800&q=85"},
{name:"Cargo Pants",price:6250,cat:"Pants",img:"https://images.unsplash.com/photo-1517445312882-0f0a1d3b5b7a?auto=format&fit=crop&w=800&q=85"},
{name:"Minimal Hoodie",price:7250,cat:"Hoodies",img:"https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=85"}];
let cart=[];const productsEl=document.getElementById("products");
function renderProducts(cat="All"){productsEl.innerHTML=products.filter(p=>cat==="All"||p.cat===cat).map((p,i)=>`<article class="card"><img src="${p.img}" alt="${p.name}"><div class="card-info"><h3>${p.name}</h3><div class="price">LKR ${p.price.toLocaleString()}</div><button class="add" onclick="addToCart(${products.indexOf(p)})">Add to Cart</button></div></article>`).join("")}
function addToCart(i){cart.push(products[i]);renderCart()}
function renderCart(){document.getElementById("cartCount").textContent=cart.length;document.getElementById("cartItems").innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><span>${p.name}</span><b>LKR ${p.price.toLocaleString()}</b></div>`).join(""):"<p>Your cart is empty.</p>";document.getElementById("cartTotal").textContent=cart.reduce((s,p)=>s+p.price,0).toLocaleString()}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.cat)});
document.getElementById("cartBtn").onclick=()=>document.getElementById("cartPanel").classList.add("open");
document.getElementById("closeCart").onclick=()=>document.getElementById("cartPanel").classList.remove("open");
document.getElementById("contactForm").onsubmit=e=>{e.preventDefault();alert("Thanks! CEYO CLOTHING will contact you soon.");e.target.reset()};renderProducts();