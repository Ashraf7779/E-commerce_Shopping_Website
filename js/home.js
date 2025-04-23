// Define formatIndianCurrency globally
function formatIndianCurrency(amount) {
  let x = amount.toString();
  let lastThree = x.substring(x.length - 3);
  let otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return result;
}

// Store product data globally for search and filtering
const productData = {
  itemNames: ['Collar Kurta', 'Lenovo LOQ 2024, Intel Core i7', 'Noise Airwave Max 4 Wireless Headphones', 'Victorinox Stainless Steel Watch', 'LEQTRONIQ Digital Camera', 'iPhone 16 Pro Max 256 GB 5G Mobile Phone', 'Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free', 'Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones', 'Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display', 'Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE','LG 15 Kg, AI Direct Drive Technology, Wi-Fi, Steam Fully Automatic Front-Loading Washing Machine','Hitachi 2 Ton Class 5 Star AC, 4-Way Swing, ice Clean, Xpandable+',
    'JBL Go 4, Wireless Ultra Portable Bluetooth Speaker, Pro Sound','Karatcart Women Green American Diamond Stud Earrings','ZAVERI PEARLS Ethnic Kundan & Pearls Multi Layers Bridal Necklace Set For Women','Panasonic 23L Convection Microwave Oven(NN-CT353BFDG,Black Mirror, 360° Heat Wrap, Magic Grill)','Sony PS5® Console Video Game Digital - Fortnite Bundle (Slim)','ShopMahal Brand - Myx Womens Embroidered Kurta Pant Set with Organza Dupatta','Madame Embossed Cotton Blend Coffee Brown Top for Women','ShopMahal Womens Woven Design Ethnic Motif Georgette Kanjeevaram Saree With Unstiched Blouse Piece','Campus Artemis Mens Lace-Up Running Shoes',
    'U.S. POLO ASSN. Mens Brown Solid Mid Rise Cotton Button Slim Fit Trousers','MANQ Mens Slim Fit Single Breasted Blazer','Olivia Burton Ultra Slim Qtz Basic Dial Womens Watch','Conbre BulbXR 2MP Full HD Indoor Wireless WiFi CCTV Security Camera | Motion Tracking','Storio Rechargeable Toys Talking Cactus Baby Toys for Kids Dancing','HUDA GIRL Beauty Rose Gold Remastered + Nude Edition Eyeshadow Palette Combo Kit - 36 Matte and Shimmer Finishes, Includes Black Eyeshadow','KALP 2025 Dated Planner Kit | A5, 400 Pages',
  ],
  prices: [550, 99990, 1699, 106240, 15999, 122900, 69980, 17881, 53999, 12495,86207,54990,3699,299,368,10590,44990,1499,1299,1699,1199,2599,2374,8800,1299,365,299,1299],
  images: [
    'assests/Kurta.webp',
    'assests/Laptop_Lenovo.webp',
    'assests/Headphone_Noise.webp',
    'assests/Watch_Victorinox.webp',
    'assests/LEQTRONIQ Digital Camera.webp',
    'assests/iPhone 16 Pro Max 256 GB 5G Mobile Phone.webp',
    'assests/Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free.webp',
    'assests/Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones.webp',
    'assests/Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display.webp',
    'assests/Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE.webp',
    'assests/washing_machine.webp',
    'assests/AC_Hitachi.webp',
    'assests/JBL_Speaker.webp',
    'assests/Karatcart_Earrings.webp',
    'assests/Bridal_Necklace.webp',
    'assests/Micro_Oven.webp',
    'assests/ps5.webp',
    'assests/women_kurta.webp',
    'assests/women_top.webp',
    'assests/women_saree.webp',
    'assests/Campus_Shoe.webp',
    'assests/us_polo_pantMen.webp',
    'assests/Mens_Suite.webp',
    'assests/Womens_watch.webp',
    'assests/CCtv_Camera.webp',
    'assests/Kids_toy.webp',
    'assests/beauty_pack.webp',
    'assests/KALP_book.webp',
  ],
  categories: ['men-wear', 'electronics', 'home-gadgets', 'accessories', 'electronics', 'electronics', 'home-gadgets', 'accessories', 'electronics', 'electronics']
};

let currentUser = localStorage.getItem('currentUser') || 'guest';

function getUserKey(key) {
  return `${key}_${currentUser}`;
}

// Load products based on category or random selection
function loadProducts(category = null) {
  const productList = document.getElementById('product-list');
  if (!productList) {
    console.error('Product list container not found!');
    return;
  }
  productList.innerHTML = '';

  let filteredIndices = [];
  if (category) {
    filteredIndices = productData.itemNames
      .map((name, index) => ({ name, index, cat: productData.categories[index] }))
      .filter(item => item.cat === category)
      .map(item => item.index);
    console.log(`Filtered by category ${category}:`, filteredIndices);
  } else {
    while (filteredIndices.length < 28) { // Limit to 4 random items
      const randomIndex = Math.floor(Math.random() * productData.itemNames.length);
      if (!filteredIndices.includes(randomIndex)) filteredIndices.push(randomIndex);
    }
    console.log('Random indices generated:', filteredIndices);
  }

  if (filteredIndices.length === 0) {
    productList.innerHTML = '<p class="no-products-found">No products found</p>';
  } else {
    filteredIndices.forEach(index => {
      const product = document.createElement('div');
      product.className = 'product-card';
      product.innerHTML = `
        <div class="content-wrapper">
          <img src="${productData.images[index]}" alt="${productData.itemNames[index]}">
          <div class="product-info">
            <h3>${productData.itemNames[index]}</h3>
            <p>₹${formatIndianCurrency(productData.prices[index])}</p>
          </div>
        </div>
        <button onclick="addToCart('${productData.itemNames[index]}', ${productData.prices[index]})">Add to Cart</button>
      `;
      productList.appendChild(product);
    });
  }
}

// Handle category filtering from URL
function handleCategoryFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  if (category) {
    loadProducts(category);
  } else {
    loadProducts(); // Load random products if no category
  }
}

// Search function
function searchProducts() {
  const searchBar = document.getElementById('search-bar');
  if (!searchBar) {
    console.error('Search bar not found!');
    return;
  }
  const searchTerm = searchBar.value.trim().toLowerCase();
  const productList = document.getElementById('product-list');
  if (!productList) {
    console.error('Product list container not found!');
    return;
  }

  if (!searchTerm) {
    handleCategoryFilter();
    return;
  }

  const filteredIndices = productData.itemNames
    .map((name, index) => ({ name, index }))
    .filter(item => item.name.toLowerCase().includes(searchTerm))
    .map(item => item.index);

  productList.innerHTML = '';
  if (filteredIndices.length === 0) {
    productList.innerHTML = '<p class="no-products-found">No products found</p>';
  } else {
    filteredIndices.forEach(index => {
      const product = document.createElement('div');
      product.className = 'product-card';
      product.innerHTML = `
        <div class="content-wrapper">
          <img src="${productData.images[index]}" alt="${productData.itemNames[index]}">
          <div class="product-info">
            <h3>${productData.itemNames[index]}</h3>
            <p>₹${formatIndianCurrency(productData.prices[index])}</p>
          </div>
        </div>
        <button onclick="addToCart('${productData.itemNames[index]}', ${productData.prices[index]})">Add to Cart</button>
      `;
      productList.appendChild(product);
    });
  }
}

// Setup search functionality
function setupSearch() {
  const searchBar = document.getElementById('search-bar');
  if (searchBar) {
    searchBar.addEventListener('input', searchProducts);
  }
  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon) {
    searchIcon.addEventListener('click', searchProducts);
  }
}

// Cart and user management functions
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem(getUserKey('cart')) || '[]');
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ name, price, quantity: 1 });
  localStorage.setItem(getUserKey('cart'), JSON.stringify(cart));
  showNotification(`Added ${name} to cart!`);
  updateCartCount();
}

function showNotification(message) {
  const notification = document.getElementById('cart-notification');
  if (!notification) {
    console.error('Notification element not found!');
    return;
  }
  notification.textContent = message;
  notification.style.display = 'block';
  notification.style.opacity = 1;
  setTimeout(() => {
    notification.style.opacity = 0;
    setTimeout(() => notification.style.display = 'none', 500);
  }, 2000);
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem(getUserKey('cart')) || '[]');
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount > 0 ? cartCount : 0;
  }
}

function login(user) {
  localStorage.setItem('currentUser', user);
  currentUser = user;
  updateCartCount();
}

function logout() {
  localStorage.setItem('currentUser', 'guest');
  currentUser = 'guest';
  updateCartCount();
}

// Set active navigation link
function setActiveNavLink() {
  const page = document.body.getAttribute('data-page');
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    link.classList.remove('active'); // Remove existing active class
    const href = link.getAttribute('href').split('/').pop() || 'index.html'; // Default to index.html for root
    if (page === 'home' && href === 'index.html') {
      link.classList.add('active');
    }
  });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing home.js');
  handleCategoryFilter();
  updateCartCount();
  setupSearch();
  setActiveNavLink(); // Add this to set the active link

  // Dropdown and hamburger toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');

  console.log('Elements:', { navToggle, navMenu, dropdown, dropdownContent });

  if (navToggle && navMenu && dropdown && dropdownContent) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      if (window.innerWidth <= 768) {
        dropdown.classList.remove('active'); // Close dropdown on menu toggle
      }
    });

    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
        console.log('Dropdown toggled, active:', dropdown.classList.contains('active'));
      }
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !dropdown.contains(e.target) && !navToggle.contains(e.target)) {
        dropdown.classList.remove('active');
        console.log('Dropdown closed by outside click');
      }
    });
  } else {
    console.error('Missing elements:', { navToggle, navMenu, dropdown, dropdownContent });
  }
});

updateCartCount();