// ===========================================
// MAIN APPLICATION ENTRY POINT
// ===========================================

import Header from './components/header.js';
import Cart from './components/cart.js';
import HomePage from './pages/home.js';
import ProductPage from './pages/product.js';
import CheckoutPage from './pages/checkout.js';
import { storage } from './utils/helpers.js';
import { STORAGE_KEYS, EVENTS } from './utils/constants.js';

class App {
  constructor() {
    this.currentPage = null;
    this.components = {};
    this.isInitialized = false;
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }
  
  initialize() {
    try {
      // Initialize core components
      this.initializeComponents();
      
      // Initialize page-specific functionality
      this.initializePage();
      
      // Set up global event listeners
      this.bindGlobalEvents();
      
      // Set up theme
      this.initializeTheme();
      
      // Set up analytics (if enabled)
      this.initializeAnalytics();
      
      // Mark as initialized
      this.isInitialized = true;
      
      console.log('OpenMarket application initialized successfully');
      
    } catch (error) {
      console.error('Application initialization error:', error);
      this.handleInitializationError(error);
    }
  }
  
  initializeComponents() {
    // Initialize Header component (always present)
    const headerElement = document.querySelector('.header');
    if (headerElement) {
      this.components.header = new Header();
    }
    
    // Initialize Cart component (always present)
    this.components.cart = Cart.getInstance();
    
    console.log('Core components initialized');
  }
  
  initializePage() {
    const path = window.location.pathname;
    const page = this.getPageFromPath(path);
    
    switch (page) {
      case 'home':
        this.initializeHomePage();
        break;
      case 'product':
        this.initializeProductPage();
        break;
      case 'cart':
        this.initializeCartPage();
        break;
      case 'checkout':
        this.initializeCheckoutPage();
        break;
      default:
        console.log(`No specific initialization for page: ${page}`);
    }
    
    this.currentPage = page;
  }
  
  initializeHomePage() {
    const homeContainer = document.querySelector('.home-page, .main-content');
    if (homeContainer) {
      this.components.homePage = new HomePage();
      console.log('Home page initialized');
    }
  }
  
  initializeProductPage() {
    const productContainer = document.querySelector('.product-page, .product-container');
    if (productContainer) {
      this.components.productPage = new ProductPage();
      console.log('Product page initialized');
    }
  }
  
  initializeCartPage() {
    // Cart page specific initialization
    const cartContainer = document.querySelector('.cart-page');
    if (cartContainer) {
      // Initialize cart page functionality
      this.initializeCartPageFeatures();
      console.log('Cart page initialized');
    }
  }
  
  initializeCheckoutPage() {
    const checkoutContainer = document.querySelector('.checkout-page, .checkout-form');
    if (checkoutContainer) {
      this.components.checkoutPage = new CheckoutPage();
      console.log('Checkout page initialized');
    }
  }
  
  initializeCartPageFeatures() {
    // Additional cart page features that aren't in the sidebar cart component
    const cartItems = this.components.cart.getCartItems();
    
    if (cartItems.length === 0) {
      this.showEmptyCartMessage();
      return;
    }
    
    // Render cart items on cart page
    this.renderCartPageItems(cartItems);
    this.bindCartPageEvents();
  }
  
  renderCartPageItems(items) {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = items.map(item => `
      <div class="cart-page-item" data-item-id="${item.id}">
        <div class="cart-page-item__image">
          <img src="${item.imageUrl}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-page-item__details">
          <h3 class="cart-page-item__title">${item.name}</h3>
          <div class="cart-page-item__price">${this.formatPrice(item.price)}</div>
          <div class="cart-page-item__quantity">
            <button type="button" class="btn btn--sm cart-page-item__quantity-decrease">-</button>
            <input type="number" class="cart-page-item__quantity-input" value="${item.quantity}" min="1">
            <button type="button" class="btn btn--sm cart-page-item__quantity-increase">+</button>
          </div>
        </div>
        <div class="cart-page-item__actions">
          <button type="button" class="btn btn--outline-danger cart-page-item__remove">삭제</button>
        </div>
      </div>
    `).join('');
  }
  
  bindCartPageEvents() {
    const cartContainer = document.querySelector('.cart-page');
    if (!cartContainer) return;
    
    cartContainer.addEventListener('click', (e) => {
      const itemId = e.target.closest('.cart-page-item')?.dataset.itemId;
      if (!itemId) return;
      
      if (e.target.classList.contains('cart-page-item__quantity-decrease')) {
        this.components.cart.decreaseQuantity(itemId);
      } else if (e.target.classList.contains('cart-page-item__quantity-increase')) {
        this.components.cart.increaseQuantity(itemId);
      } else if (e.target.classList.contains('cart-page-item__remove')) {
        this.components.cart.removeItem(itemId);
      }
    });
    
    cartContainer.addEventListener('change', (e) => {
      if (e.target.classList.contains('cart-page-item__quantity-input')) {
        const itemId = e.target.closest('.cart-page-item').dataset.itemId;
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
          this.components.cart.updateQuantity(itemId, newQuantity);
        }
      }
    });
  }
  
  showEmptyCartMessage() {
    const cartContainer = document.querySelector('.cart-page');
    if (cartContainer) {
      cartContainer.innerHTML = `
        <div class="empty-cart">
          <div class="empty-cart__icon">🛒</div>
          <h2 class="empty-cart__title">장바구니가 비어있습니다</h2>
          <p class="empty-cart__message">원하는 상품을 장바구니에 담아보세요!</p>
          <a href="/" class="btn btn--primary">쇼핑 계속하기</a>
        </div>
      `;
    }
  }
  
  bindGlobalEvents() {
    // Global error handling
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      this.handleGlobalError(e.error);
    });
    
    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      this.handleGlobalError(e.reason);
    });
    
    // Network status
    window.addEventListener('online', () => {
      this.handleNetworkStatusChange(true);
    });
    
    window.addEventListener('offline', () => {
      this.handleNetworkStatusChange(false);
    });
    
    // Back/forward navigation
    window.addEventListener('popstate', (e) => {
      this.handleNavigationChange();
    });
    
    // Page visibility change
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });
    
    // Custom application events
    document.addEventListener(EVENTS.CART_UPDATED, (e) => {
      this.handleCartUpdate(e.detail);
    });
    
    document.addEventListener(EVENTS.USER_LOGIN, (e) => {
      this.handleUserLogin(e.detail);
    });
    
    document.addEventListener(EVENTS.USER_LOGOUT, (e) => {
      this.handleUserLogout(e.detail);
    });
  }
  
  initializeTheme() {
    const savedTheme = storage.get(STORAGE_KEYS.THEME, 'light');
    this.setTheme(savedTheme);
  }
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(STORAGE_KEYS.THEME, theme);
    
    // Dispatch theme change event
    document.dispatchEvent(new CustomEvent(EVENTS.THEME_CHANGED, {
      detail: { theme }
    }));
  }
  
  initializeAnalytics() {
    // Initialize analytics if enabled
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }
  
  getPageFromPath(path) {
    if (path === '/' || path === '/index.html') return 'home';
    if (path.includes('/product')) return 'product';
    if (path.includes('/cart')) return 'cart';
    if (path.includes('/checkout')) return 'checkout';
    if (path.includes('/login')) return 'login';
    if (path.includes('/signup')) return 'signup';
    if (path.includes('/mypage')) return 'mypage';
    
    return 'unknown';
  }
  
  handleCartUpdate(detail) {
    // Update cart UI across the application
    if (this.currentPage === 'cart') {
      // Refresh cart page
      this.initializeCartPageFeatures();
    }
    
    // Update header cart badge
    if (this.components.header) {
      this.components.header.updateCartBadge();
    }
  }
  
  handleUserLogin(detail) {
    console.log('User logged in:', detail);
    // Refresh user-specific components
    if (this.components.header) {
      this.components.header.updateUserMenu();
    }
  }
  
  handleUserLogout(detail) {
    console.log('User logged out:', detail);
    // Clear user-specific data
    storage.remove(STORAGE_KEYS.USER_DATA);
    
    // Refresh components
    if (this.components.header) {
      this.components.header.updateUserMenu();
    }
    
    // Redirect if on protected page
    const protectedPages = ['checkout', 'mypage'];
    if (protectedPages.includes(this.currentPage)) {
      window.location.href = '/';
    }
  }
  
  handleNetworkStatusChange(isOnline) {
    const statusMessage = isOnline ? '네트워크가 연결되었습니다.' : '네트워크 연결이 끊어졌습니다.';
    this.showToast(statusMessage, isOnline ? 'success' : 'warning');
  }
  
  handleNavigationChange() {
    // Handle navigation without page reload (for SPA-like behavior)
    const newPage = this.getPageFromPath(window.location.pathname);
    
    if (newPage !== this.currentPage) {
      this.cleanup();
      this.initializePage();
    }
  }
  
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden - pause non-essential operations
      this.pauseOperations();
    } else {
      // Page is visible - resume operations
      this.resumeOperations();
    }
  }
  
  handleGlobalError(error) {
    // Log error for debugging
    console.error('Application error:', error);
    
    // Show user-friendly error message
    this.showToast('오류가 발생했습니다. 페이지를 새로고침해주세요.', 'error');
  }
  
  handleInitializationError(error) {
    // Critical error during initialization
    const errorContainer = document.createElement('div');
    errorContainer.className = 'app-error';
    errorContainer.innerHTML = `
      <div class="app-error__content">
        <h1>앱 초기화 오류</h1>
        <p>애플리케이션을 시작하는 중 오류가 발생했습니다.</p>
        <button onclick="location.reload()" class="btn btn--primary">다시 시도</button>
      </div>
    `;
    
    document.body.appendChild(errorContainer);
  }
  
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545',
      info: '#17a2b8'
    };
    
    toast.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.style.opacity = '1', 100);
    
    // Remove after delay
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
  
  pauseOperations() {
    // Pause animations, timers, etc.
    if (this.components.homePage && this.components.homePage.pauseSliders) {
      this.components.homePage.pauseSliders();
    }
  }
  
  resumeOperations() {
    // Resume operations
    if (this.components.homePage && this.components.homePage.resumeSliders) {
      this.components.homePage.resumeSliders();
    }
  }
  
  cleanup() {
    // Clean up previous page components
    Object.values(this.components).forEach(component => {
      if (component && typeof component.destroy === 'function') {
        component.destroy();
      }
    });
    
    // Reset page-specific components
    const pageComponents = ['homePage', 'productPage', 'checkoutPage'];
    pageComponents.forEach(component => {
      delete this.components[component];
    });
  }
  
  formatPrice(price) {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(price);
  }
  
  // Public API methods
  getComponent(name) {
    return this.components[name];
  }
  
  getCurrentPage() {
    return this.currentPage;
  }
  
  isReady() {
    return this.isInitialized;
  }
}

// Initialize application when script loads
const app = new App();

// Export for global access
window.OpenMarketApp = app;

export default app;
