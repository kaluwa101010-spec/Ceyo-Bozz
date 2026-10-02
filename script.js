const products=[
["CEYO Black Tee",3850,"T-Shirts","product-1.jpg"],
["CEYO White Tee",4250,"T-Shirts","product-2.jpg"],
["CEYO Navy Tee",4350,"T-Shirts","product-3.jpg"],
["CEYO White Oversized Tee",4450,"T-Shirts","product-4.jpg"],
["CEYO Black Cargo Pants",6250,"Pants","product-5.jpg"],
["CEYO Grey Wide Pants",5950,"Pants","product-6.jpg"]
];[];
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