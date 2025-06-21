export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    PROFILE: "/api/auth/profile",
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
  USERS: {
    GET_ALL_USER_PRODUCT: "/api/users/",
    GET_USER_PROFILE: "/api/users/profile",
    SEARCH_PRODUCT:"/api/users/search",
    GET_CART: "/api/users/getCart",
    GET_CART_COUNT:"/api/users/cartcount",
    GET_PRODUCT: (productId) => `/api/users/${productId}`,          
    UPDATE_USER_PROFILE: "/api/users/updateprofile",
    ADD_CART: "/api/users/addcart",
    PAYMENT: "/api/users/payment",
    REMOVE_CART: (productId) => `/api/users/cart/${productId}`,         
  },
  ADMIN: {
    GET_ALL_SELLER: "/api/admin/seller",
    GET_SELLER: (sellerId) => `/api/admin/${sellerId}`,      
    BLOCK: (sellerId) => `/api/admin/seller/block/${sellerId}`,    
    UNBLOCK: (sellerId) => `/api/admin/seller/unblock/${sellerId}`,

    GET_SELLER_ALL_PRODUCTS: "/api/admin/seller-products",
    GET_SELLER_PRODUCT: (sellerId, productId) => `/api/admin/${sellerId}/${productId}`,  

    GET_ALL_PRODUCT: "/api/admin/products",
    GET_PRODUCT: (productId) => `/api/admin/products/${productId}`,  
    DELETE_PRODUCT: (productId) => `/api/admin/products/${productId}`,

    ADMIN_DASHBOARD: "/api/admin/",
  },
  SELLER: {
    SELLER_DASHBOARD: "/api/product/dashboard",
    GET_ALL_PRODUCT: "/api/product/",
    GET_PRODUCT: (sellerId) => `/api/product/${sellerId}`,          
    CREATE_PRODUCT: "/api/product/",
    UPDATE_PRODUCT: (productId) => `/api/product/${productId}`,     
    DELETE_PRODUCT: (productId) => `/api/product/${productId}`,     
  }
};
