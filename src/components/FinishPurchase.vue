<template>
  <section>
    <h2>Endereço de envio</h2>
    <UserForm>
      <button class="btn" @click.prevent="finishPurchase">Finalizar Compra</button>
    </UserForm>
  </section>
</template>

<script>

import UserForm from '@/components/UserForm.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';

export default {
  name: "FinishPurchase",
  components: {
    UserForm
  },
  props: ["product"],
  computed: {
    ...mapState(["user"]),
    purchase() {
      return {
        buyer_id: this.user.email,
        seller_id: this.product.user_id,
        product: this.product,
        address: {
          zipcode: this.user.zipcode,
          address: this.user.address,
          number: this.user.number,
          city: this.user.city,
          state: this.user.state
        }
      }
    }
  },
  methods: {
    createTransaction() {
      return api.post('/transactions', this.purchase)
        .then(() => {
          this.$router.push({ name: 'purchases' })
        })
    },
    async createUser() {
      try {
        await this.$store.dispatch('createUser', this.$store.state.user);
        await this.$store.dispatch('getUser', this.$store.state.user.email);
        await this.createTransaction();
      }
      catch (error) {
        console.log(error);
      }
    },
    finishPurchase() {
      if (this.$store.state.login) {
        this.createTransaction();
      } else {
        this.createUser();
      }
    }
  }
}
</script>

<style scoped>
h2{
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn{
  background: #e80;
}

</style>
