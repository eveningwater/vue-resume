<template>
    <div class="style-editor-container">
        <div class="style-code" v-html="styleContent"></div>
        <div class="styleEditor" v-html="styleTextContent" ref="styleEditor"></div>
    </div>
</template>
<script setup>
   import { computed, ref,defineProps } from "vue";
   import Prism from "prismjs";
   const props = defineProps({
       content:String
   });
   const styleContent = computed(() => `<style>${ props.content }</style>`);
   const styleTextContent = computed(() => Prism.highlight(props.content,Prism.languages.css,'css'));
   const styleEditor = ref(null);
   const emit = defineEmits(["on-change"])
   emit("on-change",styleEditor);
</script>
<style lang="less" scoped>
    .style-editor-container {
        .styleEditor {
            white-space: pre-wrap;
            overflow-y: auto;
            overflow-x: hidden;
            padding:.5em .5em 1.5em;
            margin:.5em;
        }
    }
</style>
