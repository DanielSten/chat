<template>

  <div class="wrapper">
    <div class="loader_background" :class="{ active: loadingActive == true }"><div class="lds-ripple"><div></div><div></div></div></div>
    <auth-regs class="block_login"
               :class="{ active: logOut }"
               @closeModal="closeModal"></auth-regs>
    <div class="flex">
      <nav-menu class="menu"
                :chats="chats"
                v-on:openLogOut="openLogOut"
                :class="{ open: isOpen == true }"
                @add-username="openChat"></nav-menu>
      <window-history class="rubber"
                      :class="{ open: isOpen == false }"
                      @close-chat="isOpen = !isOpen; this.activeChats = null"
                      @send-message=""
                      :id="id"
                      :messages="allMessages[selectedChat?.id]"
                      :selected-chat="selectedChat"
                      v-bind:user="user"></window-history>
    </div>
  </div>

</template>

<script>
import navMenu from "../components/Chats/nav-menu.vue";
import WindowHistory from "../components/Right-history/WindowHistory.vue";
import authRegs from "../components/auth/auth-regs.vue";
import Axios from "axios";



export default {
  name: "MainPage",
  components: {
    navMenu,
    WindowHistory,
    authRegs
  },
  data(){
    return{
      id: null,
      selectedChat: null,
      user: null,
      logOut: true,
      isOpen: true,
      showModal: true,
      chats: [],
      allMessages: {},
      lastMessageId: 0,
      intervalId: null,
      activeChats: null,
      loadingActive: true,
    }
  },
  methods:{
    loadUpdatesMessage(){
      if(this.logOut){
        setTimeout(() => {
          this.loadUpdatesMessage();
        }, 500)
        return;
      }
      Axios.get('/messages/get-updates/' + this.lastMessageId)
          .then(response => {
            if(response.data){
              for (let message of response.data) {
                if(message.id > this.lastMessageId){
                  this.lastMessageId = message.id
                }
                let chatId = null
                if(message.from == this.id){
                  chatId = message.to
                }
                else{
                  chatId = message.from
                }
                if(!this.allMessages[chatId]){
                  this.allMessages[chatId] = []
                }
                this.allMessages[chatId].push(message)
                for(let chat of this.chats){
                  if(chat.id == chatId){
                    chat.lastMessage = message
                    break
                  }
                }
              }
            }

            setTimeout(() => {
              this.loadUpdatesMessage();
            }, 500)

          })
          .catch(e => console.error(e));
    },
    openLogOut(bol){
      this.logOut = bol
      Axios.defaults.headers.common.Authorization = null
      localStorage.clear()
      window.location.reload()
    },
    openChat(name, activeChats){
      this.user = name
      this.activeChats = activeChats
      if(this.activeChats != null){
        this.isOpen = false
        this.selectedChat = this.chats[activeChats]
      }
      if(!this.selectedChat){
        return
      }
      let lastMessage = this.allMessages[this.selectedChat.id]?.at(-1)
      if(!lastMessage){
      Axios.get('/chat/'+ this.selectedChat.id)
          .then(response => {
            if(this.user){
                this.allMessages[this.selectedChat.id] = response.data
            }
          })
          .catch(e => console.error(e));
      }
    },
    loadContactsList(){
      Axios.get('/contacts')
          .then(response => {
            if(response.data){
              this.chats = response.data
              this.loadingActive = false
            }
          })
          .catch(e => console.error(e));
    },
    closeModal(user){
      this.id = user.id
      this.logOut = false
      this.loadContactsList()
      this.loadingActive = true
    }
  },
  created() {
    let token = localStorage.getItem('token')
    if(!token){
      this.logOut = true
      this.loadingActive = false
    } else {
      Axios.get('/auth/check', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
          .then(response => {
            if(!response.data._status){
              this.logOut = true
              this.loadingActive = false
            } else {
              Axios.defaults.headers.common.Authorization = 'Bearer ' + token
              this.logOut = false
              this.loadContactsList()
              this.id = response.data.user.id
            }
          })
          .catch(e => console.error(e));
    }
    this.loadUpdatesMessage();
  },
}
</script>

<style scoped>
.flex{
  display: flex;
}
.block_login{
  display: none;
}
.block_login.active{
  display: block;
}

.rubber{
  flex: 1 1 auto;
}




.loader_background{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #322c3d;
  z-index: 99999;
  display: none;
}
.loader_background.active{
  display: block;
}
.lds-ripple {
  display: inline-block;
  position: fixed;
  top: 40%;
  left: 48%;
  width: 80px;
  height: 80px;

}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}



@media (max-width: 1000px){
  .menu{
    display: none;
  }
  .menu.open{
    display: block;
    min-width: 100%;
  }
  .rubber{
    display: none;
  }
  .rubber.open{
    display: block;
  }
}

</style>