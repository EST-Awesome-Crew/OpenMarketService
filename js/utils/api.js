// ===========================================
// API UTILITY MODULE
// ===========================================

const API_BASE_URL = 'https://api.openmarket.com/v1';
const API_TIMEOUT = 30000; // 30 seconds

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = API_TIMEOUT;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }
  
  // Set authorization token
  setAuthToken(token) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }
  
  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: options.method || 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      ...options
    };
    
    // Add body for POST, PUT, PATCH requests
    if (config.method !== 'GET' && config.method !== 'DELETE' && options.data) {
      config.body = JSON.stringify(options.data);
    }
    
    // Add query parameters for GET requests
    if (config.method === 'GET' && options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, value);
        }
      });
      
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }
    
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      config.signal = controller.signal;
      
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      // Handle HTTP errors
      if (!response.ok) {
        await this.handleHttpError(response);
      }
      
      // Parse JSON response
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        status: response.status,
        headers: response.headers
      };
      
    } catch (error) {
      return this.handleRequestError(error);
    }
  }
  
  // GET request
  async get(endpoint, params = {}) {
    return this.request(endpoint, {
      method: 'GET',
      params: params
    });
  }
  
  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      data: data
    });
  }
  
  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      data: data
    });
  }
  
  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      data: data
    });
  }
  
  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
  
  // Upload file
  async upload(endpoint, formData) {
    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // Let browser set boundary for FormData
    
    return this.request(endpoint, {
      method: 'POST',
      headers: headers,
      body: formData
    });
  }
  
  // Handle HTTP errors
  async handleHttpError(response) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (parseError) {
      // If can't parse JSON, use default message
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    error.response = response;
    
    throw error;
  }
  
  // Handle request errors
  handleRequestError(error) {
    console.error('API Request Error:', error);
    
    let message = '네트워크 오류가 발생했습니다.';
    
    if (error.name === 'AbortError') {
      message = '요청 시간이 초과되었습니다.';
    } else if (error.message.includes('Failed to fetch')) {
      message = '서버에 연결할 수 없습니다.';
    } else if (error.message) {
      message = error.message;
    }
    
    return {
      success: false,
      error: message,
      status: error.status || null
    };
  }
}

// Create and export API instance
export const api = new ApiClient();

// Specific API endpoints
export const endpoints = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile'
  },
  
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
    RELATED: '/products/related',
    REVIEWS: (id) => `/products/${id}/reviews`
  },
  
  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    UPDATE: (itemId) => `/cart/items/${itemId}`,
    REMOVE: (itemId) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear'
  },
  
  // Orders
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: (id) => `/orders/${id}`,
    CANCEL: (id) => `/orders/${id}/cancel`
  },
  
  // User
  USER: {
    PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
    WISHLIST: '/user/wishlist',
    ORDERS: '/user/orders'
  },
  
  // Utils
  UTILS: {
    UPLOAD: '/upload',
    ADDRESS: '/utils/address'
  }
};

// Convenience methods for common operations
export const authAPI = {
  login: (credentials) => api.post(endpoints.AUTH.LOGIN, credentials),
  logout: () => api.post(endpoints.AUTH.LOGOUT),
  register: (userData) => api.post(endpoints.AUTH.REGISTER, userData),
  getProfile: () => api.get(endpoints.AUTH.PROFILE),
  updateProfile: (data) => api.put(endpoints.AUTH.PROFILE, data)
};

export const productsAPI = {
  getList: (params = {}) => api.get(endpoints.PRODUCTS.LIST, params),
  getDetail: (id) => api.get(endpoints.PRODUCTS.DETAIL(id)),
  search: (query, params = {}) => api.get(endpoints.PRODUCTS.SEARCH, { q: query, ...params }),
  getCategories: () => api.get(endpoints.PRODUCTS.CATEGORIES),
  getRelated: (productId, params = {}) => api.get(endpoints.PRODUCTS.RELATED, { productId, ...params }),
  getReviews: (productId, params = {}) => api.get(endpoints.PRODUCTS.REVIEWS(productId), params)
};

export const cartAPI = {
  get: () => api.get(endpoints.CART.GET),
  addItem: (item) => api.post(endpoints.CART.ADD, item),
  updateItem: (itemId, data) => api.put(endpoints.CART.UPDATE(itemId), data),
  removeItem: (itemId) => api.delete(endpoints.CART.REMOVE(itemId)),
  clear: () => api.delete(endpoints.CART.CLEAR)
};

export const ordersAPI = {
  create: (orderData) => api.post(endpoints.ORDERS.CREATE, orderData),
  getList: (params = {}) => api.get(endpoints.ORDERS.LIST, params),
  getDetail: (id) => api.get(endpoints.ORDERS.DETAIL(id)),
  cancel: (id, reason) => api.post(endpoints.ORDERS.CANCEL(id), { reason })
};

export const userAPI = {
  getProfile: () => api.get(endpoints.USER.PROFILE),
  updateProfile: (data) => api.put(endpoints.USER.PROFILE, data),
  getAddresses: () => api.get(endpoints.USER.ADDRESSES),
  addAddress: (address) => api.post(endpoints.USER.ADDRESSES, address),
  getWishlist: () => api.get(endpoints.USER.WISHLIST),
  addToWishlist: (productId) => api.post(endpoints.USER.WISHLIST, { productId }),
  removeFromWishlist: (productId) => api.delete(`${endpoints.USER.WISHLIST}/${productId}`)
};

// Request interceptor for authentication
api.setAuthToken(localStorage.getItem('authToken'));

// Response interceptor for token refresh
const originalRequest = api.request.bind(api);
api.request = async function(endpoint, options = {}) {
  try {
    const response = await originalRequest(endpoint, options);
    return response;
  } catch (error) {
    if (error.status === 401 && !endpoint.includes('/auth/')) {
      // Token expired, try to refresh
      try {
        const refreshResponse = await originalRequest(endpoints.AUTH.REFRESH, { method: 'POST' });
        if (refreshResponse.success && refreshResponse.data.token) {
          // Update token and retry original request
          const newToken = refreshResponse.data.token;
          localStorage.setItem('authToken', newToken);
          api.setAuthToken(newToken);
          
          return originalRequest(endpoint, options);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('authToken');
        api.setAuthToken(null);
        window.location.href = '/pages/login.html';
        return;
      }
    }
    throw error;
  }
};

export default api;
