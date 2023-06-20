<template>
  <div class="container scroll">
    <card-message v-for="msg in messagesReversed"
                  :id="id"
                  :msg="msg"></card-message>
    <div ref="bottom"></div>
  </div>
</template>

<script>

import cardMessage from "./card-message.vue";
import Axios from "axios";

export default {
  name: "message-zone",
  components: {
    cardMessage,
  },
  props: {
    messages: Array,
    user: String,
    id: Number,
  },
  computed: {
    messagesReversed(){
      return this.messages?.sort(function(a, b){return b.id - a.id}) || [];
    },
  },
  methods:{
    scrollLastMessage(){
      this.$refs.bottom.scrollIntoView()
    }
  },
  watch:{
    messages: {
      handler(){
        // setTimeout( () => this.scrollLastMessage(), 100)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.container{
  height: 86vh;
  background-color: #191521;
  padding: 10px;
}
.scroll{
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
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
    height: 78vh;
  }
}
</style>