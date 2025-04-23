// cart.js
document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  let currentUser = localStorage.getItem('currentUser') || 'guest';

  function getUserKey(key) {
    return `${key}_${currentUser}`;
  }

  const productImages = {
    'Collar Kurta': 'assests/kurta.webp',
    'Lenovo LOQ 2024, Intel Core i7': 'assests/Laptop_Lenovo.webp',
    'Noise Airwave Max 4 Wireless Headphones': 'assests/Headphone_Noise.webp',
    'Victorinox Stainless Steel Watch': 'assests/Watch_Victorinox.webp',
    'LEQTRONIQ Digital Camera': 'assests/LEQTRONIQ Digital Camera.webp',
    'iPhone 16 Pro Max 256 GB 5G Mobile Phone': 'assests/iPhone 16 Pro Max 256 GB 5G Mobile Phone.webp',
    'Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free': 'assests/Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free.webp',
    'Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones': 'assests/Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones.webp',
    'Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display': 'assests/Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display.webp',
    'Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE': 'assests/Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE.webp',
    'LG 15 Kg, AI Direct Drive Technology, Wi-Fi, Steam Fully Automatic Front-Loading Washing Machine': 'assests/washing_machine.webp',
    'Hitachi 2 Ton Class 5 Star AC, 4-Way Swing, ice Clean, Xpandable+':'assests/AC_Hitachi.webp',
    'JBL Go 4, Wireless Ultra Portable Bluetooth Speaker, Pro Sound':'assests/JBL_Speaker.webp',
    'Karatcart Women Green American Diamond Stud Earrings':'assests/Karatcart_Earrings.webp',
    'ZAVERI PEARLS Ethnic Kundan & Pearls Multi Layers Bridal Necklace Set For Women':'assests/Bridal_Necklace.webp',
    'Panasonic 23L Convection Microwave Oven(NN-CT353BFDG,Black Mirror, 360° Heat Wrap, Magic Grill)':'assests/Micro_Oven.webp',
    'Sony PS5® Console Video Game Digital - Fortnite Bundle (Slim)':'assests/ps5.webp',
    'ShopMahal Brand - Myx Womens Embroidered Kurta Pant Set with Organza Dupatta':'assests/women_kurta.webp',
    'Madame Embossed Cotton Blend Coffee Brown Top for Women':'assests/women_top.webp',
    'ShopMahal Womens Woven Design Ethnic Motif Georgette Kanjeevaram Saree With Unstiched Blouse Piece':'assests/women_saree.webp',
    'Campus Artemis Mens Lace-Up Running Shoes':'assests/Campus_Shoe.webp',
    'U.S. POLO ASSN. Mens Brown Solid Mid Rise Cotton Button Slim Fit Trousers':'assests/us_polo_pantMen.webp',
    'MANQ Mens Slim Fit Single Breasted Blazer':'assests/Mens_Suite.webp',
    'Olivia Burton Ultra Slim Qtz Basic Dial Womens Watch':'assests/Womens_watch.webp',
    'Conbre BulbXR 2MP Full HD Indoor Wireless WiFi CCTV Security Camera | Motion Tracking':'assests/CCtv_Camera.webp',
    'Storio Rechargeable Toys Talking Cactus Baby Toys for Kids Dancing':'assests/Kids_toy.webp',
    'HUDA GIRL Beauty Rose Gold Remastered + Nude Edition Eyeshadow Palette Combo Kit - 36 Matte and Shimmer Finishes, Includes Black Eyeshadow':'assests/beauty_pack.webp',
    'KALP 2025 Dated Planner Kit | A5, 400 Pages':'assests/KALP_book.webp',
  };

  function formatIndianCurrency(amount) {
    let x = amount.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return result;
  }

  function displayCart() {
    if (!cartItems || !cartTotal) {
      console.error('Cart items or total container not found!');
      return;
    }
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    cartItems.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart" style="color:black;font-weight:bold;">Your cart is empty.</p>';
    } else {
      cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item-card';
        const imageSrc = productImages[item.name] || 'https://via.placeholder.com/100?text=Product';
        itemDiv.innerHTML = `
          <img src="${imageSrc}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h4>${item.name} <span class="quantity">x ${item.quantity}</span></h4>
            <div class="price-remove">
              <span class="price">₹${formatIndianCurrency(item.price * item.quantity)}</span>
              <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
          </div>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
      });
    }
    cartTotal.textContent = `₹${formatIndianCurrency(total)}`;
    updateCartCount();
  }

  window.removeFromCart = function(name) {
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity -= 1;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      localStorage.setItem(getUserKey('cart'), JSON.stringify(cart));
      displayCart();
    }
  };

  window.checkout = function() {
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    if (cart.length === 0) {
      alert('Your cart is empty. Add items before checking out!');
      return;
    }
    localStorage.setItem(getUserKey('checkoutCart'), JSON.stringify(cart));
    window.location.href = 'checkout.html';
  };

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cartCount > 0 ? cartCount : 0;
      console.log(`Cart count for ${currentUser} updated to:`, cartCount);
    } else {
      console.error('Cart count element not found!');
    }
  }

  displayCart();
  updateCartCount();
});

// Ensure initial cart count is updated on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  displayCart();
});