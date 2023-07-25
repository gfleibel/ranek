<template>
  <section class="products-container">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="products">
        <div v-for="(product, index) in products" :key="index" class="product">
          <router-link :to="{ name: 'produto', params: { id: product.id } }">
            <img v-if="product.photos" :src="product.photos[0].src" :alt="product.photos[0].titulo">
            <p class="price">{{ product.price | priceNumber}}</p>
            <h2 class="title">{{ product.name }}</h2>
            <p class="description">{{ product.description }}</p>
          </router-link>
        </div>
        <PageProducts :totalProducts="totalProducts" :productsPerPage="productsPerPage" />
      </div>
      <div v-else-if="products && products.length === 0">
        <p class="no-results" key="no-results">Busca sem resultados. Tente outro produto.</p>
      </div>
      <div v-else key="loading">
        <LoadingPage />
      </div>
    </transition>
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
      productsPerPage: 9,
      totalProducts: 0,
    }
  },
  components: {
    PageProducts: () => import('./PageProducts.vue')
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/products?_limit=${this.productsPerPage}${query}`;
    }
  },
  methods: {
    getProducts() {
      this.products = null;
      window.setTimeout(() => {
        api.get(this.url)
          .then(response => {
            this.totalProducts = Number(response.headers["x-total-count"]);
            this.products = response.data;
          })
      }, 1500);
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
.products-container {
  max-width: 1000px;
  margin: 0 auto;

}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, .1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all .2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, .2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.price {
  color: #e80;
  font-weight: bold;
}

.no-results {
  text-align: center;
}
</style>
