// Define formatIndianCurrency globally
function formatIndianCurrency(amount) {
  let x = amount.toString();
  let lastThree = x.substring(x.length - 3);
  let otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return result;
}

// Store product data globally
const productData = {
  itemNames: ['Collar Kurta', 'Lenovo LOQ 2024, Intel Core i7', 'Noise Airwave Max 4 Wireless Headphones', 'Victorinox Stainless Steel Watch', 'LEQTRONIQ Digital Camera', 'iPhone 16 Pro Max 256 GB 5G Mobile Phone', 'Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free', 'Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones', 'Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display', 'Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE', 'LG 15 Kg, AI Direct Drive Technology, Wi-Fi, Steam Fully Automatic Front-Loading Washing Machine', 'Hitachi 2 Ton Class 5 Star AC, 4-Way Swing, ice Clean, Xpandable+', 'JBL Go 4, Wireless Ultra Portable Bluetooth Speaker', 'Karatcart Women Green American Diamond Stud Earrings', 'ZAVERI PEARLS Ethnic Kundan & Pearls Multi Layers Bridal Necklace Set For Women', 'Panasonic 23L Convection Microwave Oven(NN-CT353BFDG,Black Mirror, 360° Heat Wrap, Magic Grill)', 'Sony PS5® Console Video Game Digital - Fortnite Bundle (Slim)', 'ShopMahal Brand - Myx Womens Embroidered Kurta Pant Set with Organza Dupatta', 'Madame Embossed Cotton Blend Coffee Brown Top for Women', 'ShopMahal Womens Woven Design Ethnic Motif Georgette Kanjeevaram Saree With Unstiched Blouse Piece', 'Campus Artemis Mens Lace-Up Running Shoes', 'U.S. POLO ASSN. Mens Brown Solid Mid Rise Cotton Button Slim Fit Trousers', 'MANQ Mens Slim Fit Single Breasted Blazer', 'Olivia Burton Ultra Slim Qtz Basic Dial Womens Watch', 'Conbre BulbXR 2MP Full HD Indoor Wireless WiFi CCTV Security Camera | Motion Tracking', 'Storio Rechargeable Toys Talking Cactus Baby Toys for Kids Dancing', 'HUDA GIRL Beauty Rose Gold Remastered + Nude Edition Eyeshadow Palette Combo Kit - 36 Matte and Shimmer Finishes, Includes Black Eyeshadow', 'KALP 2025 Dated Planner Kit | A5, 400 Pages'],
  prices: [550, 99990, 1699, 106240, 15999, 122900, 69980, 17881, 53999, 12495, 86207, 54990, 3699, 299, 368, 10590, 44990, 1499, 1299, 1699, 1199, 2599, 2374, 8800, 1299, 365, 299, 1299],
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
  categories: [
    ['dress', 'men-wear'], 
    ['electronics'], 
    ['electronics'], 
    ['accessories'], 
    ['electronics'],
    ['electronics'], 
    ['electronics', 'home-gadgets'], 
    ['electronics'], 
    ['electronics'],
    ['electronics'],
    ['electronics', 'home-gadgets'], 
    ['electronics', 'home-gadgets'], 
    ['electronics', 'home-gadgets'], 
    ['jewelry', 'accessories'], 
    ['jewelry', 'accessories'], 
    ['electronics', 'home-gadgets'], 
    ['electronics', 'games'], 
    ['dress', 'women-wear'], 
    ['dress', 'women-wear'], 
    ['dress', 'women-wear'], 
    ['footwear'],
    ['dress', 'men-wear'], 
    ['dress', 'men-wear', 'suits'], 
    ['accessories'], 
    ['electronics', 'home-gadgets'], 
    ['toys', 'kids'], 
    ['beauty'],
    ['books-stationery'] 
  ]
};

let currentUser = localStorage.getItem('currentUser') || 'guest';

function getUserKey(key) {
  return `${key}_${currentUser}`;
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem(getUserKey('cart')) || '[]');
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount > 0 ? cartCount : 0;
  }
}

function addToCart(name, price, button) {
  let cart = JSON.parse(localStorage.getItem(getUserKey('cart')) || '[]');
  const existingItem = cart.find(item => item.name === name);
  let quantity = 1;

  if (existingItem) {
    existingItem.quantity += 1;
    quantity = existingItem.quantity;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem(getUserKey('cart'), JSON.stringify(cart));
  showNotification(`Added ${name} to cart!`);
  updateCartCount();

  // Replace button with quantity control
  replaceWithQuantityControl(button, name, quantity);
}

function updateQuantity(name, newQuantity) {
  let cart = JSON.parse(localStorage.getItem(getUserKey('cart')) || '[]');
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    if (newQuantity <= 0) {
      cart = cart.filter(item => item.name !== name); // Remove item if quantity is 0 or less
      showNotification(`${name} removed from cart!`);
    } else {
      existingItem.quantity = newQuantity;
      showNotification(`Updated ${name} quantity to ${newQuantity}!`);
    }
    localStorage.setItem(getUserKey('cart'), JSON.stringify(cart));
    updateCartCount();
  }
}

function showNotification(message) {
  const notification = document.getElementById('cart-notification');
  if (!notification) return;
  notification.textContent = message;
  notification.style.display = 'block';
  notification.style.opacity = 1;
  setTimeout(() => {
    notification.style.opacity = 0;
    setTimeout(() => notification.style.display = 'none', 500);
  }, 2000);
}

function replaceWithQuantityControl(button, name, quantity) {
  const parent = button.parentElement;
  const quantityControl = document.createElement('div');
  quantityControl.className = 'quantity-control';
  quantityControl.innerHTML = `
    <span class="quantity-minus">-</span>
    <span class="quantity-value">${quantity}</span>
    <span class="quantity-plus">+</span>
  `;

  parent.replaceChild(quantityControl, button);

  // Add event listeners for quantity control
  const minus = quantityControl.querySelector('.quantity-minus');
  const plus = quantityControl.querySelector('.quantity-plus');
  const value = quantityControl.querySelector('.quantity-value');

  minus.addEventListener('click', () => {
    let currentQuantity = parseInt(value.textContent);
    if (currentQuantity > 1) {
      currentQuantity--;
      value.textContent = currentQuantity;
      updateQuantity(name, currentQuantity);
    } else {
      updateQuantity(name, 0); // Remove item if quantity becomes 0
      loadProducts(document.body.getAttribute('data-category')); // Reload products to restore "Add to Cart" button
    }
  });

  plus.addEventListener('click', () => {
    let currentQuantity = parseInt(value.textContent);
    currentQuantity++;
    value.textContent = currentQuantity;
    updateQuantity(name, currentQuantity);
  });
}

// Function to render the button or quantity control based on cart state
function renderCartControl(name, price) {
  let cart = JSON.parse(localStorage.getItem(getUserKey('cart')) || '[]');
  const existingItem = cart.find(item => item.name === name);

  if (existingItem && existingItem.quantity > 0) {
    // Item is in cart, render quantity control
    return `
      <div class="quantity-control">
        <span class="quantity-minus">-</span>
        <span class="quantity-value">${existingItem.quantity}</span>
        <span class="quantity-plus">+</span>
      </div>
    `;
  } else {
    // Item not in cart, render Add to Cart button
    return `<button onclick="addToCart('${name}', ${price}, this)">Add to Cart</button>`;
  }
}

function loadProducts(category) {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  productList.innerHTML = '';

  // Handle 'toys-games' as a special case to include both 'toys' and 'games'
  const categoriesToFilter = category === 'toys-games' ? ['toys', 'games'] : [category];
  const indices = Array.from({ length: productData.itemNames.length }, (_, i) => i)
    .filter(i => categoriesToFilter.some(cat => productData.categories[i].includes(cat)));

  const title = category === 'toys-games' ? 'Toys & Games' : category.charAt(0).toUpperCase() + category.slice(1);
  document.querySelector('h2').textContent = `${title} Products`;

  if (indices.length === 0) {
    productList.innerHTML = '<p class="no-products-found">No products found</p>';
  } else {
    indices.forEach(index => {
      const product = document.createElement('div');
      product.className = 'product-card';
      product.innerHTML = `
        <div class="content-wrapper">
          <img src="${productData.images[index]}" alt="${productData.itemNames[index]}" onerror="this.src='assets/placeholder.jpg';">
          <div class="product-info">
            <h3>${productData.itemNames[index]}</h3>
            <p>₹${formatIndianCurrency(productData.prices[index])}</p>
          </div>
        </div>
        ${renderCartControl(productData.itemNames[index], productData.prices[index])}
      `;
      productList.appendChild(product);

      // Attach event listeners to quantity controls if they exist
      const quantityControl = product.querySelector('.quantity-control');
      if (quantityControl) {
        const minus = quantityControl.querySelector('.quantity-minus');
        const plus = quantityControl.querySelector('.quantity-plus');
        const value = quantityControl.querySelector('.quantity-value');
        const name = productData.itemNames[index];

        minus.addEventListener('click', () => {
          let currentQuantity = parseInt(value.textContent);
          if (currentQuantity > 1) {
            currentQuantity--;
            value.textContent = currentQuantity;
            updateQuantity(name, currentQuantity);
          } else {
            updateQuantity(name, 0); // Remove item if quantity becomes 0
            loadProducts(document.body.getAttribute('data-category')); // Reload products
          }
        });

        plus.addEventListener('click', () => {
          let currentQuantity = parseInt(value.textContent);
          currentQuantity++;
          value.textContent = currentQuantity;
          updateQuantity(name, currentQuantity);
        });
      }
    });
  }
}

function searchProducts() {
  const searchBar = document.getElementById('search-bar');
  if (!searchBar) return;
  const searchTerm = searchBar.value.trim().toLowerCase();
  const productList = document.getElementById('product-list');
  if (!productList) return;

  const category = document.body.getAttribute('data-category');
  if (!category) return;

  // Handle 'toys-games' as a special case to include both 'toys' and 'games'
  const categoriesToFilter = category === 'toys-games' ? ['toys', 'games'] : [category];
  if (!searchTerm) {
    loadProducts(category);
    return;
  }

  const filteredIndices = productData.itemNames
    .map((name, index) => ({ name, index }))
    .filter(item => categoriesToFilter.some(cat => productData.categories[item.index].includes(cat)) && item.name.toLowerCase().includes(searchTerm))
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
          <img src="${productData.images[index]}" alt="${productData.itemNames[index]}" onerror="this.src='assets/placeholder.jpg';">
          <div class="product-info">
            <h3>${productData.itemNames[index]}</h3>
            <p>₹${formatIndianCurrency(productData.prices[index])}</p>
          </div>
        </div>
        ${renderCartControl(productData.itemNames[index], productData.prices[index])}
      `;
      productList.appendChild(product);

      // Attach event listeners to quantity controls if they exist
      const quantityControl = product.querySelector('.quantity-control');
      if (quantityControl) {
        const minus = quantityControl.querySelector('.quantity-minus');
        const plus = quantityControl.querySelector('.quantity-plus');
        const value = quantityControl.querySelector('.quantity-value');
        const name = productData.itemNames[index];

        minus.addEventListener('click', () => {
          let currentQuantity = parseInt(value.textContent);
          if (currentQuantity > 1) {
            currentQuantity--;
            value.textContent = currentQuantity;
            updateQuantity(name, currentQuantity);
          } else {
            updateQuantity(name, 0); // Remove item if quantity becomes 0
            loadProducts(document.body.getAttribute('data-category')); // Reload products
          }
        });

        plus.addEventListener('click', () => {
          let currentQuantity = parseInt(value.textContent);
          currentQuantity++;
          value.textContent = currentQuantity;
          updateQuantity(name, currentQuantity);
        });
      }
    });
  }
}

// New function to filter category cards on products.html
function filterCategories() {
  const searchBar = document.getElementById('search-bar');
  if (!searchBar) return;
  const searchTerm = searchBar.value.trim().toLowerCase();
  const categoryCards = document.querySelectorAll('.category-card');
  const productGrid = document.querySelector('.product-grid');

  if (!categoryCards.length || !productGrid) return;

  let visibleCards = 0;

  categoryCards.forEach(card => {
    const categoryName = card.getAttribute('data-category').toLowerCase();
    if (searchTerm === '' || categoryName.includes(searchTerm)) {
      card.style.display = 'flex'; // Show matching cards
      visibleCards++;
    } else {
      card.style.display = 'none'; // Hide non-matching cards
    }
  });

  // Show "No categories found" message if no cards are visible
  let noCategoriesMessage = document.querySelector('.no-categories-found');
  if (!noCategoriesMessage) {
    noCategoriesMessage = document.createElement('p');
    noCategoriesMessage.className = 'no-categories-found';
    productGrid.parentNode.insertBefore(noCategoriesMessage, productGrid.nextSibling);
  }
  if (visibleCards === 0) {
    noCategoriesMessage.textContent = 'No categories found';
    noCategoriesMessage.style.display = 'block';
  } else {
    noCategoriesMessage.style.display = 'none';
  }
}

function setupSearch() {
  const searchBar = document.getElementById('search-bar');
  const searchIcon = document.querySelector('.search-icon');
  const pageType = document.body.getAttribute('data-page');

  if (searchBar) {
    if (pageType === 'categories') {
      searchBar.addEventListener('input', filterCategories);
      if (searchIcon) {
        searchIcon.addEventListener('click', filterCategories);
      }
    } else {
      searchBar.addEventListener('input', searchProducts);
      if (searchIcon) {
        searchIcon.addEventListener('click', searchProducts);
      }
    }
  }
}

// Set active navigation link
function setActiveNavLink() {
  const page = document.body.getAttribute('data-page');
  const category = document.body.getAttribute('data-category');
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    link.classList.remove('active'); // Remove existing active class
    const href = link.getAttribute('href').split('/').pop() || 'index.html';

    // For products.html and category pages, activate the "Products" dropdown link
    if (page === 'products' && link.classList.contains('dropbtn')) {
      link.classList.add('active');
    }

    // For category pages, also activate the corresponding dropdown sub-link
    if (page === 'products' && category) {
      const dropdownLinks = document.querySelectorAll('.dropdown-content a');
      dropdownLinks.forEach(dLink => {
        const dHref = dLink.getAttribute('href').split('/').pop();
        if (dHref === `${category}.html` || (category === 'kids' && dHref === 'kids.html') || (category === 'toys-games' && dHref === 'toys_games.html')) {
          dLink.classList.add('active');
        }
      });
    }
  });
}

// Detect category from data attribute and load products
document.addEventListener('DOMContentLoaded', () => {
  const category = document.body.getAttribute('data-category');
  if (category) {
    loadProducts(category);
  } else {
    console.warn('No category data attribute found on body');
  }
  updateCartCount();
  setupSearch();
  setActiveNavLink();

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');

  if (navToggle && navMenu && dropdown && dropdownContent) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      if (window.innerWidth <= 768) {
        dropdown.classList.remove('active');
      }
    });

    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !dropdown.contains(e.target) && !navToggle.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }
});