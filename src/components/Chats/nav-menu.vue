<template>
  <div class="container">
    <div class="block_menu flex">
      <div class="block_menu-option"><i class='bx bxs-log-out' @click="addActiveLogOut"></i></div>
      <div class="block_menu-search"><input type="text" v-model="search" placeholder="Поиск"></div>
    </div>
    <div class="block_chats scroll">
      <card-chat v-for="(chat, n) in countChats"
                 :chat="chat"
                 :class="{ active: activeChats === n }"
                 @click="addActiveChats(n)"
      ></card-chat>
    </div>
  </div>
</template>

<script>
import cardChat from "./card-chat.vue";

export default {
  name: "nav-menu",
  data() {
    return{
      activeLogOut: false,
      activeChats: null,
      search: '',
    }
  },
  computed: {
    countChats(){
      let filterName = []
      for(let i = 0; i < this.chats.length; i++){
        if(this.chats[i].name.toLowerCase().includes(this.search.toLowerCase())){
          filterName.push(this.chats[i])
        }
      }
      return filterName
    }
  },
  props: {
    chats: Array,
  },
  components: {
    cardChat
  },
  methods:{
    addActiveChats(n){
      this.activeChats = this.activeChats === n ? n : n
      this.$emit('addUsername', this.chats[n].name, this.activeChats)
    },
    addActiveLogOut(){
      this.activeLogOut = true
      this.$emit('openLogOut', this.activeLogOut)
    }
  },
}
</script>

<style scoped>
.container{
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  width: 20%;
  min-width: 395px;
  background-color: #221e2b;
}

.flex{
  display: flex;
}
.block_menu{
  height: 7vh;
  color: #645f6e;
  padding-right: 7px;
  width: 100vw;
}



.bxs-log-out{
  font-size: 27px;
  color: #645f6e;
  margin: 18px 0  16px 20px;
}
.bxs-log-out:hover{
  color: #eeeeee;
}


.block_menu-search input{
  font-family: 'Roboto', sans-serif;
  width: 300px;
  height: 35px;
  font-size: 18px;
  font-weight: 500;
  margin: 14px 0 0 20px;
  padding: 0 10px;
  border-radius: 4px;
  background-color: #322c3c;
  border: 0;
  color: #ececec;
  outline: none;
}
.block_chats{
  position: fixed;
  left: 0;
  width: 395px;
  top: 7vh;
  height: 93vh;
  overflow: hidden;
  border-right: 1px solid #1c1c1c;
}
.block_chats:hover{
  margin-right: 0;
}



.scroll{
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  width: 7px;
  border-radius: 10px;
}

.scroll:hover::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #797979;
}

@media (max-width: 1000px){
  .container{
    width: 100%;
  }
  .block_menu{
    width: 100%;
    height: 80px;
  }
  .block_chats{
    width: 100%;
    height: 90vh;
    top: 100px;
  }

  .bxs-log-out{
    font-size: 50px;
    margin: 25px 0  25px 20px;
  }
  .block_menu-search input{
    width: 750px;
    height: 65px;
    font-size: 24px;
  }
}
@media (max-width: 900px){
  .block_menu-search input{
    width: 500px;
  }
}
@media (max-width: 650px){
  .block_menu-search input{
    width: 300px;
  }
  .bxs-log-out{
    font-size: 50px;
  }
}
@media (max-width: 400px){
  .block_menu-search input{
    width: 250px;
  }
  .bxs-log-out{
    font-size: 50px;
  }
}
@media (max-width: 340px){
  .block_menu-search input{
    width: 180px;
  }
  .bxs-log-out{
    font-size: 50px;
  }
}


</style>