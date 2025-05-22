// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const menuItemsContainer = document.getElementById('menu-items');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Menu Data
const menuItems = [
    {
        id: 1,
        title: "Buah Potong",
        category: "buah",
        price: 12,
        img: "./images/buahPotong.jpg",
        desc: "Aneka pilihan buah potong segar dengan variasi sesuai request"
    },
    {
        id: 2,
        title: "Avocado Toast",
        category: "buah",
        price: 7.50,
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        desc: "Sourdough bread with smashed avocado, cherry tomatoes, and feta"
    },
    {
        id: 3,
        title: "Classic Burger",
        category: "lunch",
        price: 12.99,
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        desc: "Beef patty with cheese, lettuce, tomato, and special sauce"
    },
    {
        id: 4,
        title: "Caesar Salad",
        category: "lunch",
        price: 9.99,
        img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        desc: "Romaine lettuce, croutons, parmesan cheese with Caesar dressing"
    },
    {
        id: 5,
        title: "Spaghetti Bolognese",
        category: "dinner",
        price: 14.99,
        img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        desc: "Classic spaghetti with rich meat sauce and parmesan cheese"
    },
    {
        id: 6,
        title: "Grilled Salmon",
        category: "dinner",
        price: 16.99,
        img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        desc: "Fresh salmon fillet with lemon butter sauce and vegetables"
    },
    {
        id: 7,
        title: "Chocolate Cake",
        category: "dessert",
        price: 6.99,
        img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        desc: "Rich chocolate cake with chocolate ganache and berries"
    },
    {
        id: 8,
        title: "Tiramisu",
        category: "dessert",
        price: 7.50,
        img: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        desc: "Classic Italian dessert with coffee-soaked ladyfingers"
    }
];

// Cart
let cart = [];

// Event Listeners
burger.addEventListener('click', toggleNav);
filterButtons.forEach(btn => btn.addEventListener('click', filterMenu));
cartBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menuItems);
    updateCartCount();
});

// Functions
function toggleNav() {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
}

function displayMenuItems(menuItems) {
    menuItemsContainer.innerHTML = '';
    
    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.dataset.category = item.category;
        
        menuItemElement.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="menu-item-content">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div class="menu-item-price">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        menuItemsContainer.appendChild(menuItemElement);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

function filterMenu(e) {
    const category = e.currentTarget.dataset.category;
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    if (category === 'all') {
        displayMenuItems(menuItems);
    } else {
        const filteredItems = menuItems.filter(item => item.category === category);
        displayMenuItems(filteredItems);
    }
}

function addToCart(e) {
    const id = parseInt(e.target.dataset.id);
    const menuItem = menuItems.find(item => item.id === id);
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...menuItem,
            quantity: 1
        });
    }
    
    updateCartCount();
    showAddToCartFeedback(e.target);
}

function showAddToCartFeedback(button) {
    button.textContent = 'Added!';
    button.style.backgroundColor = '#2ed573';
    
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '#ffa502';
    }, 1000);
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function openCart() {
    displayCartItems();
    cartModal.style.display = 'flex';
}

function closeCart() {
    cartModal.style.display = 'none';
}

function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItemElement.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <div class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

function decreaseQuantity(e) {
    const id = parseInt(e.target.dataset.id);
    const item = cart.find(item => item.id === id);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== id);
    }
    
    updateCartCount();
    displayCartItems();
}

function increaseQuantity(e) {
    const id = parseInt(e.target.dataset.id);
    const item = cart.find(item => item.id === id);
    item.quantity += 1;
    
    updateCartCount();
    displayCartItems();
}

function removeItem(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    cart = cart.filter(item => item.id !== id);
    
    updateCartCount();
    displayCartItems();
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            toggleNav();
        }
    });
});
