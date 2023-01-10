import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Categories from "../pages/categories/Categories";
import { default as AddCategory } from "../pages/categories/Add";
import { default as UpdateCategory } from "../pages/categories/Update";
import Products from "../pages/products/Products";
import { default as AddProduct } from "../pages/products/Add";
import { default as UpdateProduct } from "../pages/products/Update";
import { default as DetailProduct } from "../pages/products/Detail";
import { default as PriceProduct } from "../pages/products/Price";
import { default as DiscountProduct } from "../pages/products/Discount";
import Customers from "../pages/customers/Customers";
import { default as AddCustomer } from "../pages/customers/Add";
import { default as UpdateCustomer } from "../pages/customers/Update";
import { default as DetailCustomer } from "../pages/customers/Detail";
import Colors from "../pages/colors/Colors";
import { default as AddColor } from "../pages/colors/Add";
import { default as UpdateColor } from "../pages/colors/Update";
import Capacities from "../pages/capacities/Capacities";
import { default as AddCapacity } from "../pages/capacities/Add";
import { default as UpdateCapacity } from "../pages/capacities/Update";
import Orders from "../pages/orders/Orders";
import { default as DetailOrder } from "../pages/orders/Detail";
import { default as UpdateOrder } from "../pages/orders/Update";
import Staffs from "../pages/staffs/Staffs";
import { default as AddStaff } from "../pages/staffs/Add";
import { default as UpdateStaff } from "../pages/staffs/Update"
import Receipts from "../pages/receipts/Receipts";
import {default as DetailReceipt } from "../pages/receipts/Detail"
import { default as AddReceipt } from "../pages/receipts/Add"


const publicRoutes = [{ path: "/login", component: Login, layout: null }];
const privateRoutes = [
  { path: "/", component: Home },
  { path: "/categories", component: Categories },
  { path: "/categories/add", component: AddCategory },
  { path: "/categories/update/:id", component: UpdateCategory },
  { path: "/products", component: Products },
  { path: "/products/add", component: AddProduct },
  { path: "/products/update/:id", component: UpdateProduct },
  { path: "/products/detail/:id", component: DetailProduct },
  { path: "/products/price/:id", component: PriceProduct },
  { path: "/products/discount/:id", component: DiscountProduct },
  { path: "/customers", component: Customers },
  { path: "/customers/add", component: AddCustomer },
  { path: "/customers/update/:id", component: UpdateCustomer },
  { path: "/customers/detail/:id", component: DetailCustomer },
  { path: "/colors", component: Colors },
  { path: "/colors/add", component: AddColor },
  { path: "/colors/update/:id", component: UpdateColor },
  { path: "/capacities", component: Capacities },
  { path: "/capacities/add", component: AddCapacity },
  { path: "/capacities/update/:id", component: UpdateCapacity },
  { path: "/orders", component: Orders },
  { path: "/orders/detail/:id", component: DetailOrder },
  { path: "/orders/update/:id", component: UpdateOrder },
  { path: "/staffs", component: Staffs },
  { path: "/staffs/add", component: AddStaff },
  { path: "/staffs/update/:id", component: UpdateStaff },
  { path:"/receipts", component: Receipts},
  { path:"/receipts/detail/:id", component: DetailReceipt},
  { path:"/receipts/add", component: AddReceipt},
];
export { publicRoutes, privateRoutes };
