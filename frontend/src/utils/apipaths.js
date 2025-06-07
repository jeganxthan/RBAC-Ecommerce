export const BASE_URL = "http://localhost:8000";

export const API_PATHS={
    AUTH:{
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        PROFILE:"/api/auth/profile"
    },
    USERS:{
        GET_ALL_USER_PRODUCT:"/api/users/",
        GET_USER_PROFILE:"/api/users/profile",
        GET_CART:"/api/users/getCart",
        GET_USER_PRODUCT:(userId)=>`/api/users${userId}`,
        UPDATE_USER_PROFILE:"/api/users/updateprofile",
        ADD_CART:"/api/users/addcart",
        REMOVE_CART:(productId)=>`/api/users${productId}`
    },
    ADMIN:{
        GET_ALL_SELLER:"/api/admin/seller",
        GET_SELLER:(sellerId)=>`/api/admin${sellerId}`,
        BLOCK:(sellerId)=>`/api/admin/seller/block${sellerId}`,
        UNBLOCK:(sellerId)=>`/api/admin/seller/unblock${sellerId}`,

        GET_SELLER_ALL_PRODUCTS:"/api/admin/seller-products",
        GET_SELLER_PRODUCT:(sellerId, productId)=>`/api/admin${sellerId}${productId}`,

        GET_ALL_PRODUCT:"/api/admin/products",
        GET_PRODUCT:(productId)=>`/api/admin/products${productId}`,
        DELETE_PRODUCT:(productId)=>`/api/admin/products${productId}`,

        ADMIN_DASHBOARD:"/api/admin/",
    },
    SELLER:{
        SELLER_DASHBOARD:"/api/seller/dashboard",
        GET_ALL_PRODUCT:"/api/seller/",
        GET_PRODUCT:(sellerId)=>`/api/seller${sellerId}`,
        CREATE_PRODUCT:"/api/seller/",
        UPDATE_PRODUCT:(productId)=>`/api/seller${productId}`,
        DELETE_PRODUCT:(productId)=>`/api/seller${productId}`
    },
    IMAGE:{
        UPLOAD_IMAGE:"api/auth/upload-image",
    }
}