<template>
  <section>
    <h1>👍Compre ou Venda 👎</h1>
    <SearchBar />
    <ProductList />
  </section>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    ProductList: () => import('@/components/ProductList.vue'),
    SearchBar: () => import('@/components/SearchBar.vue'),
  }
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #87f;
  margin-top: 40px;
  text-align: center;
}
</style>
