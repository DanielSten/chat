<template>
  <div :class="{ block: id === msg.from }">
    <div class="block_msg" :class="{ my: id === msg.from }">
      <div class="block_msg-message">{{ msg.text }}</div>
      <div class="block_msg-time">{{ formattedDate }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  name: "card-message",
  props: {
    id: Number,
    msg: {
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque, error eveniet impedit" +
          " minus officia qui rerum tempore. Ex exercitationem fugiat iusto praesentium quaerat sit.",
      time: "14:22"
    },
  },
  computed:{
    formattedDate() {
      if(!this.msg?.created_on){
        return ''
      }
      return moment(this.msg?.created_on, "YYYY-MM-DD hh:mm:ss").fromNow()
    }
  },
}
</script>

<style scoped>
.block_msg{
  background-color: #282831;
  padding: 10px 15px 0;
  border-radius: 10px;
  max-width: 70%;
  margin: 3px;
  color: #ececec;
  display: inline-block;
}
.block_msg-message{
  word-break: break-all;
}
.block_msg-time{
  font-size: 13px;
  color: #9f9e9e;
  margin-left: 80px;
  text-align: right;
  position: relative;
  left: 5px;
  font-weight: 400;
}


.my .block_msg-time{
  color: #ececec;
}
.my{
  background-color: #554775;
}
.block{
  display:flex;
  justify-content:flex-end;
}
</style>