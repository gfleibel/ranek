import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import LoginView from "../views/LoginView.vue"
import UserView from "../views/User/UserView.vue"
import UserProducts from "../views/User/UserProducts.vue"
import UserSales from "../views/User/UserSales.vue"
import UserPurchases from "../views/User/UserPurchases.vue"
import UserEdit from "../views/User/UserEdit.vue"



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/produto/:id",
    name: "produto",
    component: ProductView,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/user",
    component: UserView,
    children: [
      {
        path:"",
        name: "user",
        component: UserProducts,
      },
      {
        path:"purchases",
        name: "purchases",
        component: UserPurchases,
      },
      {
        path:"sales",
        name: "sales",
        component: UserSales,
      },
      {
        path:"edit",
        name: "edit-user",
        component: UserEdit,
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
