<template>
  <div>
    <div class="block_login">
      <div class="block_login_window">
        <tab-btn :class="{active: isTabActive(0)}" @click.native="onTabClick(0)">Авторизация</tab-btn>
        <tab-btn :class="{active: isTabActive(1)}" @click.native="onTabClick(1)">Регистрация</tab-btn>
        <div class="tabs_body">
          <div class="tab_body" v-show="isTabActive(0)">
            <auth @closeModal="closeModal"></auth>
          </div>
          <div class="tab_body" v-show="isTabActive(1)">
            <regs @closeModal="closeModal"></regs>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import tabBtn from "./tab-btn.vue";
import auth from "./auth.vue";
import regs from "./regs.vue";




export default {
  name: "auth-regs",
  components: {
    tabBtn,
    auth,
    regs
  },
  data() {
    return{
      tabActive: 0,
    }
  },
  methods: {
    isTabActive(num){
      return this.tabActive === num;
    },
    onTabClick(num){
      this.tabActive = num;
    },
    closeModal(user){
      this.$emit('closeModal', user)
    }
  },
}
</script>

<style scoped>

.block_login{
  background-color: #322c3c;
  width: 100%;
  height: 100vh;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
}
.block_login_window{
  height: 350px;
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);
}
.tab_body{
  padding: 20px 15px;
}

</style>