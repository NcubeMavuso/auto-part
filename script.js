// Sample product data
const products = [
    {
        id: 1,
        title: "High Performance Air Filter",
        description: "Premium air filter for improved engine performance and fuel efficiency.",
        price: 45.99,
        category: "engine",
        image: "images/products/air-filter.jpg",
        fallbackIcon: "fas fa-wind",
        options: [
            { name: "Size", values: ["Small", "Medium", "Large"] },
            { name: "Type", values: ["Standard", "High Flow", "Performance"] }
        ],
        inStock: true
    },
    {
        id: 2,
        title: "Carbon Fiber Brake Pads",
        description: "Advanced carbon fiber brake pads for superior stopping power.",
        price: 89.99,
        category: "brakes",
        image: "images/products/brake-pads.jpg",
        fallbackIcon: "fas fa-circle-notch",
        options: [
            { name: "Compound", values: ["Street", "Track", "Hybrid"] },
            { name: "Vehicle Type", values: ["Sedan", "SUV", "Sports Car"] }
        ],
        inStock: true
    },
    {
        id: 3,
        title: "Adjustable Coilover Suspension",
        description: "Fully adjustable coilover suspension system for perfect handling.",
        price: 599.99,
        category: "suspension",
        image: "images/products/coilovers.jpg",
        fallbackIcon: "fas fa-car-side",
        options: [
            { name: "Spring Rate", values: ["Soft", "Medium", "Hard"] },
            { name: "Height Adjustment", values: ["Yes", "No"] }
        ],
        inStock: true
    },
    {
        id: 4,
        title: "Stainless Steel Exhaust System",
        description: "Complete stainless steel exhaust system with deep tone.",
        price: 299.99,
        category: "exhaust",
        image: "images/products/exhaust.jpg",
        fallbackIcon: "fas fa-tools",
        options: [
            { name: "Tip Style", values: ["Single", "Dual", "Quad"] },
            { name: "Sound Level", values: ["Quiet", "Moderate", "Loud"] }
        ],
        inStock: false
    },
    {
        id: 5,
        title: "LED Headlight Conversion Kit",
        description: "Complete LED headlight conversion kit with plug-and-play installation.",
        price: 149.99,
        category: "electrical",
        image: "images/products/led-lights.jpg",
        fallbackIcon: "fas fa-bolt",
        options: [
            { name: "Color Temperature", values: ["3000K", "6000K", "8000K"] },
            { name: "Beam Pattern", values: ["Flood", "Spot", "Combo"] }
        ],
        inStock: true
    },
    {
        id: 6,
        title: "Premium Leather Steering Wheel",
        description: "Hand-stitched premium leather steering wheel with custom grip.",
        price: 199.99,
        category: "interior",
        image: "images/products/steering-wheel.jpg",
        fallbackIcon: "fas fa-chair",
        options: [
            { name: "Leather Type", values: ["Standard", "Premium", "Luxury"] },
            { name: "Color", values: ["Black", "Brown", "Tan"] }
        ],
        inStock: true
    }
];

// Categories
const categories = {
    'all': 'All Products',
    'engine': 'Engine Parts',
    'brakes': 'Brake System',
    'suspension': 'Suspension',
    'exhaust': 'Exhaust System',
    'electrical': 'Electrical',
    'interior': 'Interior Parts',
    'exterior': 'Exterior Parts',
    'performance': 'Performance'
};

// Current filter state
let currentCategory = 'all';
let currentSearch = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    loadProductFromURL();
    updateSocialMediaLinksOnPage();
    updateCartDisplay(); // Initialize cart display
});

// Setup event listeners
function setupEventListeners() {
    // Category filter
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.toLowerCase();
            filterProducts();
        });
        
        // Add Enter key support
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Product card clicks
    document.addEventListener('click', function(e) {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
            const productId = parseInt(productCard.getAttribute('data-id'));
            window.location.href = `product.html?id=${productId}`;
        }
    });
}

// Filter products by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active category in sidebar
    document.querySelectorAll('.category-list a').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-category="${category}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update section title
    const sectionTitle = document.querySelector('.section-header h2');
    if (sectionTitle) {
        sectionTitle.textContent = categories[category] || 'Products';
    }
    
    filterProducts();
}

// Filter and display products
function filterProducts() {
    let filteredProducts = products;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentCategory
        );
    }

    // Filter by search term
    if (currentSearch) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(currentSearch) ||
            product.description.toLowerCase().includes(currentSearch)
        );
    }

    displayProducts(filteredProducts);
}

// Display products in the grid
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products" style="text-align: center; padding: 3rem; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or browse different categories.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.title}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                     loading="lazy">
                <div class="product-image-fallback" style="display: none;">
                    <i class="${product.fallbackIcon || 'fas fa-car-parts'}" style="color: #1e3c72;"></i>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="viewProduct(${product.id})">
                        View Details
                    </button>
                    <button class="btn btn-secondary" onclick="safeAddToCart(${product.id})" 
                            ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
                ${!product.inStock ? '<div class="stock-status" style="color: #dc3545; font-size: 0.9rem; margin-top: 0.5rem;">Out of Stock</div>' : ''}
            </div>
        </div>
    `).join('');
}

// View product details
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Shopping Cart System
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Add to cart
function addToCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Product not found');
        }
        
        if (!product.inStock) {
            alert('Sorry, this product is currently out of stock.');
            return;
        }
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                fallbackIcon: product.fallbackIcon,
                quantity: 1,
                category: product.category
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart display
        updateCartDisplay();
        
        // Show success message
        showCartNotification(`${product.title} added to cart!`);
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Sorry, there was an error adding the product to your cart. Please try again.');
    }
}

// Update cart display in header
function updateCartDisplay() {
    const cartCounter = document.getElementById('cartCounter');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartCounter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Show cart notification
function showCartNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    if (typeof displayCart === 'function') {
        displayCart();
    }
}

// Update item quantity in cart
function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        if (typeof displayCart === 'function') {
            displayCart();
        }
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Clear entire cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    if (typeof displayCart === 'function') {
        displayCart();
    }
}

// Load product from URL parameter
function loadProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && categories[category]) {
        filterByCategory(category);
    }
}

// Utility function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Utility function to format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Admin functions (for admin panel)
function addProduct(productData) {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const newProduct = {
        id: newId,
        ...productData
    };
    products.push(newProduct);
    return newProduct;
}

function updateProduct(id, productData) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        return products[index];
    }
    return null;
}

function deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        return products.splice(index, 1)[0];
    }
    return null;
}

// Website content management functions
function getWebsiteContent() {
    return JSON.parse(localStorage.getItem('websiteContent') || '{}');
}

function updateWebsiteContent(key, value) {
    const content = getWebsiteContent();
    content[key] = value;
    localStorage.setItem('websiteContent', JSON.stringify(content));
}

function getContactInfo() {
    const content = getWebsiteContent();
    return {
        phone: content.contactPhone || '+1 (555) 123-4567',
        email: content.contactEmail || 'info@autopartspro.com',
        address: content.contactAddress || '123 Auto Street',
        city: content.contactCity || 'Parts City, PC 12345'
    };
}

function getBusinessHours() {
    const content = getWebsiteContent();
    return {
        weekday: content.weekdayHours || 'Monday - Friday: 9:00 AM - 6:00 PM',
        weekend: content.weekendHours || 'Saturday: 10:00 AM - 4:00 PM',
        sunday: content.sundayHours || 'Sunday: Closed'
    };
}

function getShippingInfo() {
    const content = getWebsiteContent();
    return {
        policy: content.shippingPolicy || 'We offer fast and reliable shipping to all locations.',
        standard: content.standardShipping || '5-7 business days - $9.99',
        express: content.expressShipping || '2-3 business days - $19.99',
        freeThreshold: content.freeShippingThreshold || 'Free shipping on orders over $100'
    };
}

function getAboutUs() {
    const content = getWebsiteContent();
    return content.aboutUs || 'Your trusted source for premium aftermarket car parts. Quality guaranteed, competitive prices.';
}

function getSocialMediaLinks() {
    const content = getWebsiteContent();
    return {
        whatsapp: content.whatsappLink || 'https://wa.me/1234567890',
        tiktok: content.tiktokLink || 'https://tiktok.com/@yourusername',
        facebook: content.facebookLink || 'https://facebook.com/yourpage',
        instagram: content.instagramLink || '',
        youtube: content.youtubeLink || ''
    };
}

function updateSocialMediaLinksOnPage() {
    const socialLinks = getSocialMediaLinks();
    
    // Update WhatsApp link
    const whatsappLink = document.querySelector('.social-link.whatsapp');
    if (whatsappLink) {
        whatsappLink.href = socialLinks.whatsapp;
    }
    
    // Update TikTok link
    const tiktokLink = document.querySelector('.social-link.tiktok');
    if (tiktokLink) {
        tiktokLink.href = socialLinks.tiktok;
    }
    
    // Update Facebook link
    const facebookLink = document.querySelector('.social-link.facebook');
    if (facebookLink) {
        facebookLink.href = socialLinks.facebook;
    }
}

function getPaymentSettings() {
    const content = getWebsiteContent();
    return {
        paymentMethods: content.paymentMethods ? content.paymentMethods.split(',') : [],
        primaryPaymentMethod: content.primaryPaymentMethod || '',
        stripeLink: content.stripeLink || '',
        paypalLink: content.paypalLink || '',
        squareLink: content.squareLink || '',
        cashappLink: content.cashappLink || '',
        venmoLink: content.venmoLink || '',
        bankInfo: content.bankInfo || '',
        paymentInstructions: content.paymentInstructions || '',
        currency: content.currency || 'USD'
    };
}

function getAvailablePaymentMethods() {
    const settings = getPaymentSettings();
    return settings.paymentMethods.filter(method => method.trim() !== '');
}

function getPrimaryPaymentMethod() {
    const settings = getPaymentSettings();
    return settings.primaryPaymentMethod;
}

function getPaymentInstructions() {
    const settings = getPaymentSettings();
    return settings.paymentInstructions;
}

function getCurrency() {
    const settings = getPaymentSettings();
    return settings.currency;
}

// Utility Functions for UX Improvements
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
    }
}

function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
    }
}

function showLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(overlay);
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

function showErrorMessage(message, container) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    if (container) {
        container.insertBefore(errorDiv, container.firstChild);
    } else {
        document.body.appendChild(errorDiv);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function showSuccessMessage(message, container) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    if (container) {
        container.insertBefore(successDiv, container.firstChild);
    } else {
        document.body.appendChild(successDiv);
    }
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Enhanced error handling for cart operations
function safeAddToCart(productId) {
    try {
        showLoadingOverlay();
        addToCart(productId);
        setTimeout(() => {
            hideLoadingOverlay();
        }, 500);
    } catch (error) {
        hideLoadingOverlay();
        showErrorMessage('Failed to add product to cart. Please try again.');
        console.error('Cart error:', error);
    }
}

// Enhanced search with loading state
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchInput && searchButton) {
        showLoading(searchButton);
        
        setTimeout(() => {
            currentSearch = searchInput.value.toLowerCase();
            filterProducts();
            hideLoading(searchButton);
        }, 300);
    }
}
