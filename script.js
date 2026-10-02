const products=[
["Ceyo Essential Tee",3850,"T-Shirts","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
["Heavyweight White Tee",4250,"T-Shirts","https://images.unsplash.com/photo-1583743814966-8936f37f2096?auto=format&fit=crop&w=900&q=85"],
["Black Oversized Tee",4450,"T-Shirts","https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"],
["Minimal Cream Tee",4350,"T-Shirts","https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85"],
["Ceyo Street Hoodie",6950,"Hoodies","https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85"],
["Essential Grey Hoodie",7250,"Hoodies","https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85"],
["Classic Zip Hoodie",7450,"Hoodies","https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85"],
["Street Cargo Pants",6250,"Pants","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"],
["Relaxed Black Pants",5950,"Pants","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
["Everyday Joggers",5750,"Pants","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
["Ceyo Denim",6950,"Pants","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
["Classic Cap",2950,"Accessories","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
["Street Backpack",5950,"Accessories","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
["Everyday Sneakers",8950,"Accessories","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
["Urban Crossbody",4250,"Accessories","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
["Ceyo Tote Bag",3250,"Accessories","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"]
];
let cart=[];
const el=id=>document.getElementById(id);
function render(cat="All"){
 el("products").innerHTML=products.map((p,i)=>({p,i})).filter(x=>cat==="All"||x.p[2]===cat).map(x=>`<article class="product"><div class="product-img"><img src="${x.p[3]}" alt="${x.p[0]}"><span class="tag">CEYO</span></div><div class="product-info"><h3>${x.p[0]}</h3><div class="price">LKR ${x.p[1].toLocaleString()}</div><button class="add" onclick="add(${x.i})">ADD TO BAG</button></div></article>`).join("");
}
function add(i){cart.push(products[i]);renderCart();el("cart").classList.add("open")}
function renderCart(){el("cartCount").textContent=cart.length;el("cartItems").innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><span>${p[0]}</span><b>LKR ${p[1].toLocaleString()}</b></div>`).join(""):"<p>Your bag is empty.</p>";el("cartTotal").textContent=cart.reduce((s,p)=>s+p[1],0).toLocaleString()}
function setCategory(cat){document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.cat===cat));render(cat)}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>setCategory(b.dataset.cat));
el("cartBtn").onclick=()=>el("cart").classList.add("open");el("closeCart").onclick=()=>el("cart").classList.remove("open");
el("contactForm").onsubmit=e=>{e.preventDefault();alert("Thanks! CEYO CLOTHING will contact you soon.");e.target.reset()};
render();