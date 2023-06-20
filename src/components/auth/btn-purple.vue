<template>
  <button :disabled="disabled"
  ><slot></slot>
  </button>
</template>

<script>
export default {
  name: "btn-purple",
  props: {
    disabled: {
      type: Boolean,
      default: null,
    },
    type: {
      default: 'button',
    }
  },
}
</script>

<style scoped>
button{
  width: 100%;
  background: #695791;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border: 0;
}
button:hover{
  background: #7661a2;
  transition-duration: 0.2s;
}
button:disabled{
  background: #868686;
}
</style>