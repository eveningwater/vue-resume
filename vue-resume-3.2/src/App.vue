<template>
  <div class="container">
      <resume-editor :content="resumeContent" @on-change="changeResumeEditor" :isRenderHTML="resumeRenderHTML"></resume-editor>
      <style-editor :content="styleContent" @on-change="changeStyleEditor"></style-editor>
  </div>
</template>

<script setup>
import styleEditor from "./components/styleEditor.vue";
import resumeEditor from "./components/resumeEditor.vue";
import fullMarkdown from "./data/style";
import resumeMarkdown from "./data/my";
import { nextTick, onMounted, ref, watchEffect } from "vue";
const styleContent = ref("");
const resumeContent = ref("");
const resumeRenderHTML = ref(false);
const styleEditorInstance = ref(null);
const resumeEditorInstance = ref(null);
const audioResource = ref(null);
const changeStyleEditor = editor => nextTick(() => styleEditorInstance.value = editor.value);
const changeResumeEditor = editor => nextTick(() => resumeEditorInstance.value = editor.value);
const writeStyle = n => new Promise((resolve,rejct) => {
    let timer = null;
    const showStyle = () => {
        let style = fullMarkdown[n];
        if(!style)return;
        let len = fullMarkdown.filter((s,i) => i <= n).map(i => i.length).reduce((r,v) => r + v,0);
        let prefixLen = len - style.length;
        if(styleContent.value.length < len){
            const l = styleContent.value.length - prefixLen;
            const char = style.slice(l,l + 1) || ' ';
            styleContent.value += char;
            if(style.slice(l - 1,l) === '\n' && styleEditorInstance.value){
                styleEditorInstance.value.scrollTop = 10000;
            }
            timer = setTimeout(showStyle, 0);
        }else{
           resolve();
        }
    }
    showStyle();
})
const writeMyResume = () => new Promise((resolve,reject) => {
    let timer = null,len = resumeMarkdown.length;
    const showResume = () => {
        if(resumeContent.value.length < len){
            resumeContent.value = resumeMarkdown.slice(0, resumeContent.value.length + 1);
            const lastChar = resumeContent.value[resumeContent.value.length - 2];
            if(lastChar === "\n" && resumeEditorInstance.value){
                resumeEditorInstance.value.scrollTop = 10000;
            }
            timer = setTimeout(showResume, 0);
        }else{
            resolve();
        }
    }
    showResume();
});
const writeResumeToHTML = () => new Promise((resolve,reject) => {
    resumeRenderHTML.value = true;
    resolve();
});
const playMusic = () => new Promise((resolve,reject) => {
    const audios = document.querySelectorAll("audio");
    if(audios){
        audios.forEach(audio => audio.remove());
    }
    audioResource.value = new Audio();
    audioResource.value.src = "https://www.eveningwater.com/static/resouces/audio/5.mp3";
    audioResource.value.addEventListener("canplay",e => audioResource.value.play());
    document.body.appendChild(audioResource.value);
    resolve();
});
const writeResume = async () => {
    await writeStyle(0);
    await writeMyResume();
    await writeStyle(1);
    await writeResumeToHTML();
    await writeStyle(2);
    await playMusic();
};
onMounted(() => writeResume());
</script>

<style lang="less">
.container {
    width: 100%;
    height: 100%;
    perspective: 1000px;
}
</style>
