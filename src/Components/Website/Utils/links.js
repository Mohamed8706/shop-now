import { faCartPlus, faCartShopping, faPen, faPlus, faTruckFast, faTruckLoading, faTruckPickup, faUsers } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        name: "Users",
        path: "/dashboard/users",
        icon: faUsers,
        role: "1995"
    },
    {
        name: "Add User",
        path: "/dashboard/user/add",
        icon: faPlus,
        role: "1995"
    },
    {
        name: "Categories",
        path: "/dashboard/categories",
        icon: faCartShopping,
        role: ['1995', '1999']

    }, {
        name: "Add Category",
        path: "/dashboard/category/add",
        icon: faCartPlus,
        role: ['1995', '1999']
    }, 
    {
        name: "Products",
        path: "products",
        icon: faTruckFast,
        role: ['1995', '1999']
    },
    {
        name: "AddProduct",
        path: "product/add",
        icon: faTruckLoading,
        role: ['1995', '1999']
    }
    
]

export const footerLinks = [
["About Us",{
        name: "Vision",
        path: "/"
    },
    {
        name: "Articles",
        path: "/"
    },
    {
        name: "Careers",
        path: "/"
    },
    {
        name: "Service Terms",
        path: "/"
    },],
    ["Discover",
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Books",
        path: "/"
    },
    {
        name: "Authors",
        path: "/"
    },
    {
        name: "Subjects",
        path: "/"
    },],
    ["My Account",
    {
        name: "Sign In",
        path: "/login"
    },
    {
        name: "Track My Order",
        path: "/"
    },],
    ["Help",
    {
        name: "Help Center",
        path: "/"
    },
    {
        name: "Report a Problem",
        path: "/"
    },
    {
        name: "Suggesting Edits",
        path: "/"
    },
    {
        name: "Contact Us",
        path: "/"
    }]
]
