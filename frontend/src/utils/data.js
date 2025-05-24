import { Group, LayoutDashboard, LogOut, Paperclip, Pencil } from "lucide-react"

export const SIDE_MENU_DATA = [
    {
        id:"01",
        label:"Dashboard",
        icon:LayoutDashboard,
        path:"/admin/dashboard"
    },
    {
        id:"02",
        label:"Manage Tasks",
        icon:Paperclip,
        path:"/admin/tasks"
    },
    {
        id:"03",
        label:"Create Task",
        icon:Pencil,
        path:"/admin/tasks"
    },
    {
        id:"04",
        label:"Team Members",
        icon:Group,
        path:"/admin/users"
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
        label:"My Tasks",
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

export const STATUS_DATA = [
    {label:"Pending", value:"Pending"},
    {label:"In Progress", value:"In Progress"},
    {label:"Completed", value:"Completed"},
]