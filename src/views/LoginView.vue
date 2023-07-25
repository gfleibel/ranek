<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email">
      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="login.password">
      <button class="btn" @click.prevent="log">Entrar</button>
    </form>
    <p class="forgot">
      <a href="/" target="_blank">Esqueceu a senha? Clique aqui.</a>
    </p>
    <CreateLogin />
  </section>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      login: {
        email: '',
        password: '',
      }
    }
  },
  methods:{
    log(){
      this.$store.dispatch("getUser", this.login.email)
      this.$router.push({name: "user"})
    }
  },
  components: {
    CreateLogin: () => import('@/components/CreateLogin.vue')
  }
}
</script>

<style scoped>

h1{
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

.login{
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

form{
  display: grid;
  grid-template-columns: 1fr;
}

.btn{
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.forgot{
  text-align: center;
  margin-top: 20px auto 0 auto;
}

.forgot a:hover{
  color: #87f;
  text-decoration: underline;
}
</style>
