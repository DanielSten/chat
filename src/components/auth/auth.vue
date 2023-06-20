<template>
  <div>
    <form @submit.prevent="onSubmit" ref="form" action="">
      <input-text
          v-model="login"
          type='text'
          required="required"
          name="login"
          title="Логин"
          subtitle="Введите ваш логин"
      ></input-text>
      <input-text
          v-model="password"
          type='password'
          required="required"
          name="password"
          title="Ваш пароль"
          subtitle="Введите ваш пароль"
      ></input-text>
      <btn-purple>войти в аккаунт</btn-purple>
    </form>
  </div>
</template>

<script>
import inputText from "./input-text.vue";
import BtnPurple from "./btn-purple.vue";
import Axios from "axios";

export default {
  name: "auth",
  components: {
    BtnPurple,
    inputText,
  },
  data() {
    return{
      passType: 'password',
      login: '',
      password: '',
      rememberMe: true,
    }
  },
  methods: {
    onSubmit() {
      Axios.post('/auth/login', {
        login: this.login,
        password: this.password,
      })
          .then(response => {
            if(response.data._status){
              localStorage.setItem('token', response.data.token)
              Axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
              this.$emit('closeModal', response.data.user)
              this.login = ''
              this.password = ''
            }
          })
          .catch(e => console.error(e));
    },
  },
}
</script>

<style scoped>

</style>