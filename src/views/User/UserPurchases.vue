<template>
  <section>
    <div v-if="purchases">
      <h2>Compras</h2>
      <div class="products-wrapper" v-for="(purchase, index) in purchases" :key="index">
        <ProductItem v-if="purchase.product" :product="purchase.product">
          <p class="seller"><span>Vendedor: </span>{{ purchase.seller_id }}</p>
        </ProductItem>
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
      purchases: null
    }
  },
  components: {
    ProductItem
  },
  computed: {
    ...mapState(['user', 'login'])
  },
  methods: {
    getPurchases() {
      api.get(`/transactions?buyer_id=${this.user.id}`).then(response => {
        this.purchases = response.data
      })
    }
  },
  watch: {
    login() {
      this.getPurchases();
    }
  },
  created() {
    if (this.login) {
      this.getPurchases();
    }
  }
}
</script>

<style scoped>
.products-wrapper {
  margin-bottom: 40px;
}

.seller span{
  color: #e80;
}

h2{
  margin-bottom: 20px;
}

</style>
