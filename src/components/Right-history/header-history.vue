<template>
  <div class="block_history">
    <div class="block_history-back">
      <i class='bx bx-arrow-back' @click="$emit('closeChat')"></i>
    </div>
    <div class="block_history-name">
      {{ user }}
    </div>
  </div>

</template>

<script>
export default {
  name: "header-history",
  data() {
    return{
      me: false,
    }
  },
  props: {
    user: "Коля",
  },
  emits: ['closeChat'],
}
</script>

<style scoped>
.block_history{
  height: 7vh;
  width: 100%;
  background-color: #221e2b;
  border: 1px solid #1c1c1c;
  font-size: 18px;
  color: #ececec;
  font-weight: 500;
  display: flex;
}

.bx-arrow-back{
  font-size: 27px;
  color: #645f6e;
  margin: 18px 0  16px 20px;
  display: none;
}
.bx-arrow-back:hover{
  color: #eeeeee;
}

.block_history-name{
  margin: 17px 35px;
}

@media (max-width: 1000px){
  .bx-arrow-back{
    display: block;
  }
  .block_history{
    height: 80px;
  }
  .bx-arrow-back{
    font-size: 33px;
    margin: 25px 0  25px 20px;
  }
  .block_history-name{
    font-size: 24px;
    margin-top: 0;
    line-height: 80px;
  }
}
</style>