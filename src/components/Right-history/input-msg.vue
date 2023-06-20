<template>
  <form action="" @submit.prevent="onSubmit">
    <div class="block_input">

        <textarea
            @keydown.enter.prevent="onSubmit"
            class="scroll"
            v-model="textareaMsg"
            placeholder="Написать сообщение..." >

        </textarea>
        <button class="block_input-icon" :class="{ active: textBlur()}"><i class='bx bxs-send'></i></button>

    </div>
  </form>
</template>

<script>
import Axios from "axios";

export default {
  name: "input-msg",
  data(){
    return{
      textareaMsg: '',
    }
  },
  props: {
    selectedChat: {},
  },
  emits:['sendMessage'],
  methods:{
    textBlur(){
      if(this.textareaMsg.trim() !== ''){
        return true
      } else{
        return false
      }
    },
    onSubmit() {
      Axios.post('/messages/send', {
        chatId: this.selectedChat.id,
        text: this.textareaMsg,
      })
          .then(response => {
            this.textareaMsg = ''
            this.$emit('sendMessage')
          })
          .catch(e => console.error(e));
    },

  }
}
</script>

<style scoped>
.block_input{
  display: flex;
  width: 100%;
  padding-left: 20px;
  background-color: #221e2b;
  height: 7vh;
  border: 1px solid #1c1c1c;

}
.block_input textarea{
  width: 95%;
  height: 30px;
  font-size: 17px;
  margin-top: 20px;
  padding-left: 10px;
  background-color: #221e2b;
  border: 0;
  outline: none;
  color: #ececec;
  font-weight: 500;
  overflow: hidden;
  resize: none;
}


.block_input-icon{
  margin: 0 auto;
  background-color: #221e2b;
  border: 0;
  display: none;
}
.block_input-icon.active{
  display: block;
}
.bxs-send{
  font-size: 30px;
  color: #907abd;
}

.scroll{
  overflow-y: hidden;
}
.scroll:hover{
  overflow-y: scroll;
  padding-right: 3px;
}
.scroll::-webkit-scrollbar {
  width: 7px;
  border-radius: 10px;
}

.scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #797979;
}


@media (max-width: 1000px){
  .block_input{
    height: 10vh;
  }

}
</style>