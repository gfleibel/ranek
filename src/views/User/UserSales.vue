<template>
  <section>
    <div v-if="sales">
      <h2>Vendas</h2>
      <div class="products-wrapper" v-for="(sale, index) in sales" :key="index">
        <ProductItem v-if="sale.product" :product="sale.product">
          <p class="buyer"><span>Comprador: </span>{{ sale.buyer_id }}</p>
        </ProductItem>
        <div class="delivery">
          <h3>Entrega:</h3>
          <ul v-if="sale.address">
            <li>Endereço: {{ sale.address.address }}</li>
            <li>Número: {{ sale.address.number }}</li>
            <li>CEP: {{ sale.address.zipcode }}</li>
            <li>Cidade: {{ sale.address.city }}</li>
            <li>Estado: {{ sale.address.state }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import ProductItem from '@/components/ProductItem.vue'
import { api } from '@/services.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      sales: null
    }
  },
  components: {
    ProductItem
  },
  computed: {
    ...mapState(['user', 'login'])
  },
  methods: {
    getSales() {
      api.get(`/transactions?seller_id=${this.user.id}`).then(response => {
        this.sales = response.data
      })
    }
  },
  watch: {
    login() {
      this.getSales();
    }
  },
  created() {
    if (this.login) {
      this.getSales();
    }
  }
}
</script>

<style scoped>
.products-wrapper {
  margin-bottom: 40px;
}

.buyer span {
  color: #e80;
}

.delivery{
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3{
  margin: 0;
  justify-self: end;
}

</style>
