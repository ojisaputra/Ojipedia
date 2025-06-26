// Data structures
let products = JSON.parse(localStorage.getItem('products')||'[]');
let cart = JSON.parse(localStorage.getItem('cart')||'[]');
let history = JSON.parse(localStorage.getItem('history')||'[]');
let lang = localStorage.getItem('lang')||'id';

// Elements
const productList = document.getElementById('productList');
const cartItems = document.getElementById('cartItems');
const historyList = document.getElementById('historyList');

// Render functions
function renderProducts(){
  productList.innerHTML = '';
  products.forEach((p,i)=>{
    const div=document.createElement('div');div.className='product';
    div.innerHTML=`<img src="${p.img}" alt=""/><h3>${p.name}</h3><p>${p.price}</p><button onclick="addToCart(${i})">${lang==='id'?'Beli':'Buy'}</button>`;
    productList.appendChild(div);
  });
}
function renderCart(){
  cartItems.innerHTML='';
  cart.forEach((c,i)=>{
    const li=document.createElement('li');
    li.textContent=`${c.name} - ${c.price}`;
    cartItems.appendChild(li);
  });
}
function renderHistory(){
  historyList.innerHTML='';
  history.forEach(h=>{
    const li=document.createElement('li');
    li.textContent=h;
    historyList.appendChild(li);
  });
}

// Actions
function addToCart(i){
  cart.push(products[i]);
  localStorage.setItem('cart',JSON.stringify(cart));
  renderCart();
}
document.getElementById('backupBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify(products)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='products_backup.json';a.click();
};
document.getElementById('importBtn').onclick=()=>{
  const fileInput=document.createElement('input');fileInput.type='file';
  fileInput.onchange=e=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{products=JSON.parse(reader.result);localStorage.setItem('products',reader.result);renderProducts();};
    reader.readAsText(file);
  };
  fileInput.click();
};
// History modal
document.getElementById('historyBtn').onclick=()=>{document.getElementById('historySection').style.display='block';renderHistory();};
document.querySelectorAll('.modal .closeBtn').forEach(b=>b.onclick=e=>e.target.closest('.modal').style.display='none');
// Admin panel
document.getElementById('adminBtn').onclick=()=>document.getElementById('adminSection').style.display='block';
document.getElementById('adminLogin').onclick=()=>{
  if(document.getElementById('adminPass').value==='admin123'){
    document.getElementById('adminControls').classList.remove('hidden');
  } else alert('Password salah');
};
document.getElementById('addProdBtn').onclick=()=>{
  const name=document.getElementById('prodName').value;
  const price=document.getElementById('prodPrice').value;
  const file=document.getElementById('prodImage').files[0];
  const reader=new FileReader();
  reader.onload=()=>{
    products.push({name,price,img:reader.result});
    localStorage.setItem('products',JSON.stringify(products));
    renderProducts();
  };
  reader.readAsDataURL(file);
};
// Language switch
document.getElementById('langBtn').onclick=()=>{
  lang = lang==='id'?'en':'id';
  localStorage.setItem('lang',lang);
  // Simple translations
  document.getElementById('title').textContent = lang==='id'?'TopUp All-In':'TopUp All-In';
  document.getElementById('subtitle').textContent = lang==='id'?'Layanan top-up pulsa, kuota, e-wallet, dan lainnya':'Top-up services: pulsa, data, e-wallet, etc';
  document.getElementById('prodTitle').textContent = lang==='id'?'Daftar Produk':'Product List';
  document.getElementById('cartTitle').textContent = lang==='id'?'Keranjang':'Cart';
  renderProducts(); renderCart();
};
// Help modal
document.getElementById('helpBtn').onclick=()=>document.getElementById('helpSection').style.display='block';

// Initial render
renderProducts(); renderCart();
