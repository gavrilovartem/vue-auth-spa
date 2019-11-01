<template>
  <div class="text-center">
    <img alt="university icon" src="../assets/university.png" >
    <h1>Форма входа в личный кабинет</h1>
    <v-form>
      <v-col cols="6" sm="6" offset="3" xs="3">
        <v-text-field label="Введите имя"
        v-model="username"
         :rules="[rules.requiredName]"
         ></v-text-field>
      </v-col>
      <v-col cols="6" sm="6" offset="3" xs="3">
        <v-text-field
          v-model="password"
          label="Введите пароль"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          value=""
          :rules="[rules.requiredPassword]"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
      <div>
        <p class="errors">
      {{ errors }}
      </p>
      </div>
      <v-btn
      :loading="loading"
      :disabled="loading"
      color="success"
      @click="loader = 'loading'">
      Войти</v-btn>
    </v-form>
  </div>
</template>

<script>
import store from '../store/index.js';
export default {
  name: "AuthForm",
  props: {
    color: String
  },
  data: () => ({
    
    loader: null,
    loading: false,
    rules: {
      requiredPassword: value => !!value || "Введите пароль",
      requiredName: value => !!value || "Введите имя пользователя"
    },
    password: "",
    username: "",
    show1: false,
  }),
  computed: {
    errors() {
      return store.state.errors;
    }
  },
  watch: {
    loader () {
      const { username, password } = this; 
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 1000);
      this.$store.dispatch('authLoginRequest', { username, password });
      this.loader = null;
    },
  },
};
</script>

<style>
img {
  width: 256px;
  height: 256px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.errors {
  margin-bottom: 3em ;
  color:brown;
  font-weight: 600;
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>