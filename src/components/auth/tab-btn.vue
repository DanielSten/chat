<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "tab-btn"
}
</script>

<style scoped>
*{
  border: 0px;
}
button{
  padding: 20px;
  width: 200px;
  border-bottom: 2px solid #b2b2b2;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  background-color: #322c3c;
  color: #9b9a9a;
}
button.active{
  padding-bottom: 22px;
  color: #ececec;
  border: 2px solid #b2b2b2;
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #322c3c;
}
</style>