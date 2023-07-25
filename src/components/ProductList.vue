<template>
  <section class="products-container">
    <div v-for="product in products" :key="product.id">
      <img v-if="product.photos" :src="product.photos[0].src" :alt="product.photos[0].titulo">
      <p class="price">{{ product.price }}</p>
      <h2 class="titulo">{{ product.name }}</h2>
      <p class="description">{{ product.description }}</p>
    </div>

  </section>
</template>

<script>

import { api } from "@/services.js"
import { serialize } from "@/helpers.js"

export default {
  name: "ProductList",
  data() {
    return {
      products: null,
      productsPerPage: 9
    }
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/products?_limit=${this.productsPerPage}${query}`;
    }
  },
  methods: {
    getProducts() {

      api.get(this.url)
        .then(response => {
          this.products = response.data;
        })
    }
  },
  watch: {
    url() {
      this.getProducts();
    }
  },
  created() {
    this.getProducts();
  }

}
</script>

<style scoped>
</style>
