import { api } from "@/services.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      zipcode: "",
      address: "",
      number: "",
      state: "",
      city: "",
    },
    user_products: null,
  },
  getters: {},
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.user_products = payload;
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.user_products.unshift(payload);
    },
  },
  actions: {
    getUserProducts(context) {
      api.get(`/products?user_id=${context.state.user.id}`).then((response) => {
        context.commit("UPDATE_USER_PRODUCTS", response.data);
      });
    },
    getUser(context, payload) {
      return api.get(`/user/${payload}`).then((response) => {
        context.commit("UPDATE_USER", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email });
      return api.post("/user", payload);
    },
    logoff(context) {
      context.commit("UPDATE_USER", {
        id: "",
        name: "",
        email: "",
        password: "",
        zipcode: "",
        address: "",
        number: "",
        state: "",
        city: "",
      });
      context.commit("UPDATE_LOGIN", false);
    },
  },
  modules: {},
});
