// ===========================================
// CONSTANTS MODULE
// ===========================================

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.openmarket.com/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// Application Configuration
export const APP_CONFIG = {
  NAME: '오픈마켓',
  VERSION: '1.0.0',
  DESCRIPTION: '프리미엄 온라인 쇼핑몰',
  CURRENCY: 'KRW',
  LOCALE: 'ko-KR',
  TIMEZONE: 'Asia/Seoul'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  CART_ITEMS: 'cartItems',
  WISHLIST_ITEMS: 'wishlistItems',
  RECENT_SEARCHES: 'recentSearches',
  VIEWED_PRODUCTS: 'viewedProducts',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Event Names
export const EVENTS = {
  CART_UPDATED: 'cartUpdated',
  WISHLIST_UPDATED: 'wishlistUpdated',
  USER_LOGIN: 'userLogin',
  USER_LOGOUT: 'userLogout',
  PRODUCT_VIEW: 'productView',
  ORDER_PLACED: 'orderPlaced',
  SEARCH_PERFORMED: 'searchPerformed',
  CATEGORY_CHANGED: 'categoryChanged',
  THEME_CHANGED: 'themeChanged'
};

// Product Categories
export const CATEGORIES = {
  ALL: 'all',
  ELECTRONICS: 'electronics',
  FASHION: 'fashion',
  BEAUTY: 'beauty',
  HOME: 'home',
  SPORTS: 'sports',
  BOOKS: 'books',
  FOOD: 'food',
  HEALTH: 'health',
  TOYS: 'toys',
  AUTO: 'auto',
  PET: 'pet'
};

// Category Labels (Korean)
export const CATEGORY_LABELS = {
  [CATEGORIES.ALL]: '전체',
  [CATEGORIES.ELECTRONICS]: '전자기기',
  [CATEGORIES.FASHION]: '패션',
  [CATEGORIES.BEAUTY]: '뷰티',
  [CATEGORIES.HOME]: '홈&리빙',
  [CATEGORIES.SPORTS]: '스포츠',
  [CATEGORIES.BOOKS]: '도서',
  [CATEGORIES.FOOD]: '식품',
  [CATEGORIES.HEALTH]: '건강',
  [CATEGORIES.TOYS]: '완구',
  [CATEGORIES.AUTO]: '자동차',
  [CATEGORIES.PET]: '반려동물'
};

// Sort Options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high',
  RATING: 'rating',
  REVIEWS: 'reviews',
  SALES: 'sales'
};

// Sort Labels (Korean)
export const SORT_LABELS = {
  [SORT_OPTIONS.NEWEST]: '신상품순',
  [SORT_OPTIONS.PRICE_LOW]: '낮은 가격순',
  [SORT_OPTIONS.PRICE_HIGH]: '높은 가격순',
  [SORT_OPTIONS.RATING]: '평점순',
  [SORT_OPTIONS.REVIEWS]: '리뷰 많은순',
  [SORT_OPTIONS.SALES]: '판매량순'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  RETURNED: 'returned'
};

// Order Status Labels (Korean)
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: '주문 대기',
  [ORDER_STATUS.CONFIRMED]: '주문 확인',
  [ORDER_STATUS.PROCESSING]: '상품 준비중',
  [ORDER_STATUS.SHIPPED]: '배송중',
  [ORDER_STATUS.DELIVERED]: '배송 완료',
  [ORDER_STATUS.CANCELLED]: '주문 취소',
  [ORDER_STATUS.REFUNDED]: '환불 완료',
  [ORDER_STATUS.RETURNED]: '반품 완료'
};

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  BANK_TRANSFER: 'transfer',
  KAKAO_PAY: 'kakaopay',
  NAVER_PAY: 'naverpay',
  PAYCO: 'payco',
  TOSS: 'toss'
};

// Payment Method Labels (Korean)
export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CARD]: '신용카드',
  [PAYMENT_METHODS.BANK_TRANSFER]: '무통장입금',
  [PAYMENT_METHODS.KAKAO_PAY]: '카카오페이',
  [PAYMENT_METHODS.NAVER_PAY]: '네이버페이',
  [PAYMENT_METHODS.PAYCO]: 'PAYCO',
  [PAYMENT_METHODS.TOSS]: '토스페이'
};

// Shipping Methods
export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  PICKUP: 'pickup'
};

// Shipping Method Labels (Korean)
export const SHIPPING_METHOD_LABELS = {
  [SHIPPING_METHODS.STANDARD]: '일반배송 (2-3일)',
  [SHIPPING_METHODS.EXPRESS]: '빠른배송 (1-2일)',
  [SHIPPING_METHODS.SAME_DAY]: '당일배송',
  [SHIPPING_METHODS.PICKUP]: '매장픽업'
};

// User Roles
export const USER_ROLES = {
  GUEST: 'guest',
  USER: 'user',
  PREMIUM: 'premium',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

// Badge Types
export const BADGE_TYPES = {
  NEW: 'new',
  SALE: 'sale',
  BEST: 'best',
  PREMIUM: 'premium',
  HOT: 'hot',
  LIMITED: 'limited',
  EXCLUSIVE: 'exclusive'
};

// Badge Labels (Korean)
export const BADGE_LABELS = {
  [BADGE_TYPES.NEW]: '신상품',
  [BADGE_TYPES.SALE]: '할인',
  [BADGE_TYPES.BEST]: '베스트',
  [BADGE_TYPES.PREMIUM]: '프리미엄',
  [BADGE_TYPES.HOT]: '인기',
  [BADGE_TYPES.LIMITED]: '한정판',
  [BADGE_TYPES.EXCLUSIVE]: '독점'
};

// Validation Rules
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 20,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: true
  },
  
  EMAIL: {
    MAX_LENGTH: 255,
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  
  PHONE: {
    REGEX: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/
  },
  
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  
  PRODUCT: {
    NAME_MAX_LENGTH: 200,
    DESCRIPTION_MAX_LENGTH: 2000,
    MIN_PRICE: 0,
    MAX_PRICE: 10000000
  },
  
  REVIEW: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
    MIN_RATING: 1,
    MAX_RATING: 5
  }
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 36, 48],
  MAX_PAGE_SIZE: 100,
  MAX_VISIBLE_PAGES: 5
};

// Image Configuration
export const IMAGE_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  PRODUCT_IMAGE_SIZES: {
    THUMBNAIL: { width: 150, height: 150 },
    SMALL: { width: 300, height: 300 },
    MEDIUM: { width: 600, height: 600 },
    LARGE: { width: 1200, height: 1200 }
  }
};

// Breakpoints (must match SCSS variables)
export const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400
};

// Z-Index Values
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080
};

// Animation Duration (milliseconds)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  SLIDER: 5000,
  DEBOUNCE: 300,
  THROTTLE: 100
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNAUTHORIZED: '로그인이 필요한 서비스입니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청하신 페이지를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력 정보를 다시 확인해주세요.',
  SESSION_EXPIRED: '세션이 만료되었습니다. 다시 로그인해주세요.',
  FILE_TOO_LARGE: '파일 크기가 너무 큽니다.',
  INVALID_FILE_TYPE: '지원하지 않는 파일 형식입니다.',
  CART_EMPTY: '장바구니가 비어있습니다.',
  OUT_OF_STOCK: '현재 품절된 상품입니다.',
  PAYMENT_FAILED: '결제에 실패했습니다. 다시 시도해주세요.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '로그인되었습니다.',
  LOGOUT_SUCCESS: '로그아웃되었습니다.',
  SIGNUP_SUCCESS: '회원가입이 완료되었습니다.',
  PROFILE_UPDATED: '프로필이 업데이트되었습니다.',
  PASSWORD_CHANGED: '비밀번호가 변경되었습니다.',
  CART_ADDED: '장바구니에 추가되었습니다.',
  WISHLIST_ADDED: '찜 목록에 추가되었습니다.',
  ORDER_PLACED: '주문이 완료되었습니다.',
  REVIEW_SUBMITTED: '리뷰가 등록되었습니다.',
  FILE_UPLOADED: '파일이 업로드되었습니다.',
  COPIED_TO_CLIPBOARD: '클립보드에 복사되었습니다.'
};

// Default Values
export const DEFAULTS = {
  PRODUCT_IMAGE: '/assets/images/no-image.png',
  AVATAR_IMAGE: '/assets/images/default-avatar.png',
  PRODUCTS_PER_PAGE: 12,
  SEARCH_DEBOUNCE: 300,
  CART_ANIMATION_DELAY: 1500,
  TOAST_DURATION: 3000,
  SESSION_CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutes
  AUTO_SAVE_INTERVAL: 30 * 1000 // 30 seconds
};

// Feature Flags
export const FEATURES = {
  WISHLIST: true,
  REVIEWS: true,
  RECOMMENDATIONS: true,
  SOCIAL_LOGIN: true,
  LIVE_CHAT: true,
  NOTIFICATIONS: true,
  DARK_MODE: true,
  PWA: true,
  ANALYTICS: true,
  A_B_TESTING: false
};

// External Services
export const EXTERNAL_SERVICES = {
  GOOGLE_ANALYTICS_ID: 'GA_MEASUREMENT_ID',
  GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
  KAKAO_APP_KEY: 'YOUR_KAKAO_APP_KEY',
  NAVER_CLIENT_ID: 'YOUR_NAVER_CLIENT_ID',
  FACEBOOK_APP_ID: 'YOUR_FACEBOOK_APP_ID',
  IAMPORT_IMP: 'YOUR_IAMPORT_IMP_CODE'
};

export default {
  API_CONFIG,
  APP_CONFIG,
  STORAGE_KEYS,
  EVENTS,
  CATEGORIES,
  CATEGORY_LABELS,
  SORT_OPTIONS,
  SORT_LABELS,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  SHIPPING_METHODS,
  SHIPPING_METHOD_LABELS,
  USER_ROLES,
  BADGE_TYPES,
  BADGE_LABELS,
  VALIDATION,
  PAGINATION,
  IMAGE_CONFIG,
  BREAKPOINTS,
  Z_INDEX,
  ANIMATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEFAULTS,
  FEATURES,
  EXTERNAL_SERVICES
};
