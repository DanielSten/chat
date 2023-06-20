<template>
  <div>
    <form @submit.prevent="onSubmit" ref="form" action="">
      <input-text
          v-model="username"
          type='name'
          required="required"
          name="name"
          title="Имя"
          subtitle="Введите ваше имя"
      ></input-text>
      <input-text
          v-model="login"
          type='text'
          required="required"
          name="login"
          title="Логин"
          subtitle="Придумайте ваш логин"
      ></input-text>
      <input-text
          v-model="password"
          type='password'
          required="required"
          title="Придумайте пароль"
          subtitle="Минимальная длина - 8 символов"
          error="Введите пароль не короче 8 символов"
      ></input-text>
      <btn-purple>зарегестрироваться</btn-purple>
    </form>
  </div>
</template>

<script>
import BtnPurple from "./btn-purple.vue";
import inputText from "./input-text.vue"
import Axios from "axios";

export default {
  name: "regs",
  components: {
    BtnPurple,
    inputText,
  },
  data() {
    return{
      passType: 'password',
      passwordHasError: false,
      username: '',
      password: '',
      login: '',
      rememberMe: true,
    }
  },
  methods: {
    onSubmit() {
      Axios.post('/auth/register', {
        login: this.login,
        password: this.password,
        name: this.username,
      })
          .then(response => {
            if(response.data._status){
              localStorage.setItem('token', response.data.token)
              Axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
              this.$emit('closeModal', response.data.user)
              this.login = ''
              this.password = ''
              this.username = ''
            }
          })
          .catch(e => console.error(e));
    },
  },
}
</script>

<style scoped>

</style>