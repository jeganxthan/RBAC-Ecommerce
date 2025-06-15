import { Group, LayoutDashboard, LogOut, Paperclip, Speaker, User } from "lucide-react"

export const SIDE_MENU_DATA = [
    {
        id:"01",
        label:"Dashboard",
        icon:LayoutDashboard,
        path:"/admin/dashboard"
    },
    {
        id:"02",
        label:"Seller",
        icon:User,
        path:"/admin/seller"
    },
    {
        id:"03",
        label:"Seller-product",
        icon:Speaker,
        path:"/admin/seller-products"
    },
    {
        id:"04",
        label:"Product",
        icon:Group,
        path:"/admin/product"
    },
    {
        id:"05",
        label:"Logout",
        icon:LogOut,
        path:"logout"
    },
]

export const SIDE_MENU_USER_DATA = [
    {
        id:"01",
        label:"Team Members",
        icon:Group,
        path:"/user/dashboard"
    },
    {
        id:"02",
        label:"Products",
        icon:Paperclip,
        path:"/user/task"
    },
    {
        id:"03",
        label:"Logout",
        icon:LogOut,
        path:"logout"
    },
]
export const SIDE_MENU_SELLER_DATA = [
    {
        id:"01",
        label:"DashBoard",
        icon:Group,
        path:"/seller/dashboard"
    },
    {
        id:"02",
        label:"Products",
        icon:Paperclip,
        path:"/seller/products"
    },
    {
        id:"03",
        label:"Logout",
        icon:LogOut,
        path:"logout"
    },
]