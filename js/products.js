// ========================================
// Products Page Functionality
// ========================================

// Filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('productsGrid');
const productsCount = document.getElementById('productsCount');
const sortSelect = document.getElementById('sortSelect');

let currentFilter = 'all';
let currentSort = 'featured';

// ========================================
// Filter Products
// ========================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Get filter category
        currentFilter = btn.getAttribute('data-filter');
        
        // Apply filter
        applyFilters();
    });
});

// ========================================
// Sort Products
// ========================================
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFilters();
    });
}

// ========================================
// Apply Filters and Sorting
// ========================================
function applyFilters() {
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    // Filter products
    const filteredProducts = products.filter(product => {
        const category = product.getAttribute('data-category');
        return currentFilter === 'all' || category === currentFilter;
    });
    
    // Sort products
    const sortedProducts = sortProducts(filteredProducts, currentSort);
    
    // Hide all products first
    products.forEach(product => {
        product.style.display = 'none';
        product.style.animation = 'none';
    });
    
    // Show filtered and sorted products with animation
    sortedProducts.forEach((product, index) => {
        setTimeout(() => {
            product.style.display = 'block';
            product.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, index * 50);
        
        // Re-append to grid in sorted order
        productsGrid.appendChild(product);
    });
    
    // Update count
    updateProductCount(filteredProducts.length);
}

// ========================================
// Sort Products Logic
// ========================================
function sortProducts(products, sortType) {
    const sorted = [...products];
    
    switch(sortType) {
        case 'price-low':
            sorted.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));
                return priceA - priceB;
            });
            break;
            
        case 'price-high':
            sorted.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));
                return priceB - priceA;
            });
            break;
            
        case 'name':
            sorted.sort((a, b) => {
                const nameA = a.getAttribute('data-name').toLowerCase();
                const nameB = b.getAttribute('data-name').toLowerCase();
                return nameA.localeCompare(nameB);
            });
            break;
            
        default: // featured
            // Keep original order
            break;
    }
    
    return sorted;
}

// ========================================
// Update Product Count
// ========================================
function updateProductCount(count) {
    if (productsCount) {
        const text = count === 1 ? 'product' : 'products';
        productsCount.textContent = `Showing ${count} ${text}`;
    }
}

// ========================================
// URL Parameter Handling
// ========================================
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        currentFilter = category;
        
        // Update active filter button
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            }
        });
        
        applyFilters();
    }
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    handleURLParams();
    
    // Initial count
    const totalProducts = document.querySelectorAll('.product-card').length;
    updateProductCount(totalProducts);
});

// ========================================
// Search Functionality (Optional Enhancement)
// ========================================
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const name = product.getAttribute('data-name').toLowerCase();
        const category = product.querySelector('.product-category').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        const matches = name.includes(searchTerm) || 
                       category.includes(searchTerm) || 
                       description.includes(searchTerm);
        
        product.style.display = matches ? 'block' : 'none';
    });
}

// ========================================
// Price Range Filter (Optional Enhancement)
// ========================================
function filterByPriceRange(min, max) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const price = parseFloat(product.getAttribute('data-price'));
        
        if (price >= min && price <= max) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Export functions for potential use
window.searchProducts = searchProducts;
window.filterByPriceRange = filterByPriceRange;