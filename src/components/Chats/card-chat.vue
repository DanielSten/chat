<template>
  <div class="content">
    <div class="block_title flex">
      <div class="block_title-name">{{ chat.name }}</div>
      <div class="block_title-time">{{ formattedDate }}</div>
    </div>
    <div class="block_lastMessage">{{ chat.lastMessage?.text }}&nbsp;</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "card-chat",
  props: {
    chat: {
      name: 'Коля',
      lastMessage: {
        text: '',

      },

    }
  },
  computed: {
    formattedDate() {
      if(!this.chat.lastMessage?.created_on){
        return ''
      }
      return moment(this.chat.lastMessage?.created_on, "YYYY-MM-DD hh:mm:ss").fromNow()
    }
  },
}
</script>

<style>
.content{
  max-width: 380px;
  padding: 10px 15px;
  border-radius: 3px;
  margin-left: 7px;
  cursor: pointer;
}
.content:hover{
  background-color: #2e293a;
}
.content.active{
  background-color: #554775;
  color: #fdfdfe;
}
.active .block_lastMessage{
  color: #fdfdfe;
}
.active .block_title-time{
  color: #fdfdfe;
}



.block_title{
  display: flex;
  justify-content:space-between;
}


.block_title-name{
  font-size: 17px;
  color: #ececec;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.block_title-time{
  font-size: 14px;
  margin-top: 3px;
  color: #808080;
  margin-left: 20px;
}
.block_lastMessage{
  font-size: 14px;
  margin-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #808080;
}


@media (max-width: 1000px){
  .content{
    width: 100vw;
    max-width: 1280px;
    padding-right: 40px;
  }
  .block_title-name{
    font-size: 25px;
  }
  .block_title-time{
    font-size: 20px;
  }
  .block_lastMessage{
    font-size: 20px;
  }
}

</style>