const products = [
  { name: "Shoes", price: 999, category: "fashion", rating: 4, image: "./image/shoes.jpg" },
  { name: "Watch", price: 1499, category: "fashion", rating: 5, image: "./image/watch.jpg" },
  { name: "Phone", price: 19999, category: "electronics", rating: 4, image: "./image/phone.jpg" },
  { name: "Headphones", price: 799, category: "electronics", rating: 3, image: "./image/headphones.jpg" },
  { name: "Laptop", price: 54999, category: "electronics", rating: 5, image: "./image/lape.jpg" },
  { name: "Backpack", price: 1299, category: "fashion", rating: 4, image: "./image/backpack.jpg" },
  { name: "Sunglasses", price: 599, category: "fashion", rating: 3, image: "./image/sunglasses.jpg" },
  { name: "Keyboard", price: 899, category: "electronics", rating: 4, image: "./image/keyboard.jpg" },
  { name: "Smart TV", price: 29999, category: "electronics", rating: 5, image: "./image/smarttv.jpg" },
  { name: "T-Shirt", price: 499, category: "fashion", rating: 4, image: "./image/tshirt.jpg" },
  { name: "Handbag", price: 1999, category: "fashion", rating: 5, image: "./image/handbag.jpg" },
  { name: "Lipstick Set", price: 799, category: "beauty", rating: 4, image: "./image/lipstick.jpg" },
  { name: "Perfume", price: 1499, category: "beauty", rating: 5, image: "./image/perfume.jpg" },
  { name: "Earrings", price: 499, category: "fashion", rating: 4, image: "./image/earrings.jpg" },
  { name: "Makeup Kit", price: 2499, category: "beauty", rating: 5, image: "./image/makeupkit.jpg" },
  { name: "Dress", price: 1799, category: "fashion", rating: 5, image: "./image/dress.jpg" },
  { name: "Heels", price: 1299, category: "fashion", rating: 4, image: "./image/heels.jpg" },
  { name: "Skincare Kit", price: 1999, category: "beauty", rating: 5, image: "./image/skincare.jpg" },
  { name: "Hair Straightener", price: 1499, category: "beauty", rating: 4, image: "./image/hairstraightener.jpg" }, 
  { name: "Bracelet", price: 699, category: "fashion", rating: 4, image: "./image/bracelet.jpg" }, 
  { name: "Table Lamp", price: 899, category: "home", rating: 4, image: "./image/tablelamp.jpg" }, 
  { name: "Wall Clock", price: 599, category: "home", rating: 4, image: "./image/clock.jpg" }, 
  { name: "Cushion Set", price: 799, category: "home", rating: 5, image: "./image/cushion.jpg" }, 
  { name: "Curtains", price: 1299, category: "home", rating: 4, image: "./image/curtains.jpg" }, 
  { name: "Flower Vase", price: 499, category: "home", rating: 5, image: "./image/vase.jpg" }, 
  { name: "Wall Art Frame", price: 999, category: "home", rating: 5, image: "./image/wallart.jpg" }, 
  { name: "Bed Lamp", price: 699, category: "home", rating: 4, image: "./image/bedlamp.jpg" }, 
  { name: "Storage Basket", price: 399, category: "home", rating: 4, image: "./image/storagebasket.jpg" }, 
  { name: "Carpet Rug", price: 1999, category: "home", rating: 5, image: "./image/carpet.jpg" }, 
  { name: "Showpiece Statue", price: 599, category: "home", rating: 4, image: "./image/statue.jpg" } 
];


// ================= DISPLAY PRODUCTS =================
function displayProducts(productList) {
  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = "";

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  productList.forEach((p) => {
    let isWishlisted = wishlist.some(item => item.name === p.name);
    let heart = isWishlisted ? "❤️" : "🤍";
    let stars = "⭐".repeat(p.rating);

    container.innerHTML += `
      <div class="card" onclick="openProductByName('${p.name}')">

        <span class="wishlist-icon" onclick="event.stopPropagation(); toggleWishlist('${p.name}')">
          ${heart}
        </span>

        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p>${stars}</p>

        <button onclick="event.stopPropagation(); addToCart('${p.name}')">
          Add to Cart
        </button>

      </div>
    `;
  });
}

// ================= CATEGORY FILTER =================
function filterCategory(category) {
  if (category === "all") {
    displayProducts([...products]); // FIX
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

// ================= SEARCH =================
function setupSearch() {
  const search = document.querySelector(".search");

  if (!search) return;

  search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      displayProducts([...products]); // RESET FIX
      return;
    }

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(value) ||
      p.category.toLowerCase().includes(value)
    );

    displayProducts(filtered);
  });
}

// ================= ADD TO CART =================
function addToCart(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products.find(p => p.name === name);

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart 🛒");
}

// ================= WISHLIST =================
function toggleWishlist(name) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  let index = wishlist.findIndex(item => item.name === name);

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    let product = products.find(p => p.name === name);
    wishlist.push(product);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  updateWishlistCount();
  displayProducts([...products]);
}

// ================= COUNTS =================
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const el = document.getElementById("cart-count");
  if (el) el.innerText = cart.length;
}

function updateWishlistCount() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const el = document.getElementById("wishlist-count");
  if (el) el.innerText = wishlist.length;
}

// ================= NAVIGATION =================
function goToCart() {
  window.location.href = "cart.html";
}

function goToWishlist() {
  window.location.href = "wishlist.html";
}

function openProductByName(name) {
  const product = products.find(p => p.name === name);
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product.html";
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  displayProducts([...products]);
  updateCartCount();
  updateWishlistCount();
  setupSearch();
});