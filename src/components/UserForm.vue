<template>
  <form>
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" v-model="name">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" v-model="email">
    <label for="password">Senha</label>
    <input type="password" id="password" name="password" v-model="password">
    <label for="zipcode">Cep</label>
    <input type="text" id="zipcode" name="zipcode" v-model="zipcode" @keyup="fillCep">
    <label for="address">Rua</label>
    <input type="text" id="address" name="address" v-model="address">
    <label for="number">Número</label>
    <input type="text" id="number" name="number" v-model="number">
    <label for="city">Cidade</label>
    <input type="text" id="city" name="city" v-model="city">
    <label for="state">Estado</label>
    <input type="text" id="state" name="state" v-model="state">
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>

import { mapFields } from '@/helpers.js'
import { getCep } from '@/services.js'

export default {
  computed: {
    ...mapFields({
      fields: ["name", "email", "password", "zipcode", "address", "number", "city", "state"],
      base: "user",
      mutation: "UPDATE_USER"
    })
  },
  methods: {
    fillCep() {
      const cep = this.zipcode.replace(/\D/g, '');
      if (cep.length === 8) {
        getCep(cep).then(response => {
          this.address = response.data.logradouro;
          this.city = response.data.localidade;
          this.state = response.data.uf;
        })
      }
    }
  },
}
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
