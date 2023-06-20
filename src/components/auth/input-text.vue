<template>
  <div class="text-field text-field_floating">
    <input class="text-field__input"
           ref="input"
           :class="{ 'has-error': hasError }"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           @blur="onBlur"
           :id="id"
           :type="inputType"
           name=""
           placeholder="a"
           :required="required"
           :readonly="readonly">
    <label class="text-field__label">{{ title }}</label>
    <div class="text-field__eye"
         v-if="type == 'password'"
         @click="showPass" >
      <i class='bx bxs-show'></i>
    </div>
    <div class="text-field__eye"
         v-if="showCopyIcon"
    >
      <i class='bx bx-copy'></i>
    </div>
    <div class="text-field__caption">{{ subtitle }}</div>
    <div class="text-field__caption error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "input-text",
  data() {
    return{
      hasError: false,
      inputType: this.type
    }
  },
  props: {
    type: {
      default: 'text',
    },
    validator: Function,
    id: {
      default: null,
    },
    username: {
      default: '',
    },
    placeholder: {
      default: "a",
    },
    required: {
      default: null,
    },
    readonly: {
      default: null,
    },
    title: {
      default: '',
    },
    subtitle: {
      default: '',
    },
    error: {
      default: '',
    },
    modelValue: {
      default: '',
    },
    showCopyIcon: {
      default: false,
    }


  },
  methods: {
    onBlur() {
      let result = true
      if (this.validator) {
        result = this.validator(this.modelValue, this.$refs.input)
      }
      this.hasError = !result
    },
    showPass(){
      if (this.inputType === 'password'){
        return this.inputType = 'text'
      }
      if (this.inputType === 'text'){
        return this.inputType = 'password'
      }
    },
  },
}
</script>

<style scoped>
.text-field {
  margin-bottom: 17px;
}

.text-field__label {
  display: block;
  margin-bottom: 0.25rem;
}
.text-field__caption{
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #b2b2b2;
  margin-top: 3px;
  padding-left: 15px;
}

.text-field__input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ececec;
  background: rgba(33, 33, 33, 0.08);
  background-clip: padding-box;
  border: 0;
  border-bottom: 1px solid rgba(236, 236, 236, 0.65);

  border-radius: 0.25rem 0.25rem 0 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.text-field__input[type="search"]::-webkit-search-decoration,
.text-field__input[type="search"]::-webkit-search-cancel-button,
.text-field__input[type="search"]::-webkit-search-results-button,
.text-field__input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.text-field__input::placeholder {
  color: #ececec;
  opacity: 0.4;
}

.text-field__input:focus {
  color: #ececec;
  border-color: #bdbdbd;
  outline: 0;
  border-bottom: 2px solid #ececec;
}

.text-field__input:disabled,
.text-field__input[readonly] {
  background-color: #f5f5f5;
  opacity: 1;
}


.text-field_floating {
  position: relative;
}

.text-field_floating .text-field__input {
  height: calc(3.5rem + 2px);
  line-height: 1.25;
  padding: 1rem 0.75rem;
}

.text-field_floating .text-field__label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  color: rgba(236, 236, 236, 0.65);
  padding: 1rem .75rem;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity .15s ease-in-out, transform .15s ease-in-out;
}
.text-field_floating .text-field__input::-moz-placeholder {
  color: transparent;
}

.text-field_floating .text-field__input::placeholder {
  color: transparent;
}

.text-field_floating .text-field__input:focus,
.text-field_floating .text-field__input:not(:placeholder-shown) {
  padding-top: 1.625rem;
  padding-bottom: .625rem;
}
.text-field_floating .text-field__input:focus ~ .text-field__label,
.text-field_floating .text-field__input:not(:placeholder-shown) ~ .text-field__label {
  transform: scale(.85) translateY(-.75rem) translateX(.15rem);
}
.text-field_floating .text-field__input:focus ~ .text-field__label{
  color: #b2b2b2;
}
.text-field_floating .text-field__input.has-error ~ .text-field__label{
  color: #B00020;
}
.text-field__caption{
  visibility: hidden;
}
.text-field__input:focus ~ .text-field__caption,
.text-field__input.has-error ~ .text-field__caption.error{
  visibility: visible;
  transition: opacity .15s ease-in-out, transform .15s ease-in-out;
}
.text-field__caption.error{
  color: #B00020;
  display: none;
}
.text-field__input.has-error ~ .text-field__caption{
  display: none;
}
.text-field__input.has-error ~ .text-field__caption.error{
  display: block;
}
.text-field__eye{
  font-size: 24px;
  position: absolute;
  bottom: 23px;
  right: 16px;
  color: rgba(236, 236, 236, 0.6);
}
</style>