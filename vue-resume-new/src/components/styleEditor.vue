<template>
  <div class="container">
    <div class="style-code" v-html="codeInstyleTag"></div>
    <div class="styleEditor" v-html="highlightedCode" contenteditable="true" @blur="updateCode($event)" ref="container"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, PropType } from 'vue'
import Prism from 'prismjs';
export default defineComponent({
  name: 'StyleEditor',
  props:{
    styleCode:String as PropType<string>
  },
  emits:["update:styleCode"],
  setup(props,{ emit }){
    const codeInstyleTag = computed(() => `<style>${ props.styleCode }</style>`);
    const highlightedCode = computed(() => Prism.highlight(props.styleCode,Prism.languages.css));
    const updateCode = (e:MouseEvent) => {
      emit("update:styleCode",(e.target as HTMLDivElement).textContent);
    }
    const instance = getCurrentInstance();
    const goBottom = () => {
      (instance?.refs.container as HTMLDivElement).scrollTop = 10000;
    }
    return {
      codeInstyleTag,
      highlightedCode,
      updateCode,
      goBottom
    }
  }
  
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
