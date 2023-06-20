<template>
  <div>
    <header-history class="block_header" v-bind:user="user" @close-chat="$emit('closeChat')"></header-history>
    <message-zone v-bind:user="user"
                  :id="id"
                  :messages="messages"
                  :selected-chat="selectedChat"
                  class="block_message"></message-zone>
    <input-msg :selectedChat="selectedChat" @send-message="$emit('sendMessage')"></input-msg>
  </div>

</template>

<script>
import headerHistory from "./header-history.vue";
import messageZone from "./message-zone.vue";
import inputMsg from "./input-msg.vue";
import Axios from "axios";


export default {
  name: "WindowHistory",
  components: {
    headerHistory,
    messageZone,
    inputMsg
  },
  props: {
    messages: Array,
    user: String,
    id: Number,
    selectedChat: {},
  },
  date() {
    return{
      user: this.user,
    }
  },
}
</script>

<style scoped>
.block_header{
  z-index: 5;
}
.block_message{
  z-index: 4;
}

</style>