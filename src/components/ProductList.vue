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
export default {
  name: "ProductList",
  data() {
    return {
      products: null
    }
  },
  methods: {
    getProducts() {
      fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
          this.products = data;
        });
    }
  },
  created() {
    this.getProducts();
}

}
</script>

<style scoped>
</style>
